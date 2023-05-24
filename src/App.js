import React from "react";
import Home from "./pages/Home";
import Courses from "./components/Courses-section/Courses";
import AboutUs from "./components/About-us/AboutUs";
import Dashboard from "./components/General_Manager/dashboard";
import Getbranches from "./components/General_Manager/Branches";
import RecoredBranchesManagers from "./components/General_Manager/RecoredBranchesManagers/RecoredBranchesManagers";

import Header from "./components/Header/Header";


import Login from "./components/Auth/Login"
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

        <Route path="/RecoredBranchesManagers" element={<RecoredBranchesManagers />} />


        <Route path="/Login" element={<Login />} />

      </Routes>
    </Router>
  );
}

export default App;