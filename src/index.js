// Try this! https://www.digitalocean.com/community/tutorials/how-to-set-up-a-graphql-server-in-node-js-with-apollo-server-and-sequelize

const { ApolloServer } = require('apollo-server-express')
const express = require('express')
const typeDefs = require('./schema/schema')
const resolvers = require('./resolvers')

require('dotenv').config()

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
})

const app = express()
app.get('/', require('./controllers/wakeup'))

apolloServer.applyMiddleware({ app })

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${process.env.PORT}`)
})