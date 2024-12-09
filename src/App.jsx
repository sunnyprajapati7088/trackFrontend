
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

// // export default App

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

// import React, { useEffect, useState } from "react";
// import { io } from "socket.io-client";

// const socket = io("http://localhost:3000");

// function App() {
//   const [location, setLocation] = useState({ lat: 0, lng: 0 });
//   const [busId, setBusId] = useState("BUS-1"); // Example bus ID

//   // Get GPS location from the phone
//   const sendLocation = () => {
//     if ("geolocation" in navigator) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const newLocation = {
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//           };
//           setLocation(newLocation);

//           // Send the updated location to the server
//           socket.emit("updateLocation", { busId, location: newLocation });
//         },
//         (error) => {
//           console.error("Error getting location:", error);
//         }
//       );
//     } else {
//       console.error("Geolocation is not supported by this browser.");
//     }
//   };

//   useEffect(() => {
//     // Update the location every 5 seconds
//     const interval = setInterval(sendLocation, 5000);
//      socket.emit("registerBus", busId);
//     // Clean up the interval when the component unmounts
//     return () => clearInterval(interval);
//   }, [busId]);

//   return (
//     <div>
//       <h1>Bus Tracker</h1>
//       <p>
//         Tracking Bus: <strong>{busId}</strong>
//       </p>
//       <p>
//         Current Location: Latitude: {location.lat}, Longitude: {location.lng}
//       </p>
//       <button onClick={sendLocation}>Send Location Now</button>
//     </div>
//   );
// }

// export default App;


// import React, { useState, useEffect } from "react";
// import { io } from "socket.io-client";

// const socket = io("https://trackbackend-ntrj.onrender.com"); // Connect to backend

// function App() {
//   const [busId, setBusId] = useState("");
//   const [buses, setBuses] = useState({});

//   // Register the bus after entering the bus ID
//   const registerBus = () => {
//     if (busId) {
//       socket.emit("registerBus", busId);
//       console.log(`Bus ${busId} registered.`);
//     }
//   };

//   // Send current location using GPS
//   const sendLocation = () => {
//     if (!busId) {
//       alert("Please enter a Bus ID first!");
//       return;
//     }
//     if ("geolocation" in navigator) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const location = {
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//           };
//           socket.emit("updateLocation", { busId, location });
//           console.log(`Location sent for Bus ${busId}:`, location);
//         },
//         (error) => console.error("Error getting location:", error)
//       );
//     } else {
//       alert("Geolocation not supported!");
//     }
//   };

//   // Listen for updates from the server
//   useEffect(() => {
//      const interval = setInterval(sendLocation, 5000);
//     socket.on("busLocations", (data) => {
//       setBuses(data);
//     });

//     // Clean up the listener on unmount
//     return () => socket.off("busLocations");
//   }, []);

//   return (
//     <div>
//       <h1>Bus Tracker</h1>

//       {/* Bus Registration */}
//       <label>Enter Bus ID: </label>
//       <input
//         type="text"
//         value={busId}
//         onChange={(e) => setBusId(e.target.value.toUpperCase())}
//       />
//       <button onClick={registerBus}>Register Bus</button>
//       <button onClick={sendLocation}>Send Current Location</button>

//       <h2>Active Buses:</h2>
//       <ul>
//         {Object.entries(buses).map(([id, location]) => (
//           <li key={id}>
//             <strong>Bus {id}</strong> - Latitude: {location.lat}, Longitude:{" "}
//             {location.lng}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;

// import React, { useState, useEffect } from "react";
// import { io } from "socket.io-client";

// // Connect to backend
// const socket = io("http://localhost:3000");

// function App() {
//   const [busId, setBusId] = useState("");
//   const [buses, setBuses] = useState({});
//   const [watchId, setWatchId] = useState(null);

//   // Register the bus after entering the bus ID
//   const registerBus = () => {
//     if (busId.trim()) {
//       socket.emit("registerBus", busId);
//       console.log(`Bus ${busId} registered.`);
//       startTracking(); // Start location tracking
//     } else {
//       alert("Please enter a valid Bus ID!");
//     }
//   };

//   // Start real-time location tracking
//   const startTracking = () => {
//     if (!busId.trim()) {
//       console.error("Bus ID is not set. Tracking not started.");
//       return;
//     }

//     if ("geolocation" in navigator) {
//       const id = navigator.geolocation.watchPosition(
//         (position) => {
//           const location = {
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//           };
//           socket.emit("updateLocation", { busId, location });
//           console.log(`Location sent for Bus ${busId}:`, location);
//         },
//         (error) => console.error("Error getting location:", error),
//         {
//           enableHighAccuracy: true, // Use GPS for better accuracy
//           maximumAge: 0, // No caching of old positions
//           timeout: 1000, // Wait 10 seconds max for location
//         }
//       );
//       setWatchId(id); // Save watch ID for stopping tracking later
//     } else {
//       console.error("Geolocation not supported!");
//     }
//   };

//   // Stop tracking when component unmounts
//   useEffect(() => {
//     socket.on("busLocations", (data) => {
//       setBuses(data);
//     });

//     // Clean up when component unmounts
//     return () => {
//       socket.off("busLocations");
//       if (watchId) {
//         navigator.geolocation.clearWatch(watchId); // Stop tracking
//       }
//     };
//   }, [busId, watchId]);

//   return (
//     <div>
//       <h1>Bus Tracker</h1>

//       <label>Enter Bus ID: </label>
//       <input
//         type="text"
//         value={busId}
//         onChange={(e) => setBusId(e.target.value.toUpperCase())}
//       />
//       <button onClick={registerBus}>Register Bus</button>

//       <h2>Active Buses:</h2>
//       <ul>
//         {Object.entries(buses).map(([id, location]) => (
//           <li key={id}>
//             <strong>Bus {id}</strong> - Latitude: {location.lat}, Longitude:{" "}
//             {location.lng}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

// Connect to backend (use your deployed backend URL)
const socket = io("https://trackbackend-ntrj.onrender.com");


function App() {
  const [busId, setBusId] = useState("");
  const [buses, setBuses] = useState({});
  const [watchId, setWatchId] = useState(null);

  // Register the bus and start location tracking
  const registerBus = () => {
    if (busId.trim()) {
      socket.emit("registerBus", busId);
      console.log(`Bus ${busId} registered.`);
      startTracking(); // Start tracking when registered
    } else {
      alert("Please enter a valid Bus ID!");
    }
  };

  // Start real-time location tracking
  const startTracking = () => {
    if (!busId.trim()) {
      console.error("Bus ID is not set. Tracking not started.");
      return;
    }

    if ("geolocation" in navigator) {
      const id = navigator.geolocation.watchPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          socket.emit("updateLocation", { busId, location });
          console.log(`Location sent for Bus ${busId}:`, location);
        },
        (error) => console.error("Error getting location:", error),
        {
          enableHighAccuracy: false, // Use GPS for better accuracy
          maximumAge: 0, // Prevent caching
          timeout: 5000, // Wait max 10 seconds
        }
      );
      setWatchId(id); // Save watch ID
    } else {
      console.error("Geolocation not supported!");
    }
  };

  // Listen for location updates from the server
  useEffect(() => {
    socket.on("busLocations", (data) => {
      console.log("Received bus locations:", data);
      setBuses(data); // Update frontend
    });

    // Cleanup on unmount
    return () => {
      socket.off("busLocations");
      if (watchId) navigator.geolocation.clearWatch(watchId); // Stop tracking
    };
  }, [watchId]);

  return (
    <div>
      <h1>Bus Tracker</h1>
      <label>Enter Bus ID: </label>
      <input
        type="text"
        value={busId}
        onChange={(e) => setBusId(e.target.value.toUpperCase())}
      />
      <button onClick={registerBus}>Register Bus</button>

      <h2>Active Buses:</h2>
      <ul>
        {Object.entries(buses).map(([id, location]) => (
          <li key={id}>
            <strong>Bus {id}</strong> - Latitude: {location.lat}, Longitude:{" "}
            {location.lng}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
