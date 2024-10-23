import React, { useState } from "react";
import axios from "axios";

const ConductorForm = () => {
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [drivingLicense, setDrivingLicense] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [busNumber, setBusNumber] = useState("");
  const [route, setRoute] = useState("");

  const handleCreateConductor = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:5000/api/conductor/create",
      {
        name,
        mobileNumber,
        drivingLicense,
        email,
        password,
        state,
        district,
        busNumber,
        route,
      }
    );
    // Handle response
  };

  return (
    <form onSubmit={handleCreateConductor}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Mobile Number"
        value={mobileNumber}
        onChange={(e) => setMobileNumber(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Driving License"
        value={drivingLicense}
        onChange={(e) => setDrivingLicense(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="State"
        value={state}
        onChange={(e) => setState(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="District"
        value={district}
        onChange={(e) => setDistrict(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Bus Number"
        value={busNumber}
        onChange={(e) => setBusNumber(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Route"
        value={route}
        onChange={(e) => setRoute(e.target.value)}
        required
      />
      <button type="submit">Create Conductor</button>
    </form>
  );
};

export default ConductorForm;
