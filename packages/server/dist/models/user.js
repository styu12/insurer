"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserById = exports.findUserByUsername = exports.createUser = void 0;
const CustomError_1 = __importDefault(require("../errors/CustomError"));
function convertToCamelCase(row) {
    return {
        id: row.id,
        username: row.username,
        password: row.password,
        email: row.email,
        emailNotification: row.email_notification,
        smsNotification: row.sms_notification,
        kakaoNotification: row.kakao_notification,
    };
}
const createUser = async (server, username, hashedPassword, email, emailNotification, smsNotification, kakaoNotification) => {
    try {
        const result = await server.pg.query('INSERT INTO users (username, password, email, email_notification, sms_notification, kakao_notification) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [
            username,
            hashedPassword,
            email,
            emailNotification,
            smsNotification,
            kakaoNotification,
        ]);
        return convertToCamelCase(result.rows[0]);
    }
    catch (e) {
        server.log.error(e);
        throw new CustomError_1.default('failed to create user', 500);
    }
};
exports.createUser = createUser;
const findUserByUsername = async (server, username) => {
    try {
        const result = await server.pg.query('SELECT * FROM users WHERE username = $1', [username]);
        if (result.rows.length === 0) {
            return null;
        }
        return convertToCamelCase(result.rows[0]);
    }
    catch (e) {
        server.log.error(e);
        throw new CustomError_1.default('failed to find user by username', 500);
    }
};
exports.findUserByUsername = findUserByUsername;
const findUserById = async (server, id) => {
    try {
        const result = await server.pg.query('SELECT * FROM users WHERE id = $1', [
            id,
        ]);
        if (result.rows.length === 0) {
            return null;
        }
        return convertToCamelCase(result.rows[0]);
    }
    catch (e) {
        server.log.error(e);
        throw new CustomError_1.default('failed to find user by id', 500);
    }
};
exports.findUserById = findUserById;
//# sourceMappingURL=user.js.map