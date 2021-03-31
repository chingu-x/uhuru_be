import Fastify from "fastify"
import { chsRoutes } from './routes/routes.js'

export default async function buildApp() {
  const fastify = Fastify({
    logger: true,
  })

  // fastify.register(routes, { prefix: "/" })
  // Register routes to handle blog posts
  chsRoutes.forEach((route, index) => {
    fastify.route(route)
  })

  return fastify
}