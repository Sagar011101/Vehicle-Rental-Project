// Backend/routes/vehicleTypes.js
const express = require('express');
const router = express.Router();
const { getVehicleTypes } = require('../controllers/vehicleTypeController');

// GET /api/vehicle-types?wheels=2 or 4 (optional)
router.get('/', getVehicleTypes);

module.exports = router;