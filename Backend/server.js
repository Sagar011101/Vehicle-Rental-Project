const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/vehicle-types", require("./routes/vehicleTypes"));
app.use("/api/vehicles", require("./routes/vehicles"));
app.use("/api/bookings", require("./routes/bookings"));

app.get("/", (req, res) => {
  res.send("🚗 Vehicle Rental API is running...");
});

sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
});