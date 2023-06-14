import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login"
import Home from "./pages/Home";
import Courses from "./components/Courses-section/Courses";
import AboutUs from "./components/About-us/AboutUs";

//General_Manager
import Dashboard from "./components/General_Manager/dashboard";
import Getbranches from "./components/General_Manager/Branches";
import RecoredBranchesManagers from "./components/General_Manager/RecoredBranchesManagers/RecoredBranchesManagers";

//Receptionist
import DashboardRecep from "./components/Receptionist/DashboardRecep";
import Cards from "./components/Receptionist/Cards/Card";
import GetRecordStudent from "./components/Receptionist/ManagementStudent/RecordStudent";
import Scanner from "./components/Receptionist/Scanner";



//Branch_Manger
import DashboardBrMgr from "./components/Branch_Manger/DashboardBrMgr";
import {GetClassRoom} from "./components/Branch_Manger/Codes/ClassRooms/index";
import GetRecordRecptions from "./components/Branch_Manger/ManagementRecptiones/RecoredRecpitions";


//Scientific_Affairs
import DashboardScientAff from "./components/Scientific_Affairs/DashboardScientAff" 
import {GetSubjects} from "./components/Scientific_Affairs/Management_Content/Subjects/index";
import {GetQuestionBank} from "./components/Scientific_Affairs/Management_Content/QuestionBank/index";


function App() {


  return (
    <Router>
     
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/Courses" element={<Courses />} />
        <Route path="/About" element={<AboutUs />} />

        {/* General_Manager */}
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Codes/Branch" element={<Getbranches />} />
        <Route path="/RecoredBranchesManagers" element={<RecoredBranchesManagers />} />


        <Route path="/Login" element={<Login />} />


        {/* Receptionist  */}
        <Route path="/dashboardRec" element={<DashboardRecep />} />
        <Route path ='/Cards/index' element={<Cards/>} />                 
        <Route path='/ManagementStudent/RecordStudent' element={<GetRecordStudent/>} />
        <Route path ='/Scanner' element={<Scanner/>} /> 


      

       {/* Branch_Manger */}
       <Route path="/dashboardBrcMgr" element={<DashboardBrMgr />} />
       <Route path="/Codes/ClassRoom" element={<GetClassRoom />} />
       <Route path="/ManagementRecptiones/RecoredRecpitions" element={<GetRecordRecptions />} />


       {/*Dashboard*/}
       <Route path="/dashboardScientAff" element={<DashboardScientAff />} />
       <Route path="/Subjects/index" element={<GetSubjects />} />
       <Route path="/QuestionBank/index" element={<GetQuestionBank />} />
       
      </Routes>
    </Router>
  );
}

export default App;