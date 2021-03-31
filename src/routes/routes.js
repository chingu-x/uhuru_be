import { sendMessage } from '../controllers/mailjet.js'

export const chsRoutes = [
    {
        method: 'POST',
        url: '/message',
        handler: sendMessage
    },
]
