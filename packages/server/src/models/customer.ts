import { FastifyInstance } from 'fastify'
import CustomError from '../errors/CustomError'
import { Contract } from './contract'

export interface Customer {
  id: number
  name: string
  email: string
  phone: string
  address: string
  emailNotification: boolean
  smsNotification: boolean
  kakaoNotification: boolean
}

function convertToCamelCase(row: any): Customer {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    address: row.address,
    emailNotification: row.email_notification,
    smsNotification: row.sms_notification,
    kakaoNotification: row.kakao_notification,
  };
}

export const createCustomer = async (
  server: FastifyInstance,
  name: string,
  email: string,
  phone: string,
  address: string,
  emailNotification: boolean,
  smsNotification: boolean,
  kakaoNotification: boolean,
): Promise<Customer> => {
  try {
    const { rows } = await server.pg.query(
      'INSERT INTO customers (name, email, phone, address, email_notification, sms_notification, kakao_notification) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [name, email, phone, address, emailNotification, smsNotification, kakaoNotification]
    )
    return convertToCamelCase(rows[0])
  } catch(e) {
    server.log.error(e)
    throw new CustomError("failed to create customer", 500);
  }
}

export const findAllCustomers = async (server: FastifyInstance): Promise<Customer[]> => {
  try {
    const { rows } = await server.pg.query('SELECT * FROM customers')
    return rows.map(convertToCamelCase)
  } catch(e) {
    server.log.error(e)
    throw new CustomError("failed to find all customers", 500);
  }
}

export const findCustomerById = async (server: FastifyInstance, id: number): Promise<Customer | null> => {
  try {
    const { rows } = await server.pg.query('SELECT * FROM customers WHERE id = $1', [id])
    if (rows.length === 0) {
      return null
    }
    return convertToCamelCase(rows[0])
  } catch(e) {
    server.log.error(e)
    throw new CustomError("failed to find customer by id", 500);
  }
}

export const updateCustomerById = async (
  server: FastifyInstance,
  id: number,
  name: string,
  email: string,
  phone: string,
  address: string,
  emailNotification: boolean,
  smsNotification: boolean,
  kakaoNotification: boolean,
): Promise<Customer | null> => {
  try {
    const { rows } = await server.pg.query(
      'UPDATE customers SET name = $2, email = $3, phone = $4, address = $5, email_notification = $6, sms_notification = $7, kakao_notification = $8 WHERE id = $1 RETURNING *',
      [id, name, email, phone, address, emailNotification, smsNotification, kakaoNotification]
    )
    if (rows.length === 0) {
      return null
    }
    return convertToCamelCase(rows[0])
  } catch(e) {
    server.log.error(e)
    throw new CustomError("failed to update customer by id", 500);
  }
}

export const deleteCustomerById = async (server: FastifyInstance, id: number): Promise<Customer | null> => {
  try {
    const { rows } = await server.pg.query('DELETE FROM customers WHERE id = $1 RETURNING *', [id])
    if (rows.length === 0) {
      return null
    }
    return convertToCamelCase(rows[0])
  } catch(e) {
    server.log.error(e)
    throw new CustomError("failed to delete customer by id", 500);
  }
}
