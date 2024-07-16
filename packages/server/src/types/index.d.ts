import { Pool } from 'pg'
import { User } from '../models/user'

declare module 'fastify' {
  interface FastifyInstance {
    pg: Pool
    swagger:
      ((opts?: { yaml?: false }) => OpenAPI.Document) &
      ((opts: { yaml: true }) => string) &
      ((opts: { yaml: boolean }) => OpenAPI.Document | string);
    jwt: fastifyJwt.JWT
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>
  }

  interface FastifyRequest {
    user: User
  }
}
