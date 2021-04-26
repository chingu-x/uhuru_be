const nodemailjet = require("node-mailjet")

const sendTigerHunt = (_, __, context) => {
  const { fromEmail, fromName, classmateName, classmateEmail, 
    classmateStreet, classmateCity, classmateState, classmateZipcode,
    classmatePhone, isClassmateDeceased, classmateInfo } = __
  const mailjet = nodemailjet
    .connect(process.env.MAILJET_API_KEY, process.env.MAILJET_SECRET_KEY)

  console.log(`\nMessage Received from ${ fromName } email: ${ fromEmail }`)
  console.log(`Classmate: ${ classmateName } email: ${ classmateEmail }`)
  console.log(`Street: ${ classmateStreet }`)
  console.log(`City: ${ classmateCity } State: ${ classmateState } Zip: ${ classmateZipcode }`)
  console.log(`Phone: ${ classmatePhone } Deceased: ${ isClassmateDeceased }`)
  console.log(`Message body: ${ classmateInfo }`)

  const getDeceasedStatus = () => {
    return isClassmateDeceased ? "Yes": "No"
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
            Classmate name: ${ classmateName } Email: ${ classmateEmail }\r\n \
            Street: ${ classmateStreet }\r\n \
            City: ${ classmateCity } State: ${ classmateState } Zip: ${ classmateZipcode }\r\n \
            Phone: ${ classmatePhone }
            Deceased: ${ getDeceasedStatus() }\r\n \
            Message from classmate:\r\n ${ classmateInfo }
          `,
          "HTMLPart": ` \
            <div style=\"font-weight: bold; font-size: medium;\">Email from: \
              <span style=\"font-weight: normal; font-size: medium;\">${ fromName } </span>\
              <span style=\"font-weight: bold; font-size: medium;\">Email address: </span> \
              <span style=\"font-weight: normal; font-size: medium;\">${ fromEmail }</span> \
            </div> \
            <div style=\"font-weight: bold; font-size: medium;\">Classmate Info: \
              <span style=\"font-weight: normal; font-size: medium;\">${ classmateName } </span>\
              <span style=\"font-weight: bold; font-size: medium;\">Email address: </span> \
              <span style=\"font-weight: normal; font-size: medium;\">${ classmateEmail }</span> \
            </div> \
            <div style=\"margin-top: .25rem; font-weight: bold; font-size: medium;\">Street: \
              <span style=\"font-weight: normal; font-size: medium;\">${ classmateStreet }</span> \
            </div> \
            <div style=\"margin-top: .25rem; font-weight: bold; font-size: medium;\">City: \
              <span style=\"font-weight: normal; font-size: medium;\">${ classmateCity } </span> \
              <span style=\"font-weight: bold; font-size: medium;\">State: </span>\
              <span style=\"font-weight: normal; font-size: medium;\">${ classmateState }</span> \
              <span style=\"font-weight: bold; font-size: medium;\">Zip: </span>\
              <span style=\"font-weight: normal; font-size: medium;\">${ classmateZipcode }</span> \
            </div> \
            <div style=\"margin-top: .25rem; font-weight: bold; font-size: medium;\">Phone: \
              <span style=\"font-weight: normal; font-size: medium;\">${ classmatePhone }</span> \
            </div> \
            <div style=\"margin-top: .25rem; font-weight: bold; font-size: medium;\">Deceased:  \
              <span style=\"font-weight: normal; font-size: medium;\">${ getDeceasedStatus() }</span>
            </div>\ 
            <div style=\"margin-top: 1rem; font-weight: bold; font-size: medium;\">Classmate info:</div>\ 
            <div style=\"margin-top: .25rem; font-size: medium;\">
              <span style=\"font-weight: normal; font-size: medium;\">${ classmateInfo }</span> \
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