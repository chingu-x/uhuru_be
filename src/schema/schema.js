const { gql } = require("apollo-server-express")

const typeDefs = gql`

  enum UserSessionStatus {
    ACTIVE
    LOGGED_OUT
    AUTO_LOGGED_OUT
  }

  type MutationResult {
    message: String
    code: String
  }

  type WakeUpMutationResponse {
    result: MutationResult
  }

  type Query {
    wakeUp: WakeUpMutationResponse
  }

  type Mutation {
    wakeUp: WakeUpMutationResponse
  }
`;

module.exports = typeDefs;
