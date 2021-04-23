const express = require('express');
const { wakeUp } = require('../controllers/wakeup');

const router = express.Router();

router.route('/wakeup')
    .get(wakeUp)

module.exports = router