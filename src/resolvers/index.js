const sendMail = require('./sendMail')
const sendTigerHunt = require('./sendTigerHunt')

const resolvers = {
  Query: {
    wakeUp: (_, __, context) => {
      return {
        result: {
          message: "wakeUp query resolver",
          code: "OK"
        }
      }
    }
  },
  Mutation: {
    sendMessage: (_, __, context) => {
      sendMail(_, __, context)
      return {
        result: {
          message: "sendMessage invoked",
          code: "OK"
        }
      }
    },
    sendTigerHunt: (_, __, context) => {
      sendTigerHunt(_, __, context)
      return {
        result: {
          message: "sendTigerHunt invoked",
          code: "OK"
        }
      }
    },
    wakeUp: (_, __, context) => {
      return {
        result: {
          message: "CHS73BE Server is awake",
          code: "OK"
        }
      }
    },
  }
}

module.exports = resolvers