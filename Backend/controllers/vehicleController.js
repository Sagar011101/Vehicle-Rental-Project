// Backend/controllers/vehicleController.js
const { Vehicle } = require('../models');

async function getVehicles(req, res) {
  try {
    const typeId = req.query.typeId;
    if (!typeId) return res.status(400).json({ error: 'typeId query parameter is required' });

    const vehicles = await Vehicle.findAll({
      where: { typeId },
      order: [['id', 'ASC']]
    });

    return res.json(vehicles);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { getVehicles };
