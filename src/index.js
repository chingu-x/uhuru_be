// Try this! https://www.digitalocean.com/community/tutorials/how-to-set-up-a-graphql-server-in-node-js-with-apollo-server-and-sequelize

const { ApolloServer } = require('apollo-server-express')
const express = require('express')
const typeDefs = require('./schema/schema')
const resolvers = require('./schema/resolvers')

require("dotenv").config();

//graphql server

//types query/mutation/subscription
/*
const typeDefs = `
    type Query {
        totalPosts: Int!
    }
`;

//resolvers
const resolvers = {
  Query: {
    totalPosts: () => 42,
  },
};
*/

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
})

//express server
const app = express();

apolloServer.applyMiddleware({ app })

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${process.env.PORT}`);
})