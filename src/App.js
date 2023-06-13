import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
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
import GetRecordStudentdetails from "./components/Receptionist/ManagementStudent/RecordStudent/details"
import Scanner from "./components/Receptionist/Scanner";
import QRScanner from "./components/Receptionist/Cards/Scan";


//Branch_Manger
import DashboardBrMgr from "./components/Branch_Manger/DashboardBrMgr";
import GetClassRoom from "./components/Branch_Manger/Codes/ClassRooms/index";



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
        <Route path="/Register" element={<Register />} />


        {/* Receptionist  */}
        <Route path="/dashboardRec" element={<DashboardRecep />} />
        <Route path ='/Cards/index' element={<Cards/>} />                 
        <Route path='/ManagementStudent/RecordStudent' element={<GetRecordStudent/>} />
        <Route path='/ManagementStudent/RecordStudent/details' element={<GetRecordStudentdetails/>} />
        <Route path ='/Scanner' element={<Scanner/>} /> 
        <Route path ='/QRScanner' element={<QRScanner/>} /> 

      

       {/* Branch_Manger */}
       <Route path="/dashboardBrcMgr" element={<DashboardBrMgr />} />
       <Route path="/Codes/ClassRoom" element={<GetClassRoom />} />


       {/*Dashboard*/}
       <Route path="/dashboardScientAff" element={<DashboardScientAff />} />
       <Route path="/Subjects/index" element={<GetSubjects />} />
       <Route path="/QuestionBank/index" element={<GetQuestionBank />} />
       
      </Routes>
    </Router>
  );
}

export default App;