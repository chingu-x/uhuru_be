import CorsPlugin from "fastify-cors"
import nodemailjet from "node-mailjet"

export default async function routes(fastify) {
  fastify.register(CorsPlugin, { origin: true })
  
  /*
  fastify.post("/user", async function createUser(request, reply) {
    const newUser = request.body

    if (!newUser) {
      throw new Error("Error creating user")
    }

    reply.status(201).send(newUser)
  })
  */

  fastify.post("/addcomment", async function addComment(request, reply) {
    //const comment = request.body;

    const mailjet = nodemailjet
      .connect('tbd', 'tbd')

    const mjreq = mailjet
      .post("send", {'version': 'v3.1'})
      .request({
        "Messages":[
          {
            "From": {
              "Email": "jdmedlock@gmail.com",
              "Name": "Jim"
            },
            "To": [
              {
                "Email": "jdmedlock@gmail.com",
                "Name": "Jim"
              }
            ],
            "Subject": "CHS73 - New comment from ",
            "TextPart": "My first Mailjet email",
            "HTMLPart": "<h3>New comment from someone",
          }
        ]
      })
    mjreq
      .then((result) => {
        console.log(result.body)
        reply.status(201).send("Comment added: ", result.body)
      })
      .catch((err) => {
        console.log(err.statusCode)
        reply.status(401).send("Error commenting: ", err)
      })
  });

  fastify.get("/:user_id", async function getUser(request, reply) {
    const user = {
      id: request.params.user_id,
      first_name: "Bobinsky",
      last_name: "Oso",
    }

    reply.send(user);
  })
}