import fastify, { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import postgresConnector from './plugins/postgres'
import fastifySwagger from './plugins/swagger'
import basePlugins from './plugins'
import routes from './routes'
import CustomError from './errors/CustomError'

const server = fastify({
  logger: true,
})

server.setErrorHandler(
  (error: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
    server.log.error(error)

    if (error instanceof CustomError) {
      reply.status(error.statusCode).send({
        error: error.name,
        message: error.message,
      })
    } else {
      reply.status(500).send({
        error: 'InternalServerError',
        message: 'An unexpected error occurred',
      })
    }
  }
)

server.decorate(
  'authenticate',
  async (request: FastifyRequest, reply: FastifyReply) => {
    const token = request.headers.authorization?.replace('Bearer ', '')
    if (!token) {
      throw new CustomError('Unauthorized', 401)
    }

    try {
      request.user = await server.jwt.verify(token)
    } catch (error) {
      throw new CustomError('Unauthorized', 401)
    }
  }
)


server.register(basePlugins)
server.register(postgresConnector)
server.register(fastifySwagger)
server.register(routes)

export default server
