import { sendMessage } from '../controllers/mailjet.js'
import { wakeUp } from '../controllers/wakeup.js'

export const chsRoutes = [
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
