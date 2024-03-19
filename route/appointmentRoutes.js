const express = require('express');
const appointmentController = require('../controllers/appointmentController');

const router = express.Router();

router.post('/', appointmentController.createAppointment);
router.get('/', appointmentController.getAllAppointments);
router.delete('/:id', appointmentController.deleteAppointment);

module.exports = router;