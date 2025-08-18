const asyncHandler = require('express-async-handler')
const nodemailjet = require("node-mailjet")
const messageTemplates = require('../config/messageTemplates.json')

const notifyAdmin = asyncHandler(async (messageType, functionName, errorMessage) => {
  console.log(`\nNew request received by notifyAdmin:`)
  console.log(`functionName: ${ functionName }`)
  console.log(`notificationMessage: ${ errorMessage }`)

  const messageTemplate = messageTemplates.find((template) => template.messageType === messageType)
  if (messageTemplate === undefined) {
    return `messageType: ${ messageType } is undefined.`
  }

  const mailjet = nodemailjet
    .connect(process.env.MAILJET_API_KEY, process.env.MAILJET_SECRET_KEY)

  const mailjetReq = mailjet
    .post("send", {'version': 'v3.1'})
    .request({
      "Messages":[
        {
          "From": {
            "Email": "service@chingu.io",
            "Name": "Chingu Admin Team"
          },
          "To": [
            {
              "Email": `service@chingu.io`,
              "Name": `UhuruBE`
            }
          ],
          "TemplateID": messageTemplate.templateID,
          "TemplateLanguage": true,
          "Variables": {
            "functionName": `${ functionName }`,
            "errReason": errorMessage !== undefined ? errorMessage : ''
          }
        }
      ]
    })
  mailjetReq
    .then(async (result) => {
      console.log('mailjetReq successfully completed')
      return "Message successfully emailed"
    })
    .catch(async (err) => {
      console.log('Error sending comment: ', err)
      return "Message email failed"
    })
})

module.exports = notifyAdmin
