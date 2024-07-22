import { FastifyInstance } from 'fastify'
import CustomError from '../errors/CustomError'
import { Customer } from './customer'

export interface Contract {
  id: number
  title: string
  description: string
  customerId: number
  productId: number
  startDate: string // YYYY-MM-DD
  claimDate: string // YYYY-MM-DD
  endDate: string // YYYY-MM-DD
}

function convertToCamelCase(row: any): Contract {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    customerId: row.customer_id,
    productId: row.product_id,
    startDate: row.start_date,
    claimDate: row.claim_date,
    endDate: row.end_date,
  }
}

export const createContract = async (
  server: FastifyInstance,
  title: string,
  description: string,
  customerId: number,
  productId: number,
  startDate: string,
  claimDate: string,
  endDate: string
): Promise<Contract> => {
  try {
    const { rows } = await server.pg.query(
      'INSERT INTO contracts (title, description, customer_id, product_id, start_date, claim_date, end_date) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [title, description, customerId, productId, startDate, claimDate, endDate]
    )
    return convertToCamelCase(rows[0])
  } catch (e) {
    server.log.error(e)
    throw new CustomError('failed to create contract', 500)
  }
}

export const findAllContracts = async (
  server: FastifyInstance
): Promise<Contract[]> => {
  try {
    const { rows } = await server.pg.query('SELECT * FROM contracts')
    return rows.map(convertToCamelCase)
  } catch (e) {
    server.log.error(e)
    throw new CustomError('failed to find all contracts', 500)
  }
}

export const findContractById = async (
  server: FastifyInstance,
  id: number
): Promise<Contract | null> => {
  try {
    const { rows } = await server.pg.query(
      'SELECT * FROM contracts WHERE id = $1',
      [id]
    )
    if (rows.length === 0) {
      return null
    }
    return convertToCamelCase(rows[0])
  } catch (e) {
    server.log.error(e)
    throw new CustomError('failed to find contract by id', 500)
  }
}
