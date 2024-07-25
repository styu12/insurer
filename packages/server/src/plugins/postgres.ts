import { FastifyInstance, HookHandlerDoneFunction } from 'fastify'
import fp from 'fastify-plugin'
import fastifyPostgres from '@fastify/postgres'

const postgresConnector = async (server: FastifyInstance) => {
  server.register(fastifyPostgres, {
    connectionString: process.env.POSTGRES_URL,
  })

  server.after(async () => {
    // create users table
    await server.pg.query(`
            CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            email_notification BOOLEAN NOT NULL DEFAULT FALSE,
            sms_notification BOOLEAN NOT NULL DEFAULT FALSE,
            kakao_notification BOOLEAN NOT NULL DEFAULT FALSE
        );
    `)

    // create customers table
    await server.pg.query(`
            CREATE TABLE IF NOT EXISTS customers (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            phone VARCHAR(255) NOT NULL,
            address VARCHAR(255),
            email_notification BOOLEAN NOT NULL DEFAULT FALSE,
            sms_notification BOOLEAN NOT NULL DEFAULT FALSE,
            kakao_notification BOOLEAN NOT NULL DEFAULT FALSE
        );
    `)

    // create products table
    await server.pg.query(`
            CREATE TABLE IF NOT EXISTS products (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            description TEXT
        );
    `)

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
    `)
  })
}

export default fp(postgresConnector)
