import React from "react";
import Home from "./pages/Home";
import Courses from "./components/Courses-section/Courses";
import AboutUs from "./components/About-us/AboutUs";
import Dashboard from "./components/General_Manager/dashboard";
import Getbranches from "./components/General_Manager/Branches";
import Header from "./components/Header/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
     
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/Courses" element={<Courses />} />
        <Route path="/About" element={<AboutUs />} />
        <Route path="/Codes/Branch" element={<Getbranches />} />
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;