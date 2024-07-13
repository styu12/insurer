import { FastifyInstance } from 'fastify'

export interface Customer {
  id: number
  name: string
  email: string
  phone: string
  address: string
}

export const findAllCustomers = async (server: FastifyInstance): Promise<Customer[]> => {
  try {
    const { rows } = await server.pg.query('SELECT * FROM customers')
    return rows
  } catch (error) {
    throw new Error('failed to find all customers')
  }
}

export const findCustomerById = async (server: FastifyInstance, id: string): Promise<Customer | null> => {
  try {
    const { rows } = await server.pg.query('SELECT * FROM customers WHERE id = $1', [id])
    if (rows.length === 0) {
      return null
    }
    return rows[0]
  } catch (error) {
    throw new Error('failed to find customer')
  }
}

export const createNewCustomer = async (server: FastifyInstance, customer: Customer): Promise<Customer> => {
  try {
    const { rows } = await server.pg.query(
      'INSERT INTO customers (name, email, phone, address) VALUES ($1, $2, $3, $4) RETURNING *',
      [customer.name, customer.email, customer.phone, customer.address]
    )
    return rows[0]
  } catch (error) {
    throw new Error('failed to create customer')
  }
}

export const updateCustomerById = async (server: FastifyInstance, id: string, customer: Customer): Promise<Customer | null> => {
  try {
    const { rows } = await server.pg.query(
      'UPDATE customers SET name = $1, email = $2, phone = $3, address = $4 WHERE id = $5 RETURNING *',
      [customer.name, customer.email, customer.phone, customer.address, id]
    )
    if (rows.length === 0) {
      return null
    }
    return rows[0]
  } catch (error) {
    throw new Error('failed to update customer')
  }
}

export const deleteCustomerById = async (server: FastifyInstance, id: string): Promise<boolean> => {
  try {
    const { rowCount } = await server.pg.query('DELETE FROM customers WHERE id = $1', [id])
    return rowCount === 1
  } catch (error) {
    throw new CustomError('failed to delete customer', 500)
  }
}

export class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
  }
}

