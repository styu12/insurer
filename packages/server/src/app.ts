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
      const errorMessage =
        error instanceof Error ? error.message : 'An error occurred'

      reply.status(500).send({
        error: 'InternalServerError',
        message: `Unexpected: ${errorMessage}`,
      })
    }
  }
)

server.decorate(
  'authenticate',
  async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      request.jwtVerify({ onlyCookie: true })
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'An error occurred'
      throw new CustomError(`Unauthorized: ${errorMessage}`, 401)
    }
  }
)

server.register(basePlugins)
server.register(postgresConnector)
server.register(fastifySwagger)
server.register(routes)

export default server
