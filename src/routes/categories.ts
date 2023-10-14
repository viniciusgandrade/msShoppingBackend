import { FastifyInstance } from 'fastify'
import { PrismaGetCategoriesRepository } from '../repositories/category/prisma-get-categories'
import { GetCategoriesController } from '../controllers/Categories/get-categories'
import { types } from '../helpers/getTypes'
import { prisma } from '../api/prismaClient'

export async function getCategoriesRoute(app: FastifyInstance) {
  app.get('/getCategories', async (request, reply) => {
    const prismaGetCategoriesRepository = new PrismaGetCategoriesRepository()

    const getCategoriesController = new GetCategoriesController(
      prismaGetCategoriesRepository,
    )

    const categories = await getCategoriesController.handle()

    reply.code(categories.code).send(categories.body)
  })

  app.get('/seedCategories', async (request, reply) => {
    for (const key in types) {
      await prisma.categories.create({
        data: {
          // @ts-ignore
          Sex: types[key].sex,
          // @ts-ignore
          type: types[key].type,
        },
      })
    }

    return await prisma.categories.findMany()
  })
}
