"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductById = exports.updateProductById = exports.findProductById = exports.findAllProducts = exports.createProduct = void 0;
const CustomError_1 = __importDefault(require("../errors/CustomError"));
const createProduct = async (server, name, description) => {
    try {
        const result = await server.pg.query('INSERT INTO products (name, description) VALUES ($1, $2) RETURNING *', [name, description]);
        return result.rows[0];
    }
    catch (e) {
        server.log.error(e);
        throw new CustomError_1.default('failed to create product', 500);
    }
};
exports.createProduct = createProduct;
const findAllProducts = async (server) => {
    try {
        const { rows } = await server.pg.query('SELECT * FROM products');
        return rows;
    }
    catch (e) {
        server.log.error(e);
        throw new CustomError_1.default('failed to find all products', 500);
    }
};
exports.findAllProducts = findAllProducts;
const findProductById = async (server, id) => {
    try {
        const { rows } = await server.pg.query('SELECT * FROM products WHERE id = $1', [id]);
        if (rows.length === 0) {
            return null;
        }
        return rows[0];
    }
    catch (e) {
        server.log.error(e);
        throw new CustomError_1.default('failed to find product by id', 500);
    }
};
exports.findProductById = findProductById;
const updateProductById = async (server, id, name, description) => {
    try {
        const { rows } = await server.pg.query('UPDATE products SET name = $2, description = $3 WHERE id = $1 RETURNING *', [id, name, description]);
        if (rows.length === 0) {
            return null;
        }
        return rows[0];
    }
    catch (e) {
        server.log.error(e);
        throw new CustomError_1.default('failed to update product by id', 500);
    }
};
exports.updateProductById = updateProductById;
const deleteProductById = async (server, id) => {
    try {
        const { rows } = await server.pg.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
        if (rows.length === 0) {
            return null;
        }
        return rows[0];
    }
    catch (e) {
        server.log.error(e);
        throw new CustomError_1.default('failed to delete product by id', 500);
    }
};
exports.deleteProductById = deleteProductById;
//# sourceMappingURL=product.js.map