import Fastify from 'fastify'
import cors from '@fastify/cors'
import { prisma } from './api/prismaClient'
const fastify = Fastify()

fastify.register(cors, {
  origin: true,
})

async function main() {
  fastify.get('/', async (request, reply) => {
    return 'oi'
  })
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
    await fastify.listen({ port: 3333 })

    console.log('Listining on port 3333')
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
