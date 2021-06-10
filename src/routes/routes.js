const express = require('express')
const { sendMail } = require('../controllers/sendMail')
const { wakeUp } = require('../controllers/wakeup')

const router = express.Router();

router.route('/sendmail')
    .post(sendMail)
router.route('/wakeup')
    .get(wakeUp)

module.exports = router