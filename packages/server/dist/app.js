'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const fastify_1 = __importDefault(require('fastify'))
const env_1 = __importDefault(require('@fastify/env'))
const postgres_1 = __importDefault(require('./plugins/postgres'))
const routes_1 = __importDefault(require('./routes'))
const server = (0, fastify_1.default)({
  logger: true,
})
const envSchema = {
  type: 'object',
  required: [
    'PORT',
    'POSTGRES_URL',
    'NAVER_USER',
    'NAVER_PASS',
    'NAVER_EMAIL',
    'NAVER_SMTP_HOST',
    'NAVER_SMTP_PORT',
  ],
  properties: {
    PORT: { type: 'string', default: '5000' },
    POSTGRES_URL: { type: 'string' },
    NAVER_USER: { type: 'string' },
    NAVER_PASS: { type: 'string' },
    NAVER_EMAIL: { type: 'string' },
    NAVER_SMTP_HOST: { type: 'string' },
    NAVER_SMTP_PORT: { type: 'string', default: '587' },
  },
}
server
  .register(env_1.default, {
    schema: envSchema,
    dotenv: true,
  })
  .ready((err) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    console.log('Environment variables loaded successfully')
  })
server.register(postgres_1.default)
server.register(routes_1.default)
exports.default = server
//# sourceMappingURL=app.js.map
