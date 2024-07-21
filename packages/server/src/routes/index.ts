import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import fp from 'fastify-plugin'
import { customerRoutes } from '../controllers/customerController'
import { productRoutes } from '../controllers/productController'
import { notificationRoutes } from '../controllers/notificationController'
import { userRoutes } from '../controllers/userController'
import { contractRoutes } from '../controllers/contractController'

const routes = async (
  server: FastifyInstance,
  options: FastifyPluginOptions
) => {
  server.get('/health', async (request, reply) => {
    return { info: 'This is for health check' }
  })

  const apiV1 = '/api/v1'
  server.register(contractRoutes, { prefix: `${apiV1}/contracts` })
  server.register(customerRoutes, { prefix: `${apiV1}/customers` })
  server.register(productRoutes, { prefix: `${apiV1}/products` })
  server.register(notificationRoutes, { prefix: `${apiV1}/notifications` })
  server.register(userRoutes, { prefix: `${apiV1}/users` })
}

export default fp(routes)
