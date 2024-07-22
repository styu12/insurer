'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const app_1 = __importDefault(require('./app'))
const start = async () => {
  let port = 3000
  if (process.env.PORT) {
    port = parseInt(process.env.PORT)
  }
  try {
    await app_1.default.listen({ port: port, host: '0.0.0.0' })
    console.log('Server is running at http://localhost:3000')
  } catch (err) {
    app_1.default.log.error(err)
    process.exit(1)
  }
}
start()
//# sourceMappingURL=index.js.map
