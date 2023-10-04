import { prisma } from '../../api/prismaClient'
import { IGetProductRepository } from '../../controllers/Products/get-product/protocols'
import { Product } from '../../models/Product'

export class PrismaGetProductRepository implements IGetProductRepository {
  async getProduct(id: string): Promise<Product | null> {
    const product = await prisma.product.findFirst({
      where: {
        id,
      },
      include: {
        categorie: {
          select: {
            type: true,
          },
        },
      },
    })

    return product
  }
}
