import { FastifyInstance } from 'fastify'
import {
  Contract,
  createContract,
  findAllContractsWithCustomer,
  findContractWithCustomerById,
} from '../models/contract'
import { findCustomerById } from '../models/customer'
import CustomError from '../errors/CustomError'
import { findProductById } from '../models/product'

export const contractRoutes = async (server: FastifyInstance) => {
  server.get(
    '/',
    {
      schema: {
        tags: ['contracts'],
        description: 'list all contracts',
        summary: 'list all contracts',
        response: {
          200: {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: server.getSchema('ContractWithCustomer'),
                },
              },
            },
            title: 'ApiV1ContractsGet200Response',
          },
        },
      },
    },
    async (request, reply) => {
      const contractsWithCustomerName =
        await findAllContractsWithCustomer(server)
      reply.status(200).send(contractsWithCustomerName)
    }
  )

  server.get(
    '/:id',
    {
      schema: {
        tags: ['contracts'],
        description: 'list a contract by id',
        summary: 'list a contract by id',
        params: {
          type: 'object',
          properties: {
            id: { type: 'number' },
          },
          required: ['id'],
        },
        response: {
          200: {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: server.getSchema('Contract'),
              },
            },
            title: 'ApiV1ContractsIdGet200Response',
          },
          404: {
            description: 'Contract not found',
            content: {
              'application/json': {
                schema: server.getSchema('Error'),
              },
            },
            title: 'ApiV1ContractsIdGet404Response',
          },
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params as { id: number }
      const contractWithCustomerName = await findContractWithCustomerById(
        server,
        id
      )
      if (!contractWithCustomerName) {
        throw new CustomError('Contract not found', 404)
      }

      reply.status(200).send(contractWithCustomerName)
    }
  )

  server.post(
    '/',
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
          },
          required: ['title', 'customerId', 'startDate'],
        },
        response: {
          201: {
            description: 'Contract created successfully',
            content: {
              'application/json': {
                schema: server.getSchema('Contract'),
              },
            },
            title: 'ApiV1ContractsPost201Response',
          },
          400: {
            description: 'Invalid request data',
            content: {
              'application/json': {
                schema: server.getSchema('Error'),
              },
            },
            title: 'ApiV1ContractsPost400Response',
          },
          404: {
            description: 'Customer or Product not found',
            content: {
              'application/json': {
                schema: server.getSchema('Error'),
              },
            },
            title: 'ApiV1ContractsPost404Response',
          },
        },
      },
    },
    async (request, reply) => {
      const {
        title,
        description,
        customerId,
        productId,
        startDate,
        claimDate,
        endDate,
      } = request.body as Contract

      const customer = await findCustomerById(server, customerId)
      if (!customer) {
        throw new CustomError('Customer not found', 404)
      }
      const product = await findProductById(server, productId)
      if (!product) {
        throw new CustomError('Product not found', 404)
      }

      const contract = await createContract(
        server,
        title,
        description,
        customerId,
        productId,
        startDate,
        claimDate,
        endDate
      )
      reply.status(201).send(contract)
    }
  )
}
