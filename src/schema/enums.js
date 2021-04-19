const { gql } = require("apollo-server-express")

module.exports = gql`
  enum UserSessionStatus {
    ACTIVE
    LOGGED_OUT
    AUTO_LOGGED_OUT
  }
`