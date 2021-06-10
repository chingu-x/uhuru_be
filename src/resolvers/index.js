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