"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findContractById = exports.findAllContracts = exports.createContract = void 0;
const CustomError_1 = __importDefault(require("../errors/CustomError"));
function convertToCamelCase(row) {
    return {
        id: row.id,
        title: row.title,
        description: row.description,
        customerId: row.customer_id,
        productId: row.product_id,
        startDate: row.start_date,
        claimDate: row.claim_date,
        endDate: row.end_date,
    };
}
const createContract = async (server, title, description, customerId, productId, startDate, claimDate, endDate) => {
    try {
        const { rows } = await server.pg.query('INSERT INTO contracts (title, description, customer_id, product_id, start_date, claim_date, end_date) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [title, description, customerId, productId, startDate, claimDate, endDate]);
        return convertToCamelCase(rows[0]);
    }
    catch (e) {
        server.log.error(e);
        throw new CustomError_1.default('failed to create contract', 500);
    }
};
exports.createContract = createContract;
const findAllContracts = async (server) => {
    try {
        const { rows } = await server.pg.query('SELECT * FROM contracts');
        return rows.map(convertToCamelCase);
    }
    catch (e) {
        server.log.error(e);
        throw new CustomError_1.default('failed to find all contracts', 500);
    }
};
exports.findAllContracts = findAllContracts;
const findContractById = async (server, id) => {
    try {
        const { rows } = await server.pg.query('SELECT * FROM contracts WHERE id = $1', [id]);
        if (rows.length === 0) {
            return null;
        }
        return convertToCamelCase(rows[0]);
    }
    catch (e) {
        server.log.error(e);
        throw new CustomError_1.default('failed to find contract by id', 500);
    }
};
exports.findContractById = findContractById;
//# sourceMappingURL=contract.js.map