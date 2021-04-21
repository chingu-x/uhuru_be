const nodemailjet = require("node-mailjet")

const sendMail = (_, __, context) => {
  const { fromEmail, fullName, message, street, city,
    state, zipcode, phone, volunteer } = __
  const mailjet = nodemailjet
    .connect(process.env.MAILJET_API_KEY, process.env.MAILJET_SECRET_KEY)

  console.log(`\nMessage Received from ${ fullName } email: ${ fromEmail }`)
  console.log(`Street: ${ street }`)
  console.log(`City: ${ city } State: ${ state } Zip: ${ zipcode }`)
  console.log(`Phone: ${ phone } Volunteer: ${ volunteer }`)
  console.log(`Message body: ${ message }`)

  const getVolunteerStatus = () => {
    return volunteer ? "Yes": "No"
  }

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
          "Subject": `CHS73 - New comment from ${ fullName }`,
          "TextPart": `
            Email from: ${ fullName } Email address: ${ fromEmail }\r\n \
            Street: ${ street }\r\n \
            City: ${ city } State: ${ state } Zip: ${ zipcode }\r\n \
            Phone: ${ phone }
            Volunteer to help: ${ getVolunteerStatus() }\r\n \
            Message from classmate:\r\n ${ message }
          `,
          "HTMLPart": ` \
            <div style=\"font-weight: bold; font-size: medium;\">Email from: \
              <span style=\"font-weight: normal; font-size: medium;\">${ fullName } </span>\
              <span style=\"font-weight: bold; font-size: medium;\">Email address: </span> \
              <span style=\"font-weight: normal; font-size: medium;\">${ fromEmail }</span> \
            </div> \
            <div style=\"margin-top: .25rem; font-weight: bold; font-size: medium;\">Street: \
              <span style=\"font-weight: normal; font-size: medium;\">${ street }</span> \
            </div> \
            <div style=\"margin-top: .25rem; font-weight: bold; font-size: medium;\">City: \
              <span style=\"font-weight: normal; font-size: medium;\">${ city } </span> \
              <span style=\"font-weight: bold; font-size: medium;\">State: </span>\
              <span style=\"font-weight: normal; font-size: medium;\">${ state }</span> \
              <span style=\"font-weight: bold; font-size: medium;\">Zip: </span>\
              <span style=\"font-weight: normal; font-size: medium;\">${ zipcode }</span> \
            </div> \
            <div style=\"margin-top: .25rem; font-weight: bold; font-size: medium;\">Phone: \
              <span style=\"font-weight: normal; font-size: medium;\">${ phone }</span> \
            </div> \
            <div style=\"margin-top: .25rem; font-weight: bold; font-size: medium;\">Volunteer to help:  \
              <span style=\"font-weight: normal; font-size: medium;\">${ getVolunteerStatus() }</span>
            </div>\ 
            <div style=\"margin-top: 1rem; font-weight: bold; font-size: medium;\">Message from classmate:</div>\ 
            <div style=\"margin-top: .25rem; font-size: medium;\">
              <span style=\"font-weight: normal; font-size: medium;\">${ message }</span> \
            </div> \
          `,
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
}

module.exports = sendMail