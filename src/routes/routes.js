const express = require('express')
const { addRoleToUser } = require('../controllers/addRoleToUser')
const { messageManager } = require('../controllers/messageManager')
const { sendMail } = require('../controllers/sendMail')
const { wakeUp } = require('../controllers/wakeup')

const router = express.Router();

router.route('/addroletouser')
    .post(addRoleToUser)
router.route('/messagemanager')
    .post(messageManager)
router.route('/sendmail')
    .post(sendMail)
router.route('/wakeup')
    .get(wakeUp)

module.exports = router