import dotEnv from "dotenv"
import buildApp from "./app.js"

dotEnv.config()

const fastify = await buildApp()

try {
  await fastify.listen(process.env.PORT, '0.0.0.0')
  console.log('Listening on port: ', process.env.PORT)
} catch (error) {
  fastify.log.error('Error: ', error)
  process.exit(1)
}