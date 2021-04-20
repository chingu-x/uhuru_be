
input messageInput{
    full_name: String!
    country_code: String!
}

type MutationResult {
  message: String!
  code: String
}

type sendMessagePayload {
  result: MutationResult
}

type wakeupPayload {
  result: MutationResult
}

type Mutation{
    sendMessage(message: messageInput!):sendMessagePayload
    wakeup:wakeupPayload
}