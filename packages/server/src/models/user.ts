import { FastifyInstance } from 'fastify'

export interface User {
  id: number
  username: string
  password: string
  email: string
}

export const createUser = async (server: FastifyInstance, username: string, hashedPassword: string, email: string): Promise<User> => {
  const result = await server.pg.query(
    'INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *',
    [username, hashedPassword, email]
  );
  return result.rows[0];
};

export const findUserByUsername = async (server: FastifyInstance, username: string): Promise<User | null> => {
  const result = await server.pg.query('SELECT * FROM users WHERE username = $1', [username]);
  if (result.rows.length === 0) {
    return null;
  }
  return result.rows[0];
};

export const findUserById = async (server: FastifyInstance, id: number): Promise<User | null> => {
  const result = await server.pg.query('SELECT * FROM users WHERE id = $1', [id]);
  if (result.rows.length === 0) {
    return null;
  }
  return result.rows[0];
};

