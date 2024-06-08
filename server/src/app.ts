import fastify from 'fastify';
import fastifyEnv from '@fastify/env';
import postgresConnector from './plugins/postgres';
import routes from './routes';

const server = fastify({
    logger: true
});

const envSchema = {
    type: 'object',
    required: ['PORT', 'POSTGRES_URL'],
    properties: {
        PORT: {type: 'string', default: '5000'},
        POSTGRES_URL: {type: 'string'},
    }
};

server.register(fastifyEnv, {
    schema: envSchema,
    dotenv: true
}).ready(err => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log('Environment variables loaded successfully')
});

server.register(postgresConnector);

server.register(routes);

export default server;
