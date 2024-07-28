import fp from 'fastify-plugin'
import swagger from '@fastify/swagger'
import swaggerUI from '@fastify/swagger-ui'
import { FastifyInstance } from 'fastify'

const fastifySwagger = async (server: FastifyInstance) => {
  registerSchemas(server)

  await server.register(swagger, {
    openapi: {
      openapi: '3.0.0',
      info: {
        title: 'Insurer',
        description: 'Insurer API Documentation',
        version: '0.1.0',
      },
      servers: [
        {
          url: 'http://localhost:3000',
          description: 'Development server',
        },
      ],
      components: {
        securitySchemes: {
          apiKey: {
            type: 'apiKey',
            name: 'apiKey',
            in: 'header',
          },
        },
        externalDocs: {
          url: 'https://swagger.io',
          description: 'Find more info here',
        },
        tags: [
          { name: 'contracts', description: 'Contract related end-points' },
          { name: 'customers', description: 'Customer related end-points' },
          { name: 'products', description: 'Product related end-points' },
          {
            name: 'notifications',
            description: 'Notification related end-points',
          },
        ],
      },
    },
  })

  await server.register(swaggerUI, {
    routePrefix: '/docs',
    uiConfig: {
      deepLinking: false, // 해시 링크 기능을 비활성화합니다.
    },
  })
}

const registerSchemas = (server: FastifyInstance) => {
  server.addSchema({
    $id: 'Customer',
    type: 'object',
    properties: {
      id: { type: 'number' },
      name: { type: 'string' },
      email: { type: 'string' },
      phone: { type: 'string' },
      address: { type: 'string' },
      emailNotification: { type: 'boolean' },
      smsNotification: { type: 'boolean' },
      kakaoNotification: { type: 'boolean' },
    },
  })

  server.addSchema({
    $id: 'Product',
    type: 'object',
    properties: {
      id: { type: 'number' },
      name: { type: 'string' },
      description: { type: 'string' },
    },
  })

  server.addSchema({
    $id: 'Contract',
    type: 'object',
    properties: {
      id: { type: 'number' },
      title: { type: 'string' },
      description: { type: 'string' },
      customerId: { type: 'number' },
      productId: { type: 'number' },
      startDate: { type: 'string' },
      claimDate: { type: 'string' },
      endDate: { type: 'string' },
    },
  })

  server.addSchema({
    $id: 'ContractWithCustomer',
    type: 'object',
    properties: {
      id: { type: 'number' },
      title: { type: 'string' },
      description: { type: 'string' },
      customerId: { type: 'number' },
      customerName: { type: 'string' },
      productId: { type: 'number' },
      startDate: { type: 'string' },
      claimDate: { type: 'string' },
      endDate: { type: 'string' },
    },
  })

  server.addSchema({
    $id: 'User',
    type: 'object',
    properties: {
      id: { type: 'number' },
      username: { type: 'string' },
      email: { type: 'string' },
      emailNotification: { type: 'boolean' },
      smsNotification: { type: 'boolean' },
      kakaoNotification: { type: 'boolean' },
    },
  })

  server.addSchema({
    $id: 'Error',
    type: 'object',
    properties: {
      message: { type: 'string' },
    },
  })
}

export default fp(fastifySwagger)
