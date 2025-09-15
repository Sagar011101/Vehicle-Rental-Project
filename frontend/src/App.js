import { useEffect, useState } from "react";
import api from "./api";

function App() {
  const [vehicleTypes, setVehicleTypes] = useState([]);

  useEffect(() => {
    api.get("/vehicle-types") // matches backend route
      .then((res) => {
        console.log("Vehicle Types:", res.data); // debug log
        setVehicleTypes(res.data);
      })
      .catch((err) => console.error("API Error:", err));
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Vehicle Rental App</h1>
      {vehicleTypes.length > 0 ? (
        <>
          <h2>Available Vehicle Types:</h2>
          <ul>
            {vehicleTypes.map((type) => (
              <li key={type.id}>
                {type.name} - {type.wheels} wheels
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>No vehicle types available.</p>
      )}
    </div>
  );
}

export default App;
