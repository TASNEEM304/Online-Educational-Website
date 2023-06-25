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
import GetPaymentCard from "./components/Receptionist/PaymentCard";
import QRScanner from "./components/Receptionist/Cards/Scan";
import GetSubscribe from "./components/Receptionist/ManagementStudent/RecordStudent/Subscribe";
import GetPayment from "./components/Receptionist/ManagementStudent/RecordStudent/Payment";
import GetReceipt from "./components/Receptionist/ManagementStudent/RecordStudent/Receipt";


//Branch_Manger
import DashboardBrMgr from "./components/Branch_Manger/DashboardBrMgr";
//import GetClassRoom from "./components/Branch_Manger/Codes/ClassRooms/index";
import RecoredTranier from "./components/Branch_Manger/Trainer_Management/RecoredTranier";
import Course from "./components/Branch_Manger/Course/index";
import {GetClassRoom} from "./components/Branch_Manger/Codes/ClassRooms/index";
import GetRecordRecptions from "./components/Branch_Manger/ManagementRecptiones/RecoredRecpitions";
import GetRecordRecptionsdetails from "./components/Branch_Manger/ManagementRecptiones/RecoredRecpitions/details";
import GetTrainerdetails from "./components/Branch_Manger/Trainer_Management/details";
import GetQuestionner from "./components/Branch_Manger/ViewQuestionnaire/questionnaire";
import GetQuestionBankview from "./components/Branch_Manger/ViewQusationBank/all";


//Scientific_Affairs
import DashboardScientAff from "./components/Scientific_Affairs/DashboardScientAff" 
import GetSubjects from "./components/Scientific_Affairs/Management_Content/Subjects/index";
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
        <Route path ='/RecordStudent/Subscribe' element={<GetSubscribe/>} /> 
        <Route path ='/RecordStudent/Payment' element={<GetPayment/>} /> 
        <Route path ='/RecordStudent/Receipt' element={<GetReceipt/>} /> 
        <Route path ='/PaymentCard' element={<GetPaymentCard/>} /> 
        

       {/* Branch_Manger */}
       <Route path="/dashboardBrcMgr" element={<DashboardBrMgr />} />
       <Route path="/Codes/ClassRoom" element={<GetClassRoom />} />
       <Route path="/Trainer_Management/RecoredTranier" element={<RecoredTranier />} />
       <Route path="/ManagementRecptiones/RecoredRecpitions" element={<GetRecordRecptions />} />
       <Route path='/Trainer_Management/details' element={<GetTrainerdetails/>} />
       <Route path='/ManagementRecptiones/RecoredRecpitions/details' element={<GetRecordRecptionsdetails/>} />
       <Route path='/ViewQuestionnaire/questionnaire' element={<GetQuestionner/>} />
       <Route path='/Course/Add' element={<Course/>} />

       <Route path='/ViewQusationBank/all' element={<GetQuestionBankview/>} />
       
       {/*Dashboard*/}
       <Route path="/dashboardScientAff" element={<DashboardScientAff />} />
       <Route path="/Subjects/index" element={<GetSubjects />} />
       <Route path="/QuestionBank/index" element={<GetQuestionBank />} />
       
      </Routes>
    </Router>
  );
}

export default App;