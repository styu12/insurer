import fastify from 'fastify';
import routes from './routes';

const server = fastify({
    logger: true
});

server.register(routes);

export default server;
