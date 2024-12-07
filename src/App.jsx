
// import './App.css'
// import ConductorForm from './components/ConductorForm'
// import { useEffect } from "react";
// import io from "socket.io-client";
// import LocationFetcher from "./components/LocationFetcher";
// import BusMap from "./components/BusMap";
// import ConductorLocationTracker from './components/ConductorLocationTracker';
// import ConductorLogin from './components/ConductorLogin.jsx';
// import { Routes, Route } from "react-router-dom";

// function App() {


//   return (
//     // <div>
//     //   <Routes>
//     //     <Route path="map" element={<BusMap></BusMap>} />
//     //   </Routes>
//     //   <ConductorForm />
//     //   <BusMap></BusMap>
     
//     //   <ConductorLocationTracker />
//     //   <ConductorLogin />
//     // </div>
//     <div></div>
//   );

// }

// export default App

// import React, { useEffect, useState } from "react";
// import { io } from "socket.io-client";

// const socket = io("http://localhost:3000");

// function App() {
//   const [buses, setBuses] = useState({});

//   useEffect(() => {
//     socket.on("busLocations", (data) => {
//       setBuses(data);
//     });
//   }, []);

//   return (
//     <div>
//       <h1>Bus Tracker</h1>
//       <ul>
//         {Object.entries(buses).map(([busId, location]) => (
//           <li key={busId}>
//             Bus {busId}: Latitude: {location.lat}, Longitude: {location.lng}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;

import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

function App() {
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [busId, setBusId] = useState("BUS-1"); // Example bus ID

  // Get GPS location from the phone
  const sendLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setLocation(newLocation);

          // Send the updated location to the server
          socket.emit("updateLocation", { busId, location: newLocation });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    // Update the location every 5 seconds
    const interval = setInterval(sendLocation, 5000);
     socket.emit("registerBus", busId);
    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, [busId]);

  return (
    <div>
      <h1>Bus Tracker</h1>
      <p>
        Tracking Bus: <strong>{busId}</strong>
      </p>
      <p>
        Current Location: Latitude: {location.lat}, Longitude: {location.lng}
      </p>
      <button onClick={sendLocation}>Send Location Now</button>
    </div>
  );
}

export default App;
