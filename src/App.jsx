
import './App.css'
import ConductorForm from './components/ConductorForm'
import { useEffect } from "react";
import io from "socket.io-client";
import LocationFetcher from "./components/LocationFetcher";
import BusMap from "./components/BusMap";
import ConductorLocationTracker from './components/ConductorLocationTracker';
import ConductorLogin from './components/ConductorLogin.jsx';
import { Routes, Route } from "react-router-dom";

function App() {


  return (
    <div>
      <Routes>
        <Route path="map" element={ <BusMap ></BusMap> } />
      </Routes>
      <ConductorForm />
     
      <LocationFetcher/>
      <ConductorLocationTracker />
      <ConductorLogin/>
   </div>
  )
}

export default App
