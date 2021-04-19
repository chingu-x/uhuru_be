const { gql } = require("apollo-server-express");

module.exports = gql`
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

`;