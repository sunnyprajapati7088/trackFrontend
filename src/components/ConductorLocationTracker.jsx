import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://localhost:5000"; // Your backend endpoint

const ConductorLocationTracker = () => {
    const [location, setLocation] = useState({
        latitude: null,
        longitude: null,
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT); // Connect to the backend with Socket.IO

        // Function to handle success in getting location
        const successCallback = (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({
                latitude,
                longitude,
            });

            // Emit the location to the server using Socket.IO
            socket.emit("conductorLocationUpdated", { latitude, longitude });
        };

        // Function to handle error in getting location
        const errorCallback = (error) => {
            console.error("Error in getting location", error);
            setError("Error fetching location");
        };

        // Start watching the conductor's location continuously
        const watchId = navigator.geolocation.watchPosition(
            successCallback,
            errorCallback,
            {
                enableHighAccuracy: true, // Use GPS if available
                maximumAge: 0,            // Do not use a cached position
                timeout: 5000,            // Timeout after 5 seconds
            }
        );

        // Clean up the watchPosition listener when the component unmounts
        return () => {
            navigator.geolocation.clearWatch(watchId);
            socket.disconnect(); // Disconnect socket when the component unmounts
        };
    }, []);

    return (
        <div>
            <h2>Conductor Location Tracker</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {location.latitude && location.longitude ? (
                <p>
                    Latitude: {location.latitude}, Longitude: {location.longitude}
                </p>
            ) : (
                <p>Fetching location...</p>
            )}
        </div>
    );
};

export default ConductorLocationTracker;
    