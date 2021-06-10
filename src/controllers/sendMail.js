const asyncHandler = require('express-async-handler')
const nodemailjet = require("node-mailjet")

const sendMail = asyncHandler(async (req, res) => {
  console.log("I'm ready to send some email!")
  res.status(200).json({ status: "ok" })

  console.log('req.body: ', req.body)

  const { fromEmail, fromName, toEmail, toName, 
    subject, textMessage, htmlMessage } = req.body

  console.log(`New request received by sendMail:`)
  console.log(`fromEmail: ${ fromEmail }`)
  console.log(`fromName: ${ fromName }`)
  console.log(`toEmail: ${ toEmail }`)
  console.log(`toName: ${ toName }`)
  console.log(`subject: ${ subject }`)
  console.log(`textMessage: ${ textMessage }`)
  console.log(`htmlMessage: ${ htmlMessage }`)

  const mailjet = nodemailjet
    .connect(process.env.MAILJET_API_KEY, process.env.MAILJET_SECRET_KEY)

  const mailjetReq = mailjet
    .post("send", {'version': 'v3.1'})
    .request({
      "Messages":[
        {
          "From": {
            "Email": `${ fromEmail }`,
            "Name": `${ fromName }`
          },
          "To": [
            {
              "Email": `${ toEmail }`,
              "Name": `${ toName }`
            }
          ],
          "Subject": `${ subject }`,
          "TextPart": `${ textMessage }`,
          "HTMLPart": `${ htmlMessage }`,
        }
      ]
    })
  mailjetReq
    .then(async (result) => {
      return {
        result: {
          message: "Message successfully emailed",
          code: 200
        }
      }
    })
    .catch(async (err) => {
      console.log('Error sending comment: ', err)
      return {
        result: {
          message: "Message email failed",
          code: 500
        }
      }
    })
})

exports.sendMail = sendMail
