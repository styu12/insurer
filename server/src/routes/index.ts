import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import fp from 'fastify-plugin';
import { customerRoutes } from "../controller/customerController";
import { productRoutes } from "../controller/productController";

const routes = async (server: FastifyInstance, options: FastifyPluginOptions)=> {
    server.get('/', async (request, reply) => {
        return { hello: 'world' };
    })

    server.get('/health', async (request, reply) => {
        return { info: 'This is for health check' };
    });

    server.register(customerRoutes);
    server.register(productRoutes);
}

export default fp(routes);
