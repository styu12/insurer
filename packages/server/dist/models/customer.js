"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCustomerById = exports.updateCustomerById = exports.findCustomerById = exports.findAllCustomers = exports.createCustomer = void 0;
const CustomError_1 = __importDefault(require("../errors/CustomError"));
function convertToCamelCase(row) {
    return {
        id: row.id,
        name: row.name,
        email: row.email,
        phone: row.phone,
        address: row.address,
        emailNotification: row.email_notification,
        smsNotification: row.sms_notification,
        kakaoNotification: row.kakao_notification,
    };
}
const createCustomer = async (server, name, email, phone, address, emailNotification, smsNotification, kakaoNotification) => {
    try {
        const { rows } = await server.pg.query('INSERT INTO customers (name, email, phone, address, email_notification, sms_notification, kakao_notification) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [
            name,
            email,
            phone,
            address,
            emailNotification,
            smsNotification,
            kakaoNotification,
        ]);
        return convertToCamelCase(rows[0]);
    }
    catch (e) {
        server.log.error(e);
        throw new CustomError_1.default('failed to create customer', 500);
    }
};
exports.createCustomer = createCustomer;
const findAllCustomers = async (server) => {
    try {
        const { rows } = await server.pg.query('SELECT * FROM customers');
        return rows.map(convertToCamelCase);
    }
    catch (e) {
        server.log.error(e);
        throw new CustomError_1.default('failed to find all customers', 500);
    }
};
exports.findAllCustomers = findAllCustomers;
const findCustomerById = async (server, id) => {
    try {
        const { rows } = await server.pg.query('SELECT * FROM customers WHERE id = $1', [id]);
        if (rows.length === 0) {
            return null;
        }
        return convertToCamelCase(rows[0]);
    }
    catch (e) {
        server.log.error(e);
        throw new CustomError_1.default('failed to find customer by id', 500);
    }
};
exports.findCustomerById = findCustomerById;
const updateCustomerById = async (server, id, name, email, phone, address, emailNotification, smsNotification, kakaoNotification) => {
    try {
        const { rows } = await server.pg.query('UPDATE customers SET name = $2, email = $3, phone = $4, address = $5, email_notification = $6, sms_notification = $7, kakao_notification = $8 WHERE id = $1 RETURNING *', [
            id,
            name,
            email,
            phone,
            address,
            emailNotification,
            smsNotification,
            kakaoNotification,
        ]);
        if (rows.length === 0) {
            return null;
        }
        return convertToCamelCase(rows[0]);
    }
    catch (e) {
        server.log.error(e);
        throw new CustomError_1.default('failed to update customer by id', 500);
    }
};
exports.updateCustomerById = updateCustomerById;
const deleteCustomerById = async (server, id) => {
    try {
        const { rows } = await server.pg.query('DELETE FROM customers WHERE id = $1 RETURNING *', [id]);
        if (rows.length === 0) {
            return null;
        }
        return convertToCamelCase(rows[0]);
    }
    catch (e) {
        server.log.error(e);
        throw new CustomError_1.default('failed to delete customer by id', 500);
    }
};
exports.deleteCustomerById = deleteCustomerById;
//# sourceMappingURL=customer.js.map