
const wakeUp = (request, reply) => {  
  console.log('wakeUp called')
  reply.status(200).send({ status: "Awake" })
}

module.exports = wakeUp