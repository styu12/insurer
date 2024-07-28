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

export interface ContractWithCustomer extends Contract {
  customerName: string
}

function convertToCamelCaseContract(row: any): Contract {
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

function convertToCamelCaseContractWithCustomer(
  row: any
): ContractWithCustomer {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    customerId: row.customer_id,
    productId: row.product_id,
    startDate: row.start_date,
    claimDate: row.claim_date,
    endDate: row.end_date,
    customerName: row.customer_name,
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
    return convertToCamelCaseContract(rows[0])
  } catch (e) {
    server.log.error(e)
    throw new CustomError('failed to create contract', 500)
  }
}

export const findAllContractsWithCustomer = async (
  server: FastifyInstance
): Promise<ContractWithCustomer[]> => {
  try {
    const { rows } = await server.pg.query(`
SELECT 
  contracts.id,
  contracts.title,
  contracts.description,
  contracts.customer_id,
  contracts.product_id,
  contracts.start_date,
  contracts.claim_date,
  contracts.end_date,
  customers.name as customer_name 
FROM contracts
LEFT JOIN customers 
ON contracts.customer_id = customers.id
`)
    return rows.map(convertToCamelCaseContractWithCustomer)
  } catch (e) {
    server.log.error(e)
    throw new CustomError('failed to find all contracts', 500)
  }
}

export const findContractWithCustomerById = async (
  server: FastifyInstance,
  id: number
): Promise<ContractWithCustomer | null> => {
  try {
    const { rows } = await server.pg.query(
      `
      SELECT 
        contracts.id,
        contracts.title,
        contracts.description,
        contracts.customer_id,
        contracts.product_id,
        contracts.start_date,
        contracts.claim_date,
        contracts.end_date,
        customers.name as customer_name 
      FROM contracts
      LEFT JOIN customers
      ON contracts.customer_id = customers.id
      WHERE contracts.id = $1
    `,
      [id]
    )
    if (rows.length === 0) {
      return null
    }
    return convertToCamelCaseContractWithCustomer(rows[0])
  } catch (e) {
    server.log.error(e)
    throw new CustomError('failed to find contract by id', 500)
  }
}
