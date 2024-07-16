import { FastifyInstance } from 'fastify'
import CustomError from '../errors/CustomError'

export interface Product {
  id: number
  name: string
  description: string
}

export const createProduct = async (server: FastifyInstance, name: string, description: string): Promise<Product> => {
  try {
    const result = await server.pg.query(
      'INSERT INTO products (name, description) VALUES ($1, $2) RETURNING *',
      [name, description]
    );
    return result.rows[0];
  }  catch (e) {
    server.log.error(e)
    throw new CustomError("failed to create product", 500);
  }
}

export const findAllProducts = async (server: FastifyInstance): Promise<Product[]> => {
  try {
    const { rows } = await server.pg.query('SELECT * FROM products')
    return rows
  } catch(e) {
    server.log.error(e)
    throw new CustomError("failed to find all products", 500);
  }
}

export const findProductById = async (server: FastifyInstance, id: number): Promise<Product | null> => {
  try {
    const { rows } = await server.pg.query('SELECT * FROM products WHERE id = $1', [id]);
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  } catch(e) {
    server.log.error(e)
    throw new CustomError("failed to find product by id", 500);
  }
}

export const updateProductById = async (server: FastifyInstance, id: number, name: string, description: string): Promise<Product | null> => {
  try {
    const { rows } = await server.pg.query(
      'UPDATE products SET name = $2, description = $3 WHERE id = $1 RETURNING *',
      [id, name, description]
    );
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  } catch(e) {
    server.log.error(e)
    throw new CustomError("failed to update product by id", 500);
  }
}

export const deleteProductById = async (server: FastifyInstance, id: number): Promise<Product | null> => {
  try {
    const { rows } = await server.pg.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  } catch(e) {
    server.log.error(e)
    throw new CustomError("failed to delete product by id", 500);
  }
}
