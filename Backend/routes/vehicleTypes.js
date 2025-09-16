const express = require("express");
const router = express.Router();
const { VehicleType } = require("../models");

router.get("/", async (req, res) => {
  try {
    const types = await VehicleType.findAll({ order: [["id", "ASC"]] });
    res.json(types);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;