import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import io from "socket.io-client";

// Connect to your backend socket server
const socket = io("http://localhost:5000");

// Custom bus icon for the map
const busIcon = new L.Icon({
  iconUrl:
    "https://th.bing.com/th/id/OIP.VdhjGCETntesYQqqSrGbxQHaE8?rs=1&pid=ImgDetMain",
  iconSize: [35, 35],
});

const BusMap = () => {
  const [busLocations, setBusLocations] = useState({}); // Object to hold bus locations keyed by conductor ID

  useEffect(() => {
    // Request permission to access user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        console.log("jkjk", latitude, longitude);
        // Emit initial location to the server (you should have a conductor ID available)
        const value = localStorage.getItem("id");
        console.log(value)
        const conductorId = value; // Replace with actual conductor ID
        socket.emit("conductorLocation", { latitude, longitude, conductorId });
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }

    // Listen for location updates from the server
    socket.on("busLocationUpdated", (data) => {
      const { conductorId, latitude, longitude } = data;
      console.log(data)
      setBusLocations((prevLocations) => ({
        ...prevLocations,
        [conductorId]: [latitude, longitude],
      }));
    });

    // Clean up when the component unmounts
    return () => {
      socket.off("busLocationUpdated");
    };
  }, []);

  return (
    <MapContainer
      center={[28.7041, 77.1025]} // Default center location
      zoom={13}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {console.log(busLocations)}
      {Object.entries(busLocations).map(([conductorId, location]) => (
        <Marker key={conductorId} position={location} icon={busIcon}>
          <Popup>Bus of Conductor ID: {conductorId}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default BusMap;
