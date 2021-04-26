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

  type SendMessageMutationResponse {
    result: MutationResult
  }

  type SendTigerHuntMutationResponse {
    result: MutationResult
  }

  type WakeUpMutationResponse {
    result: MutationResult
  }

  type Query {
    wakeUp: WakeUpMutationResponse
  }

  type Mutation {
    sendMessage(    
      fromEmail: String!
      fullName: String!
      message: String!
      street: String
      city: String
      state: String
      zipcode: Int
      phone: String
      volunteer: Boolean
    ): SendMessageMutationResponse

    sendTigerHunt(    
      fromEmail: String!
      fromName: String!
      classmateName: String!
      classmateEmail: String
      classmateStreet: String
      classmateCity: String
      classmateState: String
      classmateZipcode: Int
      classmatePhone: String
      isClassmateDeceased: Boolean
      classmateInfo: String
    ): SendTigerHuntMutationResponse

    wakeUp: WakeUpMutationResponse
  }
`;

module.exports = typeDefs;
