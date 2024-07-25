"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contractRoutes = void 0;
const contract_1 = require("../models/contract");
const customer_1 = require("../models/customer");
const CustomError_1 = __importDefault(require("../errors/CustomError"));
const product_1 = require("../models/product");
const contractRoutes = async (server) => {
    server.get('/', {
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
                                items: server.getSchema('Contract'),
                            },
                        },
                    },
                    title: 'ApiV1ContractsGet200Response',
                },
            },
        },
    }, async (request, reply) => {
        const result = await (0, contract_1.findAllContracts)(server);
        reply.status(200).send(result);
    });
    server.get('/:id', {
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
                            schema: {
                                type: 'object',
                                item: server.getSchema('Contract'),
                            },
                        },
                    },
                    title: 'ApiV1ContractsIdGet200Response',
                },
                404: {
                    description: 'Contract not found',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                item: server.getSchema('Error'),
                            },
                        },
                    },
                    title: 'ApiV1ContractsIdGet404Response',
                },
            },
        },
    }, async (request, reply) => {
        const { id } = request.params;
        const result = await (0, contract_1.findContractById)(server, id);
        if (!result) {
            throw new CustomError_1.default('Contract not found', 404);
        }
        reply.status(200).send(result);
    });
    server.post('/', {
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
                            schema: {
                                type: 'object',
                                item: server.getSchema('Contract'),
                            },
                        },
                    },
                    title: 'ApiV1ContractsPost201Response',
                },
                400: {
                    description: 'Invalid request data',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                item: server.getSchema('Error'),
                            },
                        },
                    },
                    title: 'ApiV1ContractsPost400Response',
                },
                404: {
                    description: 'Customer or Product not found',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                item: server.getSchema('Error'),
                            },
                        },
                    },
                    title: 'ApiV1ContractsPost404Response',
                },
            },
        },
    }, async (request, reply) => {
        const { title, description, customerId, productId, startDate, claimDate, endDate, } = request.body;
        const customer = await (0, customer_1.findCustomerById)(server, customerId);
        if (!customer) {
            throw new CustomError_1.default('Customer not found', 404);
        }
        const product = await (0, product_1.findProductById)(server, productId);
        if (!product) {
            throw new CustomError_1.default('Product not found', 404);
        }
        const contract = await (0, contract_1.createContract)(server, title, description, customerId, productId, startDate, claimDate, endDate);
        reply.status(201).send(contract);
    });
};
exports.contractRoutes = contractRoutes;
//# sourceMappingURL=contractController.js.map