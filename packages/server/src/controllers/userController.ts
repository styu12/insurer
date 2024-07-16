import { FastifyInstance } from 'fastify'
import bcrypt from 'bcrypt'
import { createUser, findUserById, findUserByUsername } from '../models/user'

export const userRoutes = async (
  server: FastifyInstance,
) => {
  server.post('/register',
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
          },
        },
        response: {
          200: server.getSchema('User'),
        }
      }
    },
    async (request, reply) => {
    try {
      const { username, password, email } = request.body as { username: string; password: string, email: string };
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await createUser(server, username, hashedPassword, email);
      reply.send({
        id: user.id,
        username: user.username,
        email: user.email,
      });
    } catch (err) {
      reply.status(500).send({ error: 'Registration failed' });
    }
  })

  server.post('/login',
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
        },
        response: {
          200: {
            description: 'Succesful response',
            type: 'object',
            properties: {
              token: { type: 'string' },
            },
          }
        }
      }
    },
    async (request, reply) => {
    try {
      const { username, password } = request.body as { username: string; password: string };
      const user = await findUserByUsername(server, username);
      if (!user) {
        return reply.status(404).send({ error: 'User not found' });
      }

      if (!await bcrypt.compare(password, user.password)) {
        return reply.status(401).send({ error: 'Invalid password' });
      }

      const token = server.jwt.sign({ id: user.id, username: user.username });
      reply.send({ token });

    } catch (err) {
      reply.status(500).send({ error: 'Login failed' });
    }
  })

  server.post('/logout',
    {
      schema: {
        tags: ['user'],
        description: 'logout',
        summary: 'logout',
        body: {},
        response: {
          200: {}
        }
      }
    },
    async (request, reply) => {
    // token should be removed from client side
    reply.send({ message: 'Logout successful' });
  })

  server.get('/me',
{
      preHandler: [server.authenticate],
      schema: {
        tags: ['user'],
        description: 'get profile',
        summary: 'get profile',
        params: {
          type: 'object',
          properties: {
            id: { type: 'number' }
          }
        },
        response: {
          200: server.getSchema('User'),
        }
      }
    },
    async (request, reply) => {
    const userId = (request.user as { id: number }).id;

    try {
      const user = await findUserById(server, userId);
      if (!user) {
        return reply.status(404).send({ error: 'User not found' });
      }

      reply.send({
        id: user.id,
        username: user.username,
        email: user.email,
      });
    } catch(err) {
      reply.status(500).send({ error: 'Failed to fetch user' });
    }
  })
}
