// Backend/routes/bookings.js
const express = require('express');
const router = express.Router();
const { createBooking, getBookings } = require('../controllers/bookingController');

router.post('/', createBooking);
router.get('/', getBookings); // optional for testing purposes

module.exports = router;
