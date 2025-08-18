const asyncHandler = require('express-async-handler')
const nodemailjet = require("node-mailjet")
const messageTemplates = require('../config/messageTemplates.json')

const messageManager = asyncHandler(async (req, res) => {
  const { messageType, toEmail, toName, toVoyage, toVoyageStart, toVoyageStartCT, reason } = req.body

  console.log(`\nNew request received by messageManager:`)
  console.log(`messageType: ${ messageType }`)
  console.log(`toEmail: ${ toEmail }`)
  console.log(`toName: ${ toName }`)
  console.log(`toVoyage: ${ toVoyage }`)
  console.log(`toVoyageStart: ${ toVoyageStart }`)
  console.log(`toVoyageStartCT: ${ toVoyageStartCT }`)
  console.log(`reason: ${ reason }`)

  const messageTemplate = messageTemplates.find((template) => template.messageType === messageType)
  if (messageTemplate === undefined) {
    res.status(500).json({ 
      message: `messageType: ${ messageType } is undefined.`,
      code: 500
    })
  }

  const mailjet = nodemailjet
    .connect(process.env.MAILJET_API_KEY, process.env.MAILJET_SECRET_KEY)

  const mailjetReq = mailjet
    .post("send", {'version': 'v3.1'})
    .request({
      "Messages":[
        {
          "From": {
            "Email": `${ process.env.MAILJET_FROM_EMAIL }`,
            "Name": `${ process.env.MAILJET_FROM_NAME }`
          },
          "To": [
            {
              "Email": `${ toEmail }`,
              "Name": `${ toName }`
            }
          ],
          "TemplateID": messageTemplate.templateID,
          "TemplateLanguage": true,
          "Variables": {
            "toName": `${ toName }`,
            "toVoyage": toVoyage !== undefined ? toVoyage : '',
            "toVoyageStart": toVoyageStart !== undefined ? toVoyageStart : '',
            "toVoyageStartCT": toVoyageStartCT !== undefined ? toVoyageStartCT : '',
            "reason": reason !== undefined ? reason : ''
          }
        }
      ]
    })
  mailjetReq
    .then(async (result) => {
      console.log('mailjetReq successfully completed')
      res.status(200).json({ 
        message: "Message successfully emailed",
        code: 200
      })
    })
    .catch(async (err) => {
      console.log('Error sending comment: ', err)
      res.status(500).json({
          message: "Message email failed",
          code: 500
      })
    })
})

exports.messageManager = messageManager
