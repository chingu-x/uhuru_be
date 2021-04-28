const nodemailjet = require("node-mailjet")

const sendTigerHunt = (_, __, context) => {
  const { fromEmail, fromName, contactName, contactEmail, 
    contactStreet, contactCity, contactState, contactZipcode,
    contactPhone, isContactDeceased, contactInfo, contactType } = __
    
  const mailjet = nodemailjet
    .connect(process.env.MAILJET_API_KEY, process.env.MAILJET_SECRET_KEY)

  console.log(`\nMessage Received from ${ fromName } email: ${ fromEmail }`)
  console.log(`Classmate: ${ contactName } email: ${ contactEmail }`)
  console.log(`Street: ${ contactStreet }`)
  console.log(`City: ${ contactCity } State: ${ contactState } Zip: ${ contactZipcode }`)
  console.log(`Phone: ${ contactPhone } Deceased: ${ isContactDeceased } Type: ${ contactType }`) 
  console.log(`Message body: ${ contactInfo }`)

  const getDeceasedStatus = () => {
    return isContactDeceased ? "Yes": "No"
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
          "Subject": `CHS73 - TigerHunt Info from ${ fromName }`,
          "TextPart": `
            From name: ${ fromName } email: ${ fromEmail } \
            Contact name: ${ contactName } Email: ${ contactEmail }\r\n \
            Street: ${ contactStreet }\r\n \
            City: ${ contactCity } State: ${ contactState } Zip: ${ contactZipcode }\r\n \
            Phone: ${ contactPhone }
            Deceased: ${ getDeceasedStatus() }\r\n \
            Info:\r\n ${ contactInfo }
          `,
          "HTMLPart": ` \
            <div style=\"font-weight: bold; font-size: medium;\">Email from: \
              <span style=\"font-weight: normal; font-size: medium;\">${ fromName } </span>\
              <span style=\"font-weight: bold; font-size: medium;\">Email address: </span> \
              <span style=\"font-weight: normal; font-size: medium;\">${ fromEmail }</span> \
            </div> \
            <div style=\"font-weight: bold; font-size: medium; margin-top: 1.25rem;\">Contact Info: \
              <span style=\"font-weight: normal; font-size: medium;\">${ contactName } </span>\
              <span style=\"font-weight: bold; font-size: medium;\">Email address: </span> \
              <span style=\"font-weight: normal; font-size: medium;\">${ contactEmail }</span> \
              <span style=\"font-weight: bold; font-size: medium;\">Type: </span> \
              <span style=\"font-weight: normal; font-size: medium;\">${ contactType }</span> \              
            </div> \
            <div style=\"margin-top: .25rem; font-weight: bold; font-size: medium;\">Street: \
              <span style=\"font-weight: normal; font-size: medium;\">${ contactStreet }</span> \
            </div> \
            <div style=\"margin-top: .25rem; font-weight: bold; font-size: medium;\">City: \
              <span style=\"font-weight: normal; font-size: medium;\">${ contactCity } </span> \
              <span style=\"font-weight: bold; font-size: medium;\">State: </span>\
              <span style=\"font-weight: normal; font-size: medium;\">${ contactState }</span> \
              <span style=\"font-weight: bold; font-size: medium;\">Zip: </span>\
              <span style=\"font-weight: normal; font-size: medium;\">${ contactZipcode }</span> \
            </div> \
            <div style=\"margin-top: .25rem; font-weight: bold; font-size: medium;\">Phone: \
              <span style=\"font-weight: normal; font-size: medium;\">${ contactPhone }</span> \
            </div> \
            <div style=\"margin-top: .25rem; font-weight: bold; font-size: medium;\">Deceased:  \
              <span style=\"font-weight: normal; font-size: medium;\">${ getDeceasedStatus() }</span>
            </div>\ 
            <div style=\"margin-top: 1rem; font-weight: bold; font-size: medium;\">Contact info:</div>\ 
            <div style=\"margin-top: .25rem; font-size: medium;\">
              <span style=\"font-weight: normal; font-size: medium;\">${ contactInfo }</span> \
            </div> \
          `,
        }
      ]
    })
  mailjetReq
    .then(async (result) => {
      return {
        result: {
          message: "TigerHunt successfully emailed",
          code: 200
        }
      }
    })
    .catch(async (err) => {
      console.log('Error sending TigerHunt: ', err)
      return {
        result: {
          message: "TigerHunt email failed",
          code: 500
        }
      }
    })
}

module.exports = sendTigerHunt