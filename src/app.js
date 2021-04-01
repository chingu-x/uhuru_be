import Fastify from 'fastify'
import formbody from 'fastify-formbody'
import { chsRoutes } from './routes/routes.js'

export default async function buildApp() {
  const fastify = Fastify({
    logger: true,
  })

  fastify.register(formbody)


  // fastify.register(routes, { prefix: "/" })
  // Register routes to handle blog posts
  chsRoutes.forEach((route, index) => {
    fastify.route(route)
  })

  return fastify
}