import Fastify from 'fastify'
import cors from '@fastify/cors'
import { prisma } from './api/prismaClient'
import dotenv from 'dotenv'
import { getProductsRoute } from './routes/products'
import { getCategoriesRoute } from './routes/categories'
const fastify = Fastify()

async function main() {
  fastify.register(cors, {
    origin: true,
  })

  dotenv.config()

  // fastify.register(seedDatabaseRoute)

  fastify.register(getProductsRoute)

  fastify.register(getCategoriesRoute)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

const start = async () => {
  try {
    await fastify.listen({ port: 3333, host: '0.0.0.0' })

    console.log('Listining on port 3333')
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
