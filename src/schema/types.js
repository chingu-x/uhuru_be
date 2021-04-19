const { gql } = require("apollo-server-express");

module.exports = gql`

  type wakeup {
    name: String
  }

  type MutationError {
    message: String!
    code: String
  }

  type SendMessageMutationResponse {
    error: MutationError
  }

  type WakeUpMutationResponse {
    error: MutationError
  }

`;