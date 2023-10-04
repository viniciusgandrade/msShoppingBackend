import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { PrismaGetProducts } from '../repositories/product/prisma-get-products'
import { GetProductsController } from '../controllers/Products/get-products/get-products'
import { FilterProps } from '../models/filter'
import { PrismaGetProductRepository } from '../repositories/product/prisma-get-product'
import { GetProductController } from '../controllers/Products/get-product/get-product'
import { GetProductProps } from '../controllers/Products/get-product/protocols'

export async function getProductsRoute(app: FastifyInstance) {
  app.get(
    '/getProducts',
    async (
      request: FastifyRequest<{ Querystring: FilterProps }>,
      reply: FastifyReply,
    ) => {
      const prismaGetProductsRepository = new PrismaGetProducts()

      const getProductsController = new GetProductsController(
        prismaGetProductsRepository,
      )

      const products = await getProductsController.handle({
        body: request?.query,
      })

      reply.status(products.code).send(products.body)
    },
  )

  app.get(
    '/product/:id',
    async (request: FastifyRequest<{ Params: GetProductProps }>, reply) => {
      const prismaGetProductRepository = new PrismaGetProductRepository()

      const getProductController = new GetProductController(
        prismaGetProductRepository,
      )

      const product = await getProductController.handle({
        body: request?.params,
      })

      reply.code(product.code).send(product.body)
    },
  )
}
