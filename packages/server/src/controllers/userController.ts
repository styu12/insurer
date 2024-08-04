import { FastifyInstance } from 'fastify'
import bcrypt from 'bcrypt'
import {
  createUser,
  findUserById,
  findUserByUsername,
  User,
} from '../models/user'
import CustomError from '../errors/CustomError'

export const userRoutes = async (server: FastifyInstance) => {
  server.post(
    '/register',
    {
      schema: {
        tags: ['user'],
        description: 'register new user',
        summary: 'register new user',
        body: {
          type: 'object',
          properties: {
            username: { type: 'string' },
            password: { type: 'string' },
            email: { type: 'string' },
            emailNotification: { type: 'boolean' },
            smsNotification: { type: 'boolean' },
            kakaoNotification: { type: 'boolean' },
          },
          required: ['username', 'password', 'email'],
        },
        response: {
          201: {
            $ref: 'User#',
          },
          400: {
            $ref: 'Error#',
          },
        },
      },
    },
    async (request, reply) => {
      const {
        username,
        password,
        email,
        emailNotification,
        smsNotification,
        kakaoNotification,
      } = request.body as User
      const hashedPassword = await bcrypt.hash(password, 10)
      const user = await createUser(
        server,
        username,
        hashedPassword,
        email,
        emailNotification,
        smsNotification,
        kakaoNotification
      )

      reply.status(201).send({
        id: user.id,
        username: user.username,
        email: user.email,
      })
    }
  )

  server.post(
    '/login',
    {
      schema: {
        tags: ['user'],
        description: 'login',
        summary: 'login',
        body: {
          type: 'object',
          properties: {
            username: { type: 'string' },
            password: { type: 'string' },
          },
          required: ['username', 'password'],
        },
        response: {
          200: {
            schema: {
              type: 'object',
              properties: {
                token: { type: 'string' },
              },
            },
          },
          400: {
            $ref: 'Error#',
          },
          404: {
            $ref: 'Error#',
          },
        },
      },
    },
    async (request, reply) => {
      const { username, password } = request.body as {
        username: string
        password: string
      }
      const user = await findUserByUsername(server, username)
      if (!user) {
        throw new CustomError('User not found', 404)
      }

      if (!(await bcrypt.compare(password, user.password))) {
        throw new CustomError('Invalid password', 400)
      }

      const token = server.jwt.sign({ id: user.id, username: user.username })

      reply
        .setCookie('token', token, {
          httpOnly: true,
          sameSite: 'strict',
          path: '/',
          // signed: true, // 서명된 쿠키로 설정
        })
        .send({ message: 'Login success' })
    }
  )

  server.post(
    '/logout',
    {
      schema: {
        tags: ['user'],
        description: 'logout',
        summary: 'logout',
        response: {
          200: {
            schema: {
              type: 'object',
              properties: {
                message: { type: 'string' },
              },
            },
          },
        },
      },
    },
    async (request, reply) => {
      reply
        .clearCookie('token', {
          path: '/',
        })
        .send({ message: 'Logout success' })
    }
  )

  server.get(
    '/me',
    {
      preHandler: [server.authenticate],
      schema: {
        tags: ['user'],
        description: 'get profile',
        summary: 'get profile',
        response: {
          200: {
            $ref: 'User#',
          },
          404: {
            $ref: 'Error#',
          },
        },
      },
    },
    async (request, reply) => {
      const userId = (request.user as { id: number }).id

      const user = await findUserById(server, userId)
      if (!user) {
        throw new CustomError('User not found', 404)
      }

      reply.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        emailNotification: user.emailNotification,
        smsNotification: user.smsNotification,
        kakaoNotification: user.kakaoNotification,
      })
    }
  )
}
