import { FastifyInstance } from 'fastify'
import bcrypt from 'bcrypt'
import { createUser, findUserById, findUserByUsername } from '../models/user'

export const userRoutes = async (
  server: FastifyInstance,
) => {
  server.post('/register', async (request, reply) => {
    try {
      const { username, password, email } = request.body as { username: string; password: string, email: string };
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await createUser(server, username, hashedPassword, email);
      reply.send({ user });
    } catch (err) {
      reply.status(500).send({ error: 'Registration failed' });
    }
  })

  server.post('/login', async (request, reply) => {
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

  server.post('/logout', async (request, reply) => {
    // token should be removed from client side
    reply.send({ message: 'Logout successful' });
  })

  server.get('/me',
    { preHandler: [server.authenticate] },
    async (request, reply) => {
    const userId = (request.user as { id: number }).id;

    try {
      return await findUserById(server, userId);
    } catch(err) {
      reply.status(500).send({ error: 'Failed to fetch user' });
    }
  })
}
