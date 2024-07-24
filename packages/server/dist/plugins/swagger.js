"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const swagger_1 = __importDefault(require("@fastify/swagger"));
const swagger_ui_1 = __importDefault(require("@fastify/swagger-ui"));
const fastifySwagger = async (server) => {
    registerSchemas(server);
    await server.register(swagger_1.default, {
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
                schemas: {
                    Customer: {
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
                    },
                    Product: {
                        type: 'object',
                        properties: {
                            id: { type: 'number' },
                            name: { type: 'string' },
                            description: { type: 'string' },
                        },
                    },
                    Contract: {
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
                    },
                    User: {
                        type: 'object',
                        properties: {
                            id: { type: 'number' },
                            username: { type: 'string' },
                            email: { type: 'string' },
                            emailNotification: { type: 'boolean' },
                            smsNotification: { type: 'boolean' },
                            kakaoNotification: { type: 'boolean' },
                        },
                    },
                    Error: {
                        type: 'object',
                        properties: {
                            message: { type: 'string' },
                        },
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
                    { name: 'notifications', description: 'Notification related end-points' },
                ],
            },
        },
    });
    await server.register(swagger_ui_1.default, {
        routePrefix: '/docs',
        uiConfig: {
            docExpansion: 'none', // 모든 경로를 기본적으로 접습니다.
            deepLinking: false, // 해시 링크 기능을 비활성화합니다.
        },
    });
};
const registerSchemas = (server) => {
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
    });
    server.addSchema({
        $id: 'Product',
        type: 'object',
        properties: {
            id: { type: 'number' },
            name: { type: 'string' },
            description: { type: 'string' },
        },
    });
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
    });
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
    });
    server.addSchema({
        $id: 'Error',
        type: 'object',
        properties: {
            message: { type: 'string' },
        },
    });
};
exports.default = (0, fastify_plugin_1.default)(fastifySwagger);
//# sourceMappingURL=swagger.js.map