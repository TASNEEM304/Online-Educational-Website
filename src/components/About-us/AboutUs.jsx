
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
  
  const [full_name_ar ,setfull_name_ar] = useState("");
  const [full_name_en ,setfull_name_en] = useState("");
  const [mother_name ,setmothername] = useState("");
  const [address, setaddress] = useState("");
  const [first_subj, setfirstsubj] = useState("");
  const [secound_subj, setsecoundsubj] = useState("");
  const [third_subj, setthirdsubj] = useState("");
  const [first_time, setfirsttime] = useState("");
  const [secound_time, setsecoundtime] = useState("");
  const [third_time, setthirdtime] = useState("");
  const [poll_date, setpolldate] = useState("");
  const [phone_numb, setphone_numb] = useState("");
  const [whatsapp_numb, setwhatsapp_numb] = useState("");
  const [notice, setnotice] = useState("");
  const [branch_id,setBranchId] =useState();
    const [Branches,setbranches] = useState([]);
  const [data, setData] = useState([]);
 
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editedItem, setEditedItem] = useState({});
  const [Subjects,setsubjects] = useState([]);
  


  const store = () =>{
      
    http.post('poll/store',{full_name_ar:full_name_ar,full_name_en:full_name_en,mother_name:mother_name,address:address,first_subj:first_subj,secound_subj:secound_subj,third_subj:third_subj,first_time:first_time,secound_time:secound_time,third_time:third_time,poll_date:poll_date,phone_numb:phone_numb,notice:notice,whatsapp_numb:whatsapp_numb,branch_id:branch_id}).then((res)=>{
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
    http.get('subject/index').then((res)=>{
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

<div lang="ar" className="row">
     
                  
                  <div className="col-md-6">
                        <div className="form-group mt-2">
                                 <label>الاسم الثلاثي بالعربية</label>
                                 <input type='text' 
                               className='form-control' 
                               
                               Value={full_name_ar} 
                               onChange={(e)=>setfull_name_ar(e.target.value)}
                               />
                        </div>   
                  </div>

                  <div className="col-md-6">
                        <div className="form-group mt-2">
                                 <label>الاسم الثلاثي بلانكليزية</label>
                                 <input type='text' 
                               className='form-control' 
                              
                               Value={full_name_en} 
                               onChange={(e)=>setfull_name_en(e.target.value)}
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
                        <div className="form-group mt-2">
                                 <label>رقم الواتساب  </label>
                                 <input type='number' 
                               className='form-control' 
                              
                               Value={whatsapp_numb} 
                               onChange={(e)=>setwhatsapp_numb(e.target.value)}
                               />
                        </div>   
                  </div>
                  <div className="col-md-6">
                        <div className="form-group mt-2">
                                 <label>ملاحظات   </label>
                                 <input type='text' 
                               className='form-control' 
                              
                               Value={notice} 
                               onChange={(e)=>setnotice(e.target.value)}
                               />
                        </div>   
                  </div>
                  


                  





                  <div className="col-md-6">
                         <div className="form-group">
                                 <label>اسم الأم   </label>
                                 
                                 <input type='text' 
                               className='form-control' 
                              
                               Value={mother_name} 
                               onChange={(e)=>setmothername(e.target.value)}
                               />
                         </div>
                  </div>

                



                  <div className="col-md-6">
                         <div className="form-group">
                                 <label> المادة الأولى </label>
                                 
                                 <select  onChange={(e)=>setfirstsubj(e.target.value)}>
                                                   <option value="">الرجاء اختيار الدورة</option>
                                                   {Subjects.map(option => (
                                                     <option key={option.id} value={option.id} >{option.subjectName}</option>
                                                   ))}
                                           </select>
                         </div>
                  </div>

                  <div className="col-md-6">
                         <div className="form-group">
                                 <label>الوقت  المناسب للدورة الأولى      </label>
                                 
                                 <input type="time" className="form-control" 
                                         Value={first_time} 
                                         onChange={(e)=>setfirsttime(e.target.value)}
                                           id="StartDate"   />
                                
                         </div>
                  </div>










                  <div className="col-md-6">
                         <div className="form-group">
                                 <label> المادة الثانية </label>
                                 
                                 <select  onChange={(e)=>setsecoundsubj(e.target.value)}>
                                                   <option value="">الرجاء اختيار الدورة</option>
                                                   {Subjects.map(option => (
                                                     <option key={option.id} value={option.id} >{option.subjectName}</option>
                                                   ))}
                                           </select>
                         </div>
                  </div>




                  
                  <div className="col-md-6">
                         <div className="form-group">
                                 <label>الوقت  المناسب للدورة الثانية      </label>
                                 
                                 <input type="time" className="form-control" 
                                         Value={secound_time} 
                                         onChange={(e)=>setsecoundtime(e.target.value)}
                                           id="StartDate"   />
                                
                         </div>
                  </div>
                  <div className="col-md-6">
                         <div className="form-group">
                                 <label> المادة الثالثة </label>
                                 
                                 <select  onChange={(e)=>setthirdsubj(e.target.value)}>
                                                   <option value="">الرجاء اختيار الدورة</option>
                                                   {Subjects.map(option => (
                                                     <option key={option.id} value={option.id} >{option.subjectName}</option>
                                                   ))}
                                           </select>
                         </div>
                  </div>

                  <div className="col-md-6">
                         <div className="form-group">
                                 <label>الوقت  المناسب للدورة الثالثة      </label>
                                 
                                 <input type="time" className="form-control" 
                                         Value={third_time} 
                                         onChange={(e)=>setthirdtime(e.target.value)}
                                           id="StartDate"   />
                                
                         </div>
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

                  <div className="col-md-6">
                         <div className="form-group">
                                 <label>المحافظة    </label>
                                 
                                <input type='text' 
                                 className='form-control' 
                              
                                 Value={address} 
                                 onChange={(e)=>setaddress(e.target.value)}
                               
                                 />
                         </div>
                  </div>





                  






               
                  <div className="form-group">
                                 <label> تاريخ تعبئة الاستبيان      </label>
                                 
                                 <input type="date" className="form-control" 
                                         Value={poll_date} 
                                         onChange={(e)=>setpolldate(e.target.value)}
                                           id="StartDate"   />
                                
                         </div>
                  </div>
            <br/>
<div>
<button type="button"  onClick={store} class="btn btn-primary">حفظ
<ToastContainer/>
</button>
</div>
          
             
          </Col>
        </Row>
      </Container>
    </section>
    </Fragment>
  );
};

export default AboutUs;
