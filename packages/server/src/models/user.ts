import { FastifyInstance } from 'fastify'
import CustomError from '../errors/CustomError'

export interface User {
  id: number
  username: string
  password: string
  email: string
}

export const createUser = async (server: FastifyInstance, username: string, hashedPassword: string, email: string): Promise<User> => {
  try {
    const result = await server.pg.query(
      'INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *',
      [username, hashedPassword, email]
    );
    return result.rows[0];
  }  catch (e) {
    server.log.error(e)
    throw new CustomError("failed to create user", 500);
  }
};

export const findUserByUsername = async (server: FastifyInstance, username: string): Promise<User | null> => {
  try {
    const result = await server.pg.query('SELECT * FROM users WHERE username = $1', [username]);
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  } catch(e) {
    server.log.error(e)
    throw new CustomError("failed to find user by username", 500);
  }
};

export const findUserById = async (server: FastifyInstance, id: number): Promise<User | null> => {
  try {
    const result = await server.pg.query('SELECT * FROM users WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  } catch(e) {
    server.log.error(e)
    throw new CustomError("failed to find user by id", 500);
  }
};

