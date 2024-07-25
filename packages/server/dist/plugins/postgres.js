"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const postgres_1 = __importDefault(require("@fastify/postgres"));
const postgresConnector = async (server) => {
    server.register(postgres_1.default, {
        connectionString: process.env.POSTGRES_URL,
    });
    server.after(async () => {
        // create users table
        await server.pg.query(`
            CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL
        );
    `);
        // create customers table
        await server.pg.query(`
            CREATE TABLE IF NOT EXISTS customers (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            phone VARCHAR(255) NOT NULL,
            address VARCHAR(255) NOT NULL
        );
    `);
        // create products table
        await server.pg.query(`
            CREATE TABLE IF NOT EXISTS products (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            description TEXT
        );
    `);
        // create contracts table
        await server.pg.query(`
            CREATE TABLE IF NOT EXISTS contracts (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description TEXT,
            customer_id INTEGER REFERENCES customers(id) ON DELETE CASCADE,
            product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
            start_date DATE NOT NULL,
            claim_date DATE NOT NULL,
            end_date DATE NOT NULL
        );
    `);
    });
};
exports.default = (0, fastify_plugin_1.default)(postgresConnector);
//# sourceMappingURL=postgres.js.map