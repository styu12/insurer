'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.productRoutes = void 0
const productRoutes = async (server, options) => {
  server.get('/', async (request, reply) => {
    const { rows } = await server.pg.query('SELECT * FROM products')
    reply.send(rows)
  })
  server.get('/:id', async (request, reply) => {
    const { id } = request.params
    const { rows } = await server.pg.query(
      'SELECT * FROM products WHERE id = $1',
      [id]
    )
    if (rows.length > 0) {
      return rows[0]
    } else {
      reply.status(404).send({ error: 'Product not found' })
    }
  })
  server.post('/', async (request, reply) => {
    const { name, description } = request.body
    const { rows } = await server.pg.query(
      'INSERT INTO products (name, description) VALUES ($1, $2) RETURNING *',
      [name, description]
    )
    return rows[0]
  })
  server.put('/:id', async (request, reply) => {
    const { id } = request.params
    const { name, description } = request.body
    const { rows } = await server.pg.query(
      'UPDATE products SET name = $1, description = $2 WHERE id = $3 RETURNING *',
      [name, description, id]
    )
    if (rows.length > 0) {
      return rows[0]
    } else {
      reply.status(404).send({ error: 'Product not found' })
    }
  })
  server.delete('/:id', async (request, reply) => {
    const { id } = request.params
    await server.pg.query('DELETE FROM products WHERE id = $1 RETURNING *', [
      id,
    ])
    reply.send({ message: 'Product deleted' })
  })
}
exports.productRoutes = productRoutes
//# sourceMappingURL=productController.js.map
