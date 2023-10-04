import { prisma } from '../../api/prismaClient'
import { IGetCategoriesRepository } from '../../controllers/Categories/protocol'
import { Categories } from '../../models/Categories'

export class PrismaGetCategoriesRepository implements IGetCategoriesRepository {
  async getCategories(): Promise<Categories[]> {
    const categories = await prisma.categories.findMany()

    return categories
  }
}
