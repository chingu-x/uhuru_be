const express = require('express')
const { messageManager } = require('../controllers/messageManager')
const { sendMail } = require('../controllers/sendMail')
const { wakeUp } = require('../controllers/wakeup')

const router = express.Router();

router.route('/messagemanager')
    .post(messageManager)
router.route('/sendmail')
    .post(sendMail)
router.route('/wakeup')
    .get(wakeUp)

module.exports = router