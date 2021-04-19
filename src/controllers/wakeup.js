
const wakeUp = async (request, reply) => {  
  console.log('wakeUp called')
  await reply.code(200).send({ status: "Awake" })
}

module.exports = wakeUp