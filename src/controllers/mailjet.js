import nodemailjet from "node-mailjet"

export const sendMessage = async (request, reply) => {  
  const mailjet = nodemailjet
    .connect(process.env.MAILJET_API_KEY, process.env.MAILJET_SECRET_KEY)

  console.log(`\nMessage Received from ${ request.body.name } email: ${ request.body.from }`)
  console.log(`Message body: ${ request.body.message }`)
  console.log(`Street: ${ request.body.street }`)
  console.log(`City: ${ request.body.city } State: ${ request.body.state } Zip: ${ request.body.zipcode }`)
  console.log(`Phone: ${ request.body.phone }`)
  console.log(`Volunteer: ${ request.body.volunteer }`)

  const mailjetReq = mailjet
    .post("send", {'version': 'v3.1'})
    .request({
      "Messages":[
        {
          "From": {
            "Email": `${ process.env.EMAIL_SENDER_ADDR }`,
            "Name": `${ process.env.EMAIL_SENDER_NAME }`
          },
          "To": [
            {
              "Email": `${ process.env.EMAIL_RECIPIENT_ADDR }`,
              "Name": `${ process.env.EMAIL_RECIPIENT_NAME }`
            }
          ],
          "Subject": `CHS73 - New comment from ${ request.body.name }`,
          "TextPart": `${ request.body.message }`,
          "HTMLPart": `<h3>Email from: ${ request.body.name }</h3><h3>Email address: (${ request.body.from })</h3><p>${ request.body.message }</p>`,
        }
      ]
    })
  return mailjetReq
    .then(async (result) => {
      await reply.code(200).send({ status: "Message successfully sent" })
    })
    .catch(async (err) => {
      console.log('Error sending comment: ', err)
      await reply.code(500).send(err)
    })
}
