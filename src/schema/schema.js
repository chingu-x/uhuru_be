const { gql } = require("apollo-server-express")

const typeDefs = gql`

  enum UserSessionStatus {
    ACTIVE
    LOGGED_OUT
    AUTO_LOGGED_OUT
  }

  input SendMessageInput {
    fromEmail: String!
    fullName: String!
    message: String!
    street: String
    city: String
    state: String
    zipcode: Int
    phone: Int
    volunteer: Boolean
  }

  type MutationResult {
    message: String
    code: String
  }

  type SendMessageMutationResponse {
    result: MutationResult
  }

  type WakeUpMutationResponse {
    result: MutationResult
  }

  type Query {
    wakeUp: WakeUpMutationResponse
  }

  type Mutation {
    sendMessage(message: SendMessageInput!): SendMessageMutationResponse
    wakeUp: WakeUpMutationResponse
  }
`;

module.exports = typeDefs;
