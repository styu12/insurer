import { Pool } from 'pg'
import { User } from '../models/user'
import { JWT } from '@fastify/jwt'
import type { setCookieWrapper } from '@fastify/cookie'

declare module 'fastify' {
  interface FastifyInstance {
    pg: Pool
    swagger: ((opts?: { yaml?: false }) => OpenAPI.Document) &
      ((opts: { yaml: true }) => string) &
      ((opts: { yaml: boolean }) => OpenAPI.Document | string)
    jwt: JWT
    authenticate: (
      request: FastifyRequest,
      reply: FastifyReply
    ) => Promise<void>
    config: {
      JWT_SECRET: string
      PORT: string
      POSTGRES_URL: string
      NAVER_USER: string
      NAVER_PASS: string
      NAVER_EMAIL: string
      NAVER_SMTP_HOST: string
      NAVER_SMTP_PORT: string
    }
  }

  interface FastifyRequest {
    user: User
  }
}
