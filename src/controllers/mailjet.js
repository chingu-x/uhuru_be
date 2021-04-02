import nodemailjet from "node-mailjet"

export const sendMessage = async (request, reply) => {  
  const mailjet = nodemailjet
    .connect(process.env.MAILJET_API_KEY, process.env.MAILJET_SECRET_KEY)

  const mailjetReq = mailjet
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
              "Email": `${ process.env.EMAIL_RECIPIENT_ADDR }`,
              "Name": `${ process.env.EMAIL_RECIPIENT_NAME }`
            }
          ],
          "Subject": `CHS73 - New comment from ${ request.body.name }`,
          "TextPart": `${ request.body.message }`,
          "HTMLPart": `<p>${ request.body.message }</p>`,
        }
      ]
    })
  return mailjetReq
    .then(async (result) => {
      await reply.code(200)
    })
    .catch(async (err) => {
      console.log('Error sending comment: ', err)
      await reply.code(500).send(err)
    })
}
