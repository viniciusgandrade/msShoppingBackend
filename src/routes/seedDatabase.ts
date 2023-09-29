import { Product } from '@prisma/client'
import { FastifyInstance } from 'fastify'
import path from 'path'
import { prisma } from '../api/prismaClient'
import { compressImage } from '../api/sendToS3'
import { authorize, listFiles, donwloadPhotos } from '../auth/drive/authDrive'
import { getTypes } from '../helpers/getTypes'
import { ProductCSV } from '../models/ProductCSV'
import csv from 'csvtojson'

export async function seedDatabaseRoute(app: FastifyInstance) {
  app.get('/seedDatabase', async (reply) => {
    const jsonCSV: Array<ProductCSV> = await csv().fromFile(
      path.resolve(__dirname, 'temp', 'data.csv'),
    )

    const files = await authorize()
      .then((authClient) =>
        listFiles(
          authClient,
          jsonCSV.map((i) => i.Fotos),
        ),
      )
      .catch(console.error)

    const filteredFiles = jsonCSV
      ?.map((item) => {
        const type = getTypes(item.Tipo.toLocaleLowerCase())

        return {
          sizes: item.Tamanho.includes(',')
            ? item.Tamanho.split(',')
            : [item.Tamanho],
          name: item.Nome,
          price: Number(item['Preço']),
          type,
          fileId: files?.find((file) => file.name === item.Fotos)?.id,
        }
      })
      .filter((item) => item.fileId)

    // @ts-ignore
    const photos: Array<Product> = await authorize()
      .then((auth) => donwloadPhotos(filteredFiles, auth))
      .catch(console.error)

    const ret = []

    for (const photo of photos) {
      const finalPath = await compressImage(photo.path)

      const allCategories = await prisma.categories.findMany()

      const createdProduct = await prisma.product.create({
        data: {
          imgUrl: finalPath,
          name: photo.name,
          price: photo.price,
          categoriesId: allCategories.find(
            (categorie) => categorie.type === photo.type.type,
          )?.id,
          sizes: photo.sizes,
        },
      })

      ret.push(createdProduct)
    }

    reply.send(ret)
  })
}
