const resolvers = {
  Query: {
    wakeUp() {
      return {
        result: {
          message: "wakeUp query resolver",
          code: "OK"
        }
      }
    }
  },
  Mutation: {
    wakeUp() {
      return {
        result: {
          message: "wakeUp mutation resolver",
          code: "OK"
        }
      }
    }
  }
}

module.exports = resolvers