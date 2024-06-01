import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { products } from '../data/products';

export const productRoutes = async(server: FastifyInstance, options: FastifyPluginOptions) => {
    server.get('/products', async (request, reply) => {
        return products;
    });

    server.get('/products/:id', async (request, reply) => {
        const { id } = request.params as { id: string };
        const product = products.find(p => p.id === parseInt(id));
        if (product) {
            return product;
        } else {
            reply.status(404).send({ error: 'Product not found' });
        }
    });
}
