import { FastifyInstance } from 'fastify'
import fp from 'fastify-plugin'
import fastifyEnv from '@fastify/env'
import fastifyJwt from '@fastify/jwt'
import type { FastifyCookieOptions } from '@fastify/cookie'
import fastifyCookie from '@fastify/cookie'
import cors from '@fastify/cors'

const basePlugins = async (server: FastifyInstance) => {
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

  await server.register(fastifyEnv, {
      schema: envSchema,
      dotenv: true,
  })

  server.register(fastifyJwt, {
    secret: server.config.JWT_SECRET,
  })

  server.register(fastifyCookie, {
    secret: "my-secret", // for cookies signature
  } as FastifyCookieOptions)

  server.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
}

export default fp(basePlugins)
