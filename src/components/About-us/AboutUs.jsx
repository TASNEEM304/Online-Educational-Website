
import React ,{Fragment,useEffect,useState} from "react";
import "./about.css";
import { Container, Row, Col,Form, Button} from "reactstrap";

import aboutImg from "../../assests/images/about-us.png";
import CountUp from "react-countup";
import Header from "./../Header/Header";
import axios from 'axios'
import ReactModal from 'react-modal';
import * as AiIcons from "react-icons/ai";
import AuthUser from  '../Auth/AuthUser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const AboutUs = () => {


  const {http} = AuthUser();
  
  const [first ,setfirst] = useState("");
  const [full_name ,setfull_name] = useState("");
  const [poll_date, setpolldate] = useState('');
  const [phone_numb, setphone_numb] = useState("");
  const [branch_id,setBranchId] =useState();
  const [Branches,setbranches] = useState([]);
  const [Subjects,setsubjects] = useState([]);
  


  const store = () =>{
      
    http.post('poll/store',{full_name:full_name,poll_date:poll_date,phone_numb:phone_numb,first:first,branch_id:branch_id}).then((res)=>{
      const data=res.data;
     // alert("تمت العملية بنجاح ")
     toast.success("تمت العملية بنجاح");
     
    }).catch(function (error) {
      console.log(error);
      toast.error(error);
      });
   
      // setfull_name_ar('');
      // setfull_name_en('');
      // setmothername('');
      // setaddress();
      // setphone_numb();
      // setBranchId();
      // setnotice('');
      // setwhatsapp_numb();
      // setfirstsubj();
      // setsecoundsubj();
      // setthirdsubj();
      // setfirsttime();
      // setsecoundtime();
      // setthirdtime();
      
  }

  useEffect(()=>{
    GetSubjects()
    },[])
    
    const GetSubjects = async ()=>{
    http.get('branch_admin/subject/index').then((res)=>{
     setsubjects(res.data.data.data);
    });
    }
    useEffect(()=>{
      Getbranches()
      },[])
      
      const Getbranches = async ()=>{
      http.get('branch/index').then((res)=>{
       setbranches(res.data.data.data);
      });
      }

  return (
    <Fragment>
<Header />
<section>
      <Container>
    
        <Row>
          <Col lg="6" md="6">
            <div className="about__img">
              <img src={aboutImg} alt="" className="w-100" />
            </div>
          </Col>

          <Col lg="6" md="6">
            <div className="about__content">
              <h2>هل ترغب في الاشتراك بدوراتنا التدريبية
              <br/>
                <div className="about__conten">

                
                 <br/>  املأ الاستبيان من فضلك
                </div>
                </h2>
             
           
              
</div>
<br/>

<div lang="ar" className="row" dir="rtl">
     
                  
                  <div className="col-md-6">
                        <div className="form-group mt-2">
                                 <label>الاسم الثلاثي </label>
                                 <input type='text' 
                               className='form-control' 
                               
                               Value={full_name} 
                               onChange={(e)=>setfull_name(e.target.value)}
                               />
                        </div>   
                  </div>


                  <div className="col-md-6">
                        <div className="form-group mt-2">
                                 <label>رقم الهاتف  </label>
                                 <input type='number' 
                               className='form-control' 
                              
                               Value={phone_numb} 
                               onChange={(e)=>setphone_numb(e.target.value)}
                               />
                        </div>   
                  </div>
                  
                  
                  <div className="col-md-6">
                         <div className="form-group">
                                 <label> المادة  </label>
                                 
                                 <select  onChange={(e)=>setfirst(e.target.value)}>
                                                   <option value="">الرجاء اختيار الدورة</option>
                                                   {Subjects.map(option => (
                                                     <option key={option.id} value={option.id} >{option.subjectName}</option>
                                                   ))}
                                           </select>
                         </div>
                  </div>


<div className="col-6-md">
<label>last_name:</label>
                        <input type="date" className="form-control" placeholder="Enter birth_day"
                            onChange={e=>setpolldate(e.target.value)}
                        id="birth_day" />
</div>
                  
                  <div className="col-md-6">
                         <div className="form-group">
                                 <label> الفرع الذي يرغب الطالب بالحضور به  </label>
                                 
                                 <select  onChange={(e)=>setBranchId(e.target.value)}>
                                                   <option value="">الرجاء اختيار الفرع</option>
                                                   {Branches.map(option => (
                                                     <option key={option.id} value={option.id} >{option.name}</option>
                                                   ))}
                                           </select>

                         </div>
                  </div>





                  





            <br/>
</div>
<button type="button"  onClick={store} class="btn btn-primary">حفظ
<ToastContainer/>
</button>

          
             
          </Col>
        </Row>
      </Container>
    </section>
    </Fragment>
  );
};

export default AboutUs;
