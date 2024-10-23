import React, { useState } from "react";

const LocationFetcher = () => {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const [error, setError] = useState(null);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Success callback
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setError(null); // Clear any previous error
        },
        (error) => {
          // Error callback
          switch (error.code) {
            case error.PERMISSION_DENIED:
              setError("User denied the request for Geolocation.");
              break;
            case error.POSITION_UNAVAILABLE:
              setError("Location information is unavailable.");
              break;
            case error.TIMEOUT:
              setError("The request to get user location timed out.");
              break;
            case error.UNKNOWN_ERROR:
              setError("An unknown error occurred.");
              break;
            default:
              setError("An error occurred while fetching location.");
          }
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div>
      <h1>Get Your Location</h1>
      <button onClick={getLocation}>Allow Location Access</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {location.latitude && location.longitude && (
        <p>
          Latitude: {location.latitude}, Longitude: {location.longitude}
        </p>
      )}
    </div>
  );
};

export default LocationFetcher;
