import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import fp from 'fastify-plugin';
import { customerRoutes } from "../controllers/customerController";
import { productRoutes } from "../controllers/productController";

const routes = async (server: FastifyInstance, options: FastifyPluginOptions)=> {
    server.get('/', async (request, reply) => {
        return { hello: 'world' };
    })

    server.get('/health', async (request, reply) => {
        return { info: 'This is for health check' };
    });

    const apiV1 = '/api/v1';
    server.register(customerRoutes, { prefix: `${apiV1}/customers` });
    server.register(productRoutes, { prefix: `${apiV1}/products` });
}

export default fp(routes);
