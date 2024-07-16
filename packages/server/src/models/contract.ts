import { FastifyInstance } from 'fastify'
import CustomError from '../errors/CustomError'

export interface Contract {
  id: number
  customerId: number
  productId: number
  startDate: string // YYYY-MM-DD
  renewalDate: string // YYYY-MM-DD
  claimDate: string // YYYY-MM-DD
}

function convertToCamelCase(row: any): Contract {
  return {
    id: row.id,
    customerId: row.customer_id,
    productId: row.product_id,
    startDate: row.start_date,
    renewalDate: row.renewal_date,
    claimDate: row.claim_date,
  };
}

export const createContract = async (server: FastifyInstance, customerId: number, productId: number, startDate: string, renewalDate: string, claimDate: string): Promise<Contract> => {
  try {
    const { rows } = await server.pg.query(
      'INSERT INTO contracts (customer_id, product_id, start_date, renewal_date, claim_date) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [customerId, productId, startDate, renewalDate, claimDate]
    )
    return convertToCamelCase(rows[0])
  } catch(e) {
    server.log.error(e)
    throw new CustomError("failed to create contract", 500);
  }
}
