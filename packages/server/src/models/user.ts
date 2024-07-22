import { FastifyInstance } from 'fastify'
import CustomError from '../errors/CustomError'
import { Customer } from './customer'

export interface User {
  id: number
  username: string
  password: string
  email: string
  emailNotification: boolean
  smsNotification: boolean
  kakaoNotification: boolean
}

function convertToCamelCase(row: any): User {
  return {
    id: row.id,
    username: row.username,
    password: row.password,
    email: row.email,
    emailNotification: row.email_notification,
    smsNotification: row.sms_notification,
    kakaoNotification: row.kakao_notification,
  }
}

export const createUser = async (
  server: FastifyInstance,
  username: string,
  hashedPassword: string,
  email: string,
  emailNotification: boolean,
  smsNotification: boolean,
  kakaoNotification: boolean
): Promise<User> => {
  try {
    const result = await server.pg.query(
      'INSERT INTO users (username, password, email, email_notification, sms_notification, kakao_notification) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [
        username,
        hashedPassword,
        email,
        emailNotification,
        smsNotification,
        kakaoNotification,
      ]
    )
    return convertToCamelCase(result.rows[0])
  } catch (e) {
    server.log.error(e)
    throw new CustomError('failed to create user', 500)
  }
}

export const findUserByUsername = async (
  server: FastifyInstance,
  username: string
): Promise<User | null> => {
  try {
    const result = await server.pg.query(
      'SELECT * FROM users WHERE username = $1',
      [username]
    )
    if (result.rows.length === 0) {
      return null
    }
    return convertToCamelCase(result.rows[0])
  } catch (e) {
    server.log.error(e)
    throw new CustomError('failed to find user by username', 500)
  }
}

export const findUserById = async (
  server: FastifyInstance,
  id: number
): Promise<User | null> => {
  try {
    const result = await server.pg.query('SELECT * FROM users WHERE id = $1', [
      id,
    ])
    if (result.rows.length === 0) {
      return null
    }
    return convertToCamelCase(result.rows[0])
  } catch (e) {
    server.log.error(e)
    throw new CustomError('failed to find user by id', 500)
  }
}
