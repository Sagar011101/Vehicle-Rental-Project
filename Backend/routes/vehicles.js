// Backend/routes/vehicles.js
const express = require('express');
const router = express.Router();
const { getVehicles } = require('../controllers/vehicleController');

// GET /api/vehicles?typeId=1
router.get('/', getVehicles);

module.exports = router;
