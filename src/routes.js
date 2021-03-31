import CorsPlugin from "fastify-cors"
import nodemailjet from "node-mailjet"

export default async function routes(fastify) {
  fastify.register(CorsPlugin, { origin: true })
  
  fastify.put("/addcomment", async function sendMessage(request, reply) {
    console.log('...addcomment body: ', request.body)
    
    const mailjet = nodemailjet
      .connect(process.env.MAILJET_API_KEY, process.env.MAILJET_SECRET_KEY)

    const mjreq = mailjet
      .post("send", {'version': 'v3.1'})
      .request({
        "Messages":[
          {
            "From": {
              "Email": `${ request.body.from }`,
              "Name": `${ request.body.name }`
            },
            "To": [
              {
                "Email": "jdmedlock@gmail.com",
                "Name": "Jim"
              }
            ],
            "Subject": `CHS73 - New comment from ${ request.body.name }`,
            "TextPart": `${ request.body.message }`,
            "HTMLPart": `<p>${ request.body.message }</p>`,
          }
        ]
      })
    mjreq
      .then((result) => {
        console.log(result.body)
        reply.status(204).send("Comment added: ", result.body)
      })
      .catch((err) => {
        console.log(err.statusCode)
        reply.status(401).send("Error commenting: ", err)
      })
    
  });

}