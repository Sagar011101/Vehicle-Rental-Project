// Backend/controllers/bookingController.js
const { Booking, sequelize } = require('../models');
const { Op } = require('sequelize');

/**
 * POST /api/bookings
 * body: { firstName, lastName, vehicleId, startDate, endDate }
 */
async function createBooking(req, res) {
  const { firstName, lastName, vehicleId, startDate, endDate } = req.body;

  // Basic validation
  if (!firstName || !lastName || !vehicleId || !startDate || !endDate) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Validate dates
  const s = new Date(startDate);
  const e = new Date(endDate);
  if (isNaN(s) || isNaN(e)) {
    return res.status(400).json({ error: 'Invalid date format. Use YYYY-MM-DD' });
  }
  if (s > e) {
    return res.status(400).json({ error: 'startDate must be before or same as endDate' });
  }

  const t = await sequelize.transaction();
  try {
    // Overlap check: existing where (existing.startDate <= newEnd && existing.endDate >= newStart)
    const overlap = await Booking.findOne({
      where: {
        vehicleId,
        [Op.and]: [
          { startDate: { [Op.lte]: endDate } },
          { endDate: { [Op.gte]: startDate } }
        ]
      },
      transaction: t,
      lock: t.LOCK.UPDATE
    });

    if (overlap) {
      await t.rollback();
      return res.status(409).json({ error: 'Vehicle already booked for the selected dates' });
    }

    const booking = await Booking.create({ firstName, lastName, vehicleId, startDate, endDate }, { transaction: t });
    await t.commit();
    return res.status(201).json(booking);
  } catch (err) {
    await t.rollback();
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function getBookings(req, res) {
  try {
    const list = await Booking.findAll({ order: [['id', 'DESC']] });
    return res.json(list);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { createBooking, getBookings };
