import React, { useEffect, useState } from "react";
import api from "./api";
import BookingForm from "./BookingForm";

function App() {
  const [vehicleTypes, setVehicleTypes] = useState([]);

  useEffect(() => {
    api
      .get("/vehicle-types")
      .then((res) => setVehicleTypes(res.data))
      .catch((err) => console.error("API Error:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      {/* Booking form */}
      <div className="w-full max-w-4xl">
        <BookingForm vehicleTypes={vehicleTypes} />
      </div>
    </div>
  );
}

export default App;
