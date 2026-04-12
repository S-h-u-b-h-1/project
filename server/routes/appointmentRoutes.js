const express = require('express');
const router = express.Router();
const { createAppointment } = require('../controllers/appointmentController');

router.route('/').post(createAppointment);

module.exports = router;
