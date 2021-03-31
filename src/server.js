import dotEnv from "dotenv"
import buildApp from "./app.js"

dotEnv.config()

const fastify = await buildApp()

try {
  await fastify.listen(process.env.PORT || 8080)
  console.log("Listening on port: ", process.env.PORT || 8080)
} catch (error) {
  fastify.log.error(error)
  process.exit(1)
}