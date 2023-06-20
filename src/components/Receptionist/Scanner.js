import React, { useState,useEffect,Fragment, useRef } from 'react';
import Webcam from 'react-webcam';
import QrReader from "react-web-qr-reader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HeaderRecep from "./HeaderRecep" ;

import QRCode from 'qrcode.react';

import AuthUser from  '../Auth/AuthUser';
const Scanner = () => {
  
  

  const delay = 500;

  const {http} = AuthUser();
  const previewStyle = {
    height: 240,
    width: 400,
    marginLeft: '10px' 
  };
  const [startScan, setStartScan] = useState(false);
  const [Course,setCourse] = useState([]);
 
  const [course_id,setCourse_Id] = useState();
  const [result, setResult] = useState("No result");

  const handleScan = (data) => {
    console.log(data);
    setResult(data.data)
  };

  const handleError = (err) => {
    console.error(err);
  };

  
//=============================
// GetCards
//=============================
useEffect(()=>{
  Getcourse()
},[])

const Getcourse = async ()=>{
http.get('receptionist/course/index').then((res)=>{
  

  setCourse(res.data.data);
});
}
// ${result === "" ? 'null' : result}

const scanAttend = async ()=>{
  debugger
  http.post(`receptionist/scan_attend/${result === "" ? 'null' : result}?course_id=${course_id}`).then((res)=>{
    toast.success(res.data.message)
  });
}
  return (

    
<Fragment>
<HeaderRecep />
 
    <div class="container">
 		<div class="main-body">
 			<div class="row">
 				<div class="col-lg-3">
 					
 				</div>
         <div class="col-lg-6">
          
 					<div class="card">
 						<div class="card-body">
              

             <select className="btn btn-primary mt-4" onChange={(e)=>setCourse_Id(e.target.value)} style={{ width: '200px', border: 'none' }}>
    <option value="">اختر كورس</option>
    {Course.map(option => (
        <option key={option.id} value={option.id}>{option.subjectName}</option>
    ))}
</select>

<button type="button" className="btn btn-primary mt-4" onClick={() => setStartScan(!startScan)} style={{ display: 'inline-block', marginLeft: '10px', backgroundColor: 'green', borderRadius: '8px', border: 'none' }}>
    {startScan ? "Stop Scan" : "Start Scan"}
</button>

<button type="button" className="btn btn-primary mt-4" onClick={() => scanAttend(!startScan)} style={{ display: 'inline-block', marginLeft: '10px', backgroundColor: 'red', borderRadius: '8px', border: 'none' }}>
    مسح
</button>


            
    {startScan && (
      
<div>
<QrReader
  delay={delay}
  facingMode={"user"}
  style={previewStyle}
  onError={handleError}
  onScan={handleScan}
/>
</div>
      
    )}
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    {result !== "" && <p>{result}</p>}
    

            </div>
 					
          </div>
 				</div>
 				<div class="col-lg-3">
 					
 				</div>
 			</div>
 		</div>
 </div> 

    <ToastContainer/>


{/* <div className="container-fluid">
    
<Col md="12" lang="ar" style={{padding:'10px'}} >

       
<div className="card" style={{   textAlign: 'right' ,height: '500px' ,fontSize: "10px",background: '#f8f9fa', marginTop:'15px'}}>
          <div className="card-header">
         
        

         </div>
         <div className="card-body"style={{ textAlign: 'center' ,fontSize: "16px", 
                    width: "100%",
                    height : "100%",
                    padding: "0"
                    }}>
              
              
         </div>
         <div className="card-footer text-muted">
             
         
                           </div>
       </div>
 

 
</Col>
</div> */}
  
</Fragment>


);



};

export default Scanner;



