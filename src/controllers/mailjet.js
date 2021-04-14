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
          "TextPart": `
            Email from: ${ request.body.name } Email address: ${ request.body.from }\r\n \
            Street: ${ request.body.street }\r\n \
            City: ${ request.body.city } State: ${ request.body.state } Zip: ${ request.body.zipcode }\r\n \
            Phone: ${ request.body.phone }
            Volunteer to help: ${ request.body.volunteer }\r\n \
            Message from classmate:\r\n ${ request.body.message }
          `,
          "HTMLPart": ` \
            <div style=\"font-weight: bold; font-size: medium;\">Email from: \
              <span style=\"font-weight: normal; font-size: medium;\">${ request.body.name } </span>\
              <span style=\"font-weight: bold; font-size: medium;\">Email address: </span> \
              <span style=\"font-weight: normal; font-size: medium;\">${ request.body.from }</span> \
            </div> \
            <div style=\"margin-top: .25rem; font-weight: bold; font-size: medium;\">Street: \
              <span style=\"font-weight: normal; font-size: medium;\">${ request.body.street }</span> \
            </div> \
            <div style=\"margin-top: .25rem; font-weight: bold; font-size: medium;\">City: \
              <span style=\"font-weight: normal; font-size: medium;\">${ request.body.city } </span> \
              <span style=\"font-weight: bold; font-size: medium;\">State: </span>\
              <span style=\"font-weight: normal; font-size: medium;\">${ request.body.state }</span> \
              <span style=\"font-weight: bold; font-size: medium;\">Zip: </span>\
              <span style=\"font-weight: normal; font-size: medium;\">${ request.body.zipcode }</span> \
            </div> \
            <div style=\"margin-top: .25rem; font-weight: bold; font-size: medium;\">Phone: \
              <span style=\"font-weight: normal; font-size: medium;\">${ request.body.phone }</span> \
            </div> \
            <div style=\"margin-top: .25rem; font-weight: bold; font-size: medium;\">Volunteer to help:  \
              <span style=\"font-weight: normal; font-size: medium;\">${ request.body.volunteer }</span>
            </div>\ 
            <div style=\"margin-top: 1rem; font-weight: bold; font-size: medium;\">Message from classmate:</div>\ 
            <div style=\"margin-top: .25rem; font-size: medium;\">
              <span style=\"font-weight: normal; font-size: medium;\">${ request.body.message }</span> \
            </div> \
          `,
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
