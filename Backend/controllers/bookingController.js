const { Booking, Sequelize } = require("../models");
const Op = Sequelize.Op;

exports.createBooking = async (req, res) => {
  try {
    const { firstName, lastName, vehicleId, startDate, endDate } = req.body;

    if (!firstName || !lastName || !vehicleId || !startDate || !endDate) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Overlap check
    const overlap = await Booking.findOne({
      where: {
        vehicleId,
        [Op.or]: [
          { startDate: { [Op.between]: [startDate, endDate] } },
          { endDate: { [Op.between]: [startDate, endDate] } },
          { startDate: { [Op.lte]: startDate }, endDate: { [Op.gte]: endDate } }
        ]
      }
    });

    if (overlap) {
      return res.status(409).json({ error: "This vehicle is already booked for the selected dates." });
    }

    const booking = await Booking.create({
      firstName,
      lastName,
      vehicleId,
      startDate,
      endDate,
    });

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};