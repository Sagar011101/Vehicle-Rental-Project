// backend/server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const { sequelize } = require("./models");

const app = express();

// Explicit CORS configuration for frontend on port 3000
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(express.json());

// routes
app.use("/api/vehicle-types", require("./routes/vehicleTypes"));
app.use("/api/vehicles", require("./routes/vehicles"));
app.use("/api/bookings", require("./routes/bookings"));

app.get("/", (req, res) => res.send("Vehicle Rental API running"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`✅ Server listening on port ${PORT}`);
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected");
  } catch (err) {
    console.error("❌ DB connection error:", err);
      }
});