import React, { useState } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom'
const ConductorLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/conductor/login",
        {
          email,
          password,
        }
        );
        console.log(response.data)
      if (response.data.success) {
        // Save the token or redirect to another page
        localStorage.setItem("id", response.data.conductor.id); // Save token for future requests
        setMessage("Login successful! Redirecting...");
          // Redirect to the dashboard or any other page
       navigate("map")
          
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage("An error occurred while logging in.");
    }
  };

  return (
    <div>
      <h2>Conductor Login</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default ConductorLogin;
