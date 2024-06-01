import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { customers } from '../data/customers';

export const customerRoutes = async(server: FastifyInstance, options: FastifyPluginOptions)=> {
    server.get('/customers', async (request, reply) => {
        return customers;
    });

    server.get('/customers/:id', async (request, reply) => {
        const { id } = request.params as { id: string };
        const customer = customers.find(c => c.id === parseInt(id));
        if (customer) {
            return customer;
        } else {
            reply.status(404).send({ error: 'Customer not found' });
        }
    });
}
