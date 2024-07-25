import fastify, { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import fastifyEnv from '@fastify/env'
import fastifyJwt from '@fastify/jwt'
import cors from '@fastify/cors'
import postgresConnector from './plugins/postgres'
import fastifySwagger from './plugins/swagger'
import routes from './routes'
import * as process from 'process'
import CustomError from './errors/CustomError'

const server = fastify({
  logger: true,
})

const envSchema = {
  type: 'object',
  required: [
    'PORT',
    'POSTGRES_URL',
    'NAVER_USER',
    'NAVER_PASS',
    'NAVER_EMAIL',
    'NAVER_SMTP_HOST',
    'NAVER_SMTP_PORT',
    'JWT_SECRET',
  ],
  properties: {
    PORT: { type: 'string', default: '5000' },
    POSTGRES_URL: { type: 'string' },
    NAVER_USER: { type: 'string' },
    NAVER_PASS: { type: 'string' },
    NAVER_EMAIL: { type: 'string' },
    NAVER_SMTP_HOST: { type: 'string' },
    NAVER_SMTP_PORT: { type: 'string', default: '587' },
    JWT_SECRET: { type: 'string' },
  },
}

server
  .register(fastifyEnv, {
    schema: envSchema,
    dotenv: true,
  })
  .ready((err) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    console.log('Environment variables loaded successfully')
  })

server.register(fastifyJwt, {
  secret: 'supersecret',
})

server.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});

server.setErrorHandler(
  (error: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
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

server.register(postgresConnector)
server.register(fastifySwagger)
server.register(routes)

export default server
