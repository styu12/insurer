"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoutes = void 0;
const product_1 = require("../models/product");
const CustomError_1 = __importDefault(require("../errors/CustomError"));
const productRoutes = async (server) => {
    server.get('/', {
        schema: {
            tags: ['products'],
            description: 'list all products',
            summary: 'list all products',
            response: {
                200: {
                    description: 'Successful response',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'array',
                                items: server.getSchema('Product'),
                            },
                        },
                    },
                    title: 'ApiV1ProductsGet200Response',
                },
            },
        },
    }, async (request, reply) => {
        const result = await (0, product_1.findAllProducts)(server);
        reply.status(200).send(result);
    });
    server.get('/:id', {
        schema: {
            tags: ['products'],
            description: 'get a product by id',
            summary: 'get a product by id',
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
                                items: server.getSchema('Product'),
                            },
                        },
                    },
                    title: 'ApiV1ProductsIdGet200Response',
                },
                404: {
                    description: 'Product not found',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                items: server.getSchema('Error'),
                            },
                        },
                    },
                    title: 'ApiV1ProductsIdGet404Response',
                },
            },
        },
    }, async (request, reply) => {
        const { id } = request.params;
        const result = await (0, product_1.findProductById)(server, id);
        if (!result) {
            throw new CustomError_1.default('Product not found', 404);
        }
        reply.status(200).send(result);
    });
    server.post('/', {
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
                required: ['name', 'description'],
            },
            response: {
                201: {
                    description: 'Product created successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                items: server.getSchema('Product'),
                            },
                        },
                    },
                    title: 'ApiV1ProductsPost201Response',
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
                    title: 'ApiV1ProductsPost400Response',
                },
            },
        },
    }, async (request, reply) => {
        const { name, description } = request.body;
        const result = await (0, product_1.createProduct)(server, name, description);
        reply.status(201).send(result);
    });
    server.put('/:id', {
        schema: {
            tags: ['products'],
            description: 'update a product by id',
            summary: 'update a product by id',
            params: {
                type: 'object',
                properties: {
                    id: { type: 'number' },
                },
                required: ['id'],
            },
            body: {
                type: 'object',
                properties: {
                    name: { type: 'string' },
                    description: { type: 'string' },
                },
            },
            response: {
                200: {
                    description: 'Product updated successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                items: server.getSchema('Product'),
                            },
                        },
                    },
                    title: 'ApiV1ProductsPut200Response',
                },
                404: {
                    description: 'Product not found',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                items: server.getSchema('Error'),
                            },
                        },
                    },
                    title: 'ApiV1ProductsPut404Response',
                },
            },
        },
    }, async (request, reply) => {
        const { id } = request.params;
        const { name, description } = request.body;
        const result = await (0, product_1.updateProductById)(server, id, name, description);
        if (!result) {
            throw new CustomError_1.default('Product not found', 404);
        }
        reply.status(200).send(result);
    });
    server.delete('/:id', {
        schema: {
            tags: ['products'],
            description: 'delete a product by id',
            summary: 'delete a product by id',
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
                                properties: {
                                    message: { type: 'string' },
                                },
                            },
                        },
                    },
                    title: 'ApiV1ProductsDelete200Response',
                },
                404: {
                    description: 'Product not found',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                items: server.getSchema('Error'),
                            },
                        },
                    },
                    title: 'ApiV1ProductsDelete404Response',
                },
            },
        },
    }, async (request, reply) => {
        const { id } = request.params;
        const result = await (0, product_1.deleteProductById)(server, id);
        if (!result) {
            throw new CustomError_1.default('Product not found', 404);
        }
        reply.status(200).send({ message: 'Product deleted' });
    });
};
exports.productRoutes = productRoutes;
//# sourceMappingURL=productController.js.map