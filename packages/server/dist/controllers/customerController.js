"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerRoutes = void 0;
const customer_1 = require("../models/customer");
const CustomError_1 = __importDefault(require("../errors/CustomError"));
const customerRoutes = async (server, options) => {
    server.get('/', {
        schema: {
            tags: ['customers'],
            description: 'list all customers',
            summary: 'list all customers',
            response: {
                200: {
                    description: 'Successful response',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'array',
                                items: server.getSchema('Customer'),
                            },
                        },
                    },
                    title: 'ApiV1CustomersGet200Response',
                },
            },
        },
    }, async (request, reply) => {
        const result = await (0, customer_1.findAllCustomers)(server);
        reply.status(200).send(result);
    });
    server.get('/:id', {
        schema: {
            tags: ['customers'],
            description: 'get a customer by id',
            summary: 'get a customer by id',
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
                            schema: {
                                type: 'object',
                                items: server.getSchema('Customer'),
                            },
                        },
                    },
                    title: 'ApiV1CustomersIdGet200Response',
                },
                404: {
                    description: 'Customer not found',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                items: server.getSchema('Error'),
                            },
                        },
                    },
                    title: 'ApiV1CustomersIdGet404Response',
                },
            },
        },
    }, async (request, reply) => {
        const { id } = request.params;
        const result = await (0, customer_1.findCustomerById)(server, id);
        if (!result) {
            throw new CustomError_1.default('Customer not found', 404);
        }
        reply.status(200).send(result);
    });
    server.post('/', {
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
                required: ['name', 'email', 'phone'],
            },
            response: {
                201: {
                    description: 'Customer created successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                items: server.getSchema('Customer'),
                            },
                        },
                    },
                    title: 'ApiV1CustomersPost201Response',
                },
                400: {
                    description: 'Invalid request data',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                items: server.getSchema('Error'),
                            },
                        },
                    },
                    title: 'ApiV1CustomersPost400Response',
                },
            },
        },
    }, async (request, reply) => {
        const { name, email, phone, address, emailNotification, smsNotification, kakaoNotification, } = request.body;
        const result = await (0, customer_1.createCustomer)(server, name, email, phone, address, emailNotification, smsNotification, kakaoNotification);
        reply.status(201).send(result);
    });
    server.put('/:id', {
        schema: {
            tags: ['customers'],
            description: 'update a customer by id',
            summary: 'update a customer by id',
            params: {
                type: 'object',
                properties: {
                    id: { type: 'string' },
                },
                required: ['id'],
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
                200: {
                    description: 'Customer updated successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                items: server.getSchema('Customer'),
                            },
                        },
                    },
                    title: 'ApiV1CustomersPut200Response',
                },
                404: {
                    description: 'Customer not found',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                items: server.getSchema('Error'),
                            },
                        },
                    },
                    title: 'ApiV1CustomersPut404Response',
                },
            },
        },
    }, async (request, reply) => {
        const { id } = request.params;
        const { name, email, phone, address, emailNotification, smsNotification, kakaoNotification, } = request.body;
        const result = await (0, customer_1.updateCustomerById)(server, id, name, email, phone, address, emailNotification, smsNotification, kakaoNotification);
        if (!result) {
            throw new CustomError_1.default('Customer not found', 404);
        }
        reply.status(200).send(result);
    });
    server.delete('/:id', {
        schema: {
            tags: ['customers'],
            description: 'delete a customer by id',
            summary: 'delete a customer by id',
            params: {
                type: 'object',
                properties: {
                    id: { type: 'string' },
                },
                required: ['id'],
            },
            response: {
                200: {
                    description: 'Successful response',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: { type: 'string' },
                                },
                            },
                        },
                    },
                    title: 'ApiV1CustomersDelete200Response',
                },
                404: {
                    description: 'Customer not found',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                items: server.getSchema('Error'),
                            },
                        },
                    },
                    title: 'ApiV1CustomersDelete404Response',
                },
            },
        },
    }, async (request, reply) => {
        const { id } = request.params;
        const result = await (0, customer_1.deleteCustomerById)(server, id);
        if (!result) {
            throw new CustomError_1.default('Customer not found', 404);
        }
        reply.status(200).send({ message: 'Customer deleted' });
    });
};
exports.customerRoutes = customerRoutes;
//# sourceMappingURL=customerController.js.map