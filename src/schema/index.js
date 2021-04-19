const { gql } = require("apollo-server-express")
const enums = require("./enums")
const inputs = require("./inputs")
const types = require("./types")

const typeDefs = gql`

  ${enums}

  ${inputs}

  ${types}

  type Query {
    wakeUp: wakeup
  }

  type Mutation {
    sendMessage(message: SendMessageInput!): SendMessageMutationResponse!
    wakeUp: WakeUpMutationResponse!
  }
`;

module.exports = typeDefs;
