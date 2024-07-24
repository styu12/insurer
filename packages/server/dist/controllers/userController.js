"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = require("../models/user");
const CustomError_1 = __importDefault(require("../errors/CustomError"));
const userRoutes = async (server) => {
    server.post('/register', {
        schema: {
            tags: ['user'],
            description: 'register new user',
            summary: 'register new user',
            body: {
                type: 'object',
                properties: {
                    username: { type: 'string' },
                    password: { type: 'string' },
                    email: { type: 'string' },
                    emailNotification: { type: 'boolean' },
                    smsNotification: { type: 'boolean' },
                    kakaoNotification: { type: 'boolean' },
                },
                required: ['username', 'password', 'email'],
            },
            response: {
                201: {
                    description: 'User created successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                items: server.getSchema('User'),
                            },
                        },
                    },
                    title: 'ApiV1UsersRegisterPost201Response',
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
                    title: 'ApiV1UsersRegisterPost400Response',
                },
            },
        },
    }, async (request, reply) => {
        const { username, password, email, emailNotification, smsNotification, kakaoNotification, } = request.body;
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const user = await (0, user_1.createUser)(server, username, hashedPassword, email, emailNotification, smsNotification, kakaoNotification);
        reply.status(201).send({
            id: user.id,
            username: user.username,
            email: user.email,
        });
    });
    server.post('/login', {
        schema: {
            tags: ['user'],
            description: 'login',
            summary: 'login',
            body: {
                type: 'object',
                properties: {
                    username: { type: 'string' },
                    password: { type: 'string' },
                },
                required: ['username', 'password'],
            },
            response: {
                200: {
                    description: 'Successful response',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    token: { type: 'string' },
                                },
                            },
                        },
                    },
                    title: 'ApiV1UsersLoginPost200Response',
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
                    title: 'ApiV1UsersLoginPost400Response',
                },
                404: {
                    description: 'User not found',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                items: server.getSchema('Error'),
                            },
                        },
                    },
                    title: 'ApiV1UsersLoginPost404Response',
                },
            },
        },
    }, async (request, reply) => {
        const { username, password } = request.body;
        const user = await (0, user_1.findUserByUsername)(server, username);
        if (!user) {
            throw new CustomError_1.default('User not found', 404);
        }
        if (!(await bcrypt_1.default.compare(password, user.password))) {
            throw new CustomError_1.default('Invalid password', 400);
        }
        const token = server.jwt.sign({ id: user.id, username: user.username });
        reply.status(200).send({ token });
    });
    server.post('/logout', {
        schema: {
            tags: ['user'],
            description: 'logout',
            summary: 'logout',
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
                    title: 'ApiV1UsersLogoutPost200Response',
                },
            },
        },
    }, async (request, reply) => {
        // token should be removed from client side
        reply.status(200).send({ message: 'Logout successful' });
    });
    server.get('/me', {
        preHandler: [server.authenticate],
        schema: {
            tags: ['user'],
            description: 'get profile',
            summary: 'get profile',
            response: {
                200: {
                    description: 'Successful response',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                items: server.getSchema('User'),
                            },
                        },
                    },
                    title: 'ApiV1UsersMeGet200Response',
                },
                404: {
                    description: 'User not found',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                items: server.getSchema('Error'),
                            },
                        },
                    },
                    title: 'ApiV1UsersMeGet404Response',
                },
            },
        },
    }, async (request, reply) => {
        const userId = request.user.id;
        const user = await (0, user_1.findUserById)(server, userId);
        if (!user) {
            throw new CustomError_1.default('User not found', 404);
        }
        reply.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
            emailNotification: user.emailNotification,
            smsNotification: user.smsNotification,
            kakaoNotification: user.kakaoNotification,
        });
    });
};
exports.userRoutes = userRoutes;
//# sourceMappingURL=userController.js.map