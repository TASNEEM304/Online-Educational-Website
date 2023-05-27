import React from "react";
import Home from "./pages/Home";
import Courses from "./components/Courses-section/Courses";
import AboutUs from "./components/About-us/AboutUs";
import Dashboard from "./components/General_Manager/dashboard";
import Getbranches from "./components/General_Manager/Branches";
import RecoredBranchesManagers from "./components/General_Manager/RecoredBranchesManagers/RecoredBranchesManagers";

import Header from "./components/Header/Header";


import DashboardRecep from "./components/Receptionist/DashboardRecep";
import Cards from "./components/Receptionist/Cards/Card";
import GetRecordStudent from "./components/Receptionist/ManagementStudent/RecordStudent";


import Scanner from "./components/Receptionist/Scanner";


import Login from "./components/Auth/Login"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

// proxy=http://your.proxy.server/:port


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



        <Route path="/dashboardRec" element={<DashboardRecep />} />

        <Route path ='/Cards/index' element={<Cards/>} /> 
                
       <Route path='/ManagementStudent/RecordStudent' element={<GetRecordStudent/>} />


       
       <Route path ='/Scanner' element={<Scanner/>} /> 
                    
      </Routes>
    </Router>
  );
}

export default App;