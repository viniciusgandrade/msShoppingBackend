import { FastifyInstance } from 'fastify'
import { PrismaGetCategoriesRepository } from '../repositories/category/prisma-get-categories'
import { GetCategoriesController } from '../controllers/Categories/get-categories'

export async function getCategoriesRoute(app: FastifyInstance) {
  app.get('/getCategories', async (request, reply) => {
    const prismaGetCategoriesRepository = new PrismaGetCategoriesRepository()

    const getCategoriesController = new GetCategoriesController(
      prismaGetCategoriesRepository,
    )

    const categories = await getCategoriesController.handle()

    reply.code(categories.code).send(categories.body)
  })
}
