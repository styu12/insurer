import server from './app'

const start = async () => {
  let port = 3000
  if (process.env.PORT) {
    port = parseInt(process.env.PORT)
  }

  try {
    await server.listen({ port: port, host: '0.0.0.0' })
    console.log('Server is running at http://localhost:3000')
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

start()
