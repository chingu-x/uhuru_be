const { sendMessage } = require('../controllers/mailjet.js')
const { wakeUp } = require('../controllers/wakeup.js')

const chsRoutes = [
    {
        method: 'GET',
        url: '/wakeup',
        handler: wakeUp
    },
    {
        method: 'POST',
        url: '/message',
        handler: sendMessage
    },
]

module.exports = chsRoutes