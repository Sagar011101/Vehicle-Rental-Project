const { Vehicle } = require("../models");

exports.getVehicles = async (req, res) => {
  try {
    const { typeId } = req.query;
    if (!typeId) {
      return res.status(400).json({ error: "typeId query parameter is required" });
    }
    const vehicles = await Vehicle.findAll({ where: { typeId } });
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};