// Backend/controllers/vehicleTypeController.js
const { VehicleType } = require('../models');

async function getVehicleTypes(req, res) {
  try {
    const wheels = req.query.wheels ? parseInt(req.query.wheels, 10) : undefined;
    const where = {};
    if (!isNaN(wheels)) where.wheels = wheels;
    const types = await VehicleType.findAll({ where, order: [['id', 'ASC']] });
    return res.json(types);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { getVehicleTypes };