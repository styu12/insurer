import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import {
  createCustomer,
  Customer,
  deleteCustomerById,
  findAllCustomers,
  findCustomerById,
  updateCustomerById,
} from '../models/customer'
import CustomError from '../errors/CustomError'

export const customerRoutes = async (
  server: FastifyInstance,
  options: FastifyPluginOptions
) => {
  server.get(
    '/',
    {
      schema: {
        tags: ['customers'],
        description: 'list all customers',
        summary: 'list all customers',
        response: {
          200: {
            description: 'Succesful response',
            type: 'array',
            items: server.getSchema('Customer'),
          },
        },
      },
    },
    async (request, reply) => {
      const result = await findAllCustomers(server)
      reply.status(200).send(result)
    }
  )

  server.get(
    '/:id',
    {
      schema: {
        tags: ['customers'],
        description: 'get a customer by id',
        summary: 'get a customer by id',
        params: {
          type: 'object',
          properties: {
            id: { type: 'number' },
          },
        },
        response: {
          200: server.getSchema('Customer'),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params as { id: number }
      const result = await findCustomerById(server, id)
      if (!result) {
        throw new CustomError('Customer not found', 404)
      }

      reply.status(200).send(result)
    }
  )

  server.post(
    '/',
    {
      schema: {
        tags: ['customers'],
        description: 'create a customer',
        summary: 'create a customer',
        body: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            email: { type: 'string' },
            phone: { type: 'string' },
            address: { type: 'string' },
            emailNotification: { type: 'boolean' },
            smsNotification: { type: 'boolean' },
            kakaoNotification: { type: 'boolean' },
          },
        },
        response: {
          201: server.getSchema('Customer'),
        },
      },
    },
    async (request, reply) => {
      const {
        name,
        email,
        phone,
        address,
        emailNotification,
        smsNotification,
        kakaoNotification,
      } = request.body as Customer
      const result = await createCustomer(
        server,
        name,
        email,
        phone,
        address,
        emailNotification,
        smsNotification,
        kakaoNotification
      )
      reply.status(201).send(result)
    }
  )

  server.put(
    '/:id',
    {
      schema: {
        tags: ['customers'],
        description: 'update a customer by id',
        summary: 'update a customer by id',
        params: {
          type: 'object',
          properties: {
            id: { type: 'string' },
          },
        },
        body: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            email: { type: 'string' },
            phone: { type: 'string' },
            address: { type: 'string' },
            emailNotification: { type: 'boolean' },
            smsNotification: { type: 'boolean' },
            kakaoNotification: { type: 'boolean' },
          },
        },
        response: {
          200: server.getSchema('Customer'),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params as { id: number }
      const {
        name,
        email,
        phone,
        address,
        emailNotification,
        smsNotification,
        kakaoNotification,
      } = request.body as Customer
      const result = await updateCustomerById(
        server,
        id,
        name,
        email,
        phone,
        address,
        emailNotification,
        smsNotification,
        kakaoNotification
      )
      if (!result) {
        throw new CustomError('Customer not found', 404)
      }

      reply.status(200).send(result)
    }
  )

  server.delete(
    '/:id',
    {
      schema: {
        tags: ['customers'],
        description: 'delete a customer by id',
        summary: 'delete a customer by id',
        params: {
          type: 'object',
          properties: {
            id: { type: 'string' },
          },
        },
        response: {
          200: {
            description: 'Succesful response',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params as { id: number }
      const result = await deleteCustomerById(server, id)
      if (!result) {
        throw new CustomError('Customer not found', 404)
      }

      reply.status(200).send({ message: 'Customer deleted' })
    }
  )
}
