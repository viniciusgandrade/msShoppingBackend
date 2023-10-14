import Fastify from 'fastify'
import cors from '@fastify/cors'
import { prisma } from './api/prismaClient'
// import { seedDatabaseRoute } from './routes/seedDatabase'
import { getProductsRoute } from './routes/products'
import { getCategoriesRoute } from './routes/categories'
import { seedDatabaseRoute } from './routes/seedDatabase'
const fastify = Fastify()

async function main() {
  fastify.register(cors, {
    origin: true,
  })

  fastify.register(seedDatabaseRoute)

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
    await fastify.listen({ port: 8088 })

    console.log('Listining on port 3333')
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
