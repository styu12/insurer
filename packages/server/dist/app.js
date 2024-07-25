"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const env_1 = __importDefault(require("@fastify/env"));
const jwt_1 = __importDefault(require("@fastify/jwt"));
const postgres_1 = __importDefault(require("./plugins/postgres"));
const swagger_1 = __importDefault(require("./plugins/swagger"));
const routes_1 = __importDefault(require("./routes"));
const process = __importStar(require("process"));
const CustomError_1 = __importDefault(require("./errors/CustomError"));
const server = (0, fastify_1.default)({
    logger: true,
});
const envSchema = {
    type: 'object',
    required: [
        'PORT',
        'POSTGRES_URL',
        'NAVER_USER',
        'NAVER_PASS',
        'NAVER_EMAIL',
        'NAVER_SMTP_HOST',
        'NAVER_SMTP_PORT',
        'JWT_SECRET',
    ],
    properties: {
        PORT: { type: 'string', default: '5000' },
        POSTGRES_URL: { type: 'string' },
        NAVER_USER: { type: 'string' },
        NAVER_PASS: { type: 'string' },
        NAVER_EMAIL: { type: 'string' },
        NAVER_SMTP_HOST: { type: 'string' },
        NAVER_SMTP_PORT: { type: 'string', default: '587' },
        JWT_SECRET: { type: 'string' },
    },
};
server
    .register(env_1.default, {
    schema: envSchema,
    dotenv: true,
})
    .ready((err) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log('Environment variables loaded successfully');
});
server.register(jwt_1.default, {
    secret: 'supersecret',
});
server.setErrorHandler((error, request, reply) => {
    if (error instanceof CustomError_1.default) {
        reply.status(error.statusCode).send({
            error: error.name,
            message: error.message,
        });
    }
    else {
        reply.status(500).send({
            error: 'InternalServerError',
            message: 'An unexpected error occurred',
        });
    }
});
server.decorate('authenticate', async (request, reply) => {
    const token = request.headers.authorization?.replace('Bearer ', '');
    if (!token) {
        throw new CustomError_1.default('Unauthorized', 401);
    }
    try {
        request.user = await server.jwt.verify(token);
    }
    catch (error) {
        throw new CustomError_1.default('Unauthorized', 401);
    }
});
server.register(postgres_1.default);
server.register(swagger_1.default);
server.register(routes_1.default);
exports.default = server;
//# sourceMappingURL=app.js.map