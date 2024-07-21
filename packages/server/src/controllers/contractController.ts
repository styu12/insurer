import { FastifyInstance } from 'fastify'
import { Contract, createContract, findAllContracts, findContractById } from '../models/contract'
import { findCustomerById } from '../models/customer'
import CustomError from '../errors/CustomError'
import { findProductById } from '../models/product'

export const contractRoutes = async(
  server: FastifyInstance,
) => {
  server.get('/',
    {
      schema: {
        tags: ['contracts'],
        description: 'list all contracts',
        summary: 'list all contracts',
        response: {
          200: {
            description: 'Succesful response',
            type: 'array',
            items: server.getSchema('Contract')
          }
        }
      }
    },
    async (request, reply) => {
      const result = await findAllContracts(server);
      reply.status(200).send(result)
    }
  )

  server.get('/:id',
    {
      schema: {
        tags: ['contracts'],
        description: 'list a contract by id',
        summary: 'list a contract by id',
        params: {
          type: 'object',
          properties: {
            id: { type: 'number' }
          }
        },
        response: {
          200: server.getSchema('Contract'),
        }
      }
    },
    async (request, reply) => {
      const { id } = request.params as { id: number }
      const result = await findContractById(server, id);
      if (!result) {
        throw new CustomError('Contract not found', 404)
      }

      reply.status(200).send(result)
    }
  )

  server.post('/',
    {
      schema: {
        tags: ['contracts'],
        description: 'create a contract',
        summary: 'create a contract',
        body: {
          type: 'object',
          properties: {
            title: { type: 'string' },
            description: { type: 'string' },
            customerId: { type: 'number' },
            productId: { type: 'number' },
            startDate: { type: 'string' },
            claimDate: { type: 'string' },
            endDate: { type: 'string' },
          }
        },
        response: {
          201: server.getSchema('Contract'),
        }
      }
    },
    async (request, reply) => {
      const { title, description, customerId, productId, startDate, claimDate, endDate } = request.body as Contract

      const customer = await findCustomerById(server, customerId)
      if (!customer) {
        throw new CustomError('Customer not found', 404)
      }
      const product = await findProductById(server, productId)
      if (!product) {
        throw new CustomError('Product not found', 404)
      }

      const contract = await createContract(server, title, description, customerId, productId, startDate, claimDate, endDate)
      reply.status(201).send(contract)
  })
}
