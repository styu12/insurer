import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import {
  createProduct,
  deleteProductById,
  findAllProducts,
  findProductById,
  Product,
  updateProductById,
} from '../models/product'
import CustomError from '../errors/CustomError'

export const productRoutes = async (server: FastifyInstance) => {
  server.get(
    '/',
    {
      schema: {
        tags: ['products'],
        description: 'list all products',
        summary: 'list all products',
        response: {
          200: {
            description: 'Successful response',
            type: 'array',
            items: server.getSchema('Product'),
          },
        },
      },
    },
    async (request, reply) => {
      const result = await findAllProducts(server)
      reply.status(200).send(result)
    }
  )

  server.get(
    '/:id',
    {
      schema: {
        tags: ['products'],
        description: 'get a product by id',
        summary: 'get a product by id',
        params: {
          type: 'object',
          properties: {
            id: { type: 'number' },
          },
        },
        response: {
          200: server.getSchema('Product'),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params as { id: number }
      const result = await findProductById(server, id)
      if (!result) {
        throw new CustomError('Product not found', 404)
      }

      reply.status(200).send(result)
    }
  )

  server.post(
    '/',
    {
      schema: {
        tags: ['products'],
        description: 'create a product',
        summary: 'create a product',
        body: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            description: { type: 'string' },
          },
        },
        response: {
          201: server.getSchema('Product'),
        },
      },
    },
    async (request, reply) => {
      const { name, description } = request.body as Product
      const result = await createProduct(server, name, description)
      reply.status(201).send(result)
    }
  )

  server.put(
    '/:id',
    {
      schema: {
        tags: ['products'],
        description: 'update a product by id',
        summary: 'update a product by id',
        params: {
          type: 'object',
          properties: {
            id: { type: 'number' },
          },
        },
        body: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            description: { type: 'string' },
          },
        },
        response: {
          200: server.getSchema('Product'),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params as { id: number }
      const { name, description } = request.body as Product
      const result = await updateProductById(server, id, name, description)
      if (!result) {
        throw new CustomError('Product not found', 404)
      }

      reply.status(200).send(result)
    }
  )

  server.delete(
    '/:id',
    {
      schema: {
        tags: ['products'],
        description: 'delete a product by id',
        summary: 'delete a product by id',
        params: {
          type: 'object',
          properties: {
            id: { type: 'number' },
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
      const result = await deleteProductById(server, id)
      if (!result) {
        throw new CustomError('Product not found', 404)
      }
      reply.status(200).send({ message: 'Product deleted' })
    }
  )
}
