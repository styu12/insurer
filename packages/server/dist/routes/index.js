"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const customerController_1 = require("../controllers/customerController");
const productController_1 = require("../controllers/productController");
const notificationController_1 = require("../controllers/notificationController");
const userController_1 = require("../controllers/userController");
const contractController_1 = require("../controllers/contractController");
const routes = async (server, options) => {
    server.get('/health', async (request, reply) => {
        return { info: 'This is for health check' };
    });
    const apiV1 = '/api/v1';
    server.register(contractController_1.contractRoutes, { prefix: `${apiV1}/contracts` });
    server.register(customerController_1.customerRoutes, { prefix: `${apiV1}/customers` });
    server.register(productController_1.productRoutes, { prefix: `${apiV1}/products` });
    server.register(notificationController_1.notificationRoutes, { prefix: `${apiV1}/notifications` });
    server.register(userController_1.userRoutes, { prefix: `${apiV1}/users` });
};
exports.default = (0, fastify_plugin_1.default)(routes);
//# sourceMappingURL=index.js.map