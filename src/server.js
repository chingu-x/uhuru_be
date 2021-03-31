import dotEnv from "dotenv"
import buildApp from "./app.js"

dotEnv.config()

const fastify = await buildApp()

try {
  await fastify.listen(process.env.SERVER_PORT)
} catch (error) {
  fastify.log.error(error)
  process.exit(1)
}