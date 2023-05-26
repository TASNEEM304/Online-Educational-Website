import React,{ useState,useEffect,Fragment } from "react";
import {useNavigate,Link,useHistory}  from 'react-router-dom';

import { Container, Row, Col,Table,Button ,Form} from "reactstrap";

import HeaderRecep from "../../HeaderRecep" ;


import AuthUser from  '../../../Auth/AuthUser';
import axios from 'axios';
//import Popup from 'reactjs-popup';
//import 'reactjs-popup/dist/index.css';
import ReactModal from 'react-modal';
import * as AiIcons from "react-icons/ai";
// import {MDBTable,MDBTableBody,MDBTableHead,
//   MDBRow,MDBCol,MDBContainer,MDBBtn,MDBBtnGroup,
//   MDBPagination,MDBPaginationItem,MDBPaginationLink} from "mdb-react-ui-kit"



export default function GetRecordStudent() {
    
    const {http} = AuthUser();
    const [first_name,setFirstName] = useState();
    const [last_name,setLastName] = useState();
    const [roll_number,setRoll] =useState();
    const [birth_day,setBirthDay] =useState();
    const [branch_id,setBranchId] =useState();
    const [phone_number,setPhone] =useState();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [student,setStudent] = useState([]);

    const [Branches,setbranches] = useState([]);
      useEffect(()=>{
        GetBranchesEmployee()
        
      },[])
      const GetBranchesEmployee = async ()=>{
         http.get('http://localhost:8000/api/branch/index').then((res)=>{
          setStudent(res.data.data);
       });
      }

      useEffect(()=>{
        Getbranches()
      },[])

      const Getbranches = async ()=>{
          http.get('http://localhost:8000/api/branch/index').then((res)=>{
           setbranches(res.data.data);
        });
      }


      const history = useNavigate();
    const submitForm = () =>{
      debugger

      
        http.post('register',{roll_number:roll_number,first_name:first_name,last_name:last_name,birth_day:birth_day,branch_id:branch_id,phone_number:phone_number,email:email,password:password}).then((res)=>{
          const data=res.data;
          console.log(data);
       //  history.push('/Cards/index', data);

          history('/Cards/index' , { state : { data } });

          // <Link to={{ pathname: '/Cards/index', state:  data  }}>
          // </Link>

        console.log(res);
        }).catch(function (error) {
          console.log(error);
          });
       
    }
    const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const Delete= async (id) =>{
  
    http.post(`http://localhost:8000/api/branch/destroy/${id}`).then((res)=>{
       alert(res.data.message);
    })
   
 }
    return(


<Fragment>
<HeaderRecep />
<section>
      <Container>

   
      
   <Row>
     <Col lg="12" md="6" lang="ar" style={{marginTop:"10px" ,   textAlign: 'right'}}>

      
      <Button variant="success" onClick={openModal} style={{fontSize: "10px", 
                         width: "15%",height:"25%"
                         }}>أضف طالب جديد
                        
                         </Button>
                         
                         <br/>
      <Table striped bordered hover  style={{fontSize: "16px", 
                         width: "100%"
                         }}>
        <thead style={{background:"#ece24c",
        }}>
          <tr >
            <th ></th>
            <th >الاسم</th>
            <th>الرقم</th>
          </tr>
        </thead>
        <tbody>
          {/* {data.length === 0 ? (
            <tr>
              <td colSpan={3} className="text-center">
                No Data
              </td>
            </tr>
          ) : (
            data.map((data) => (
              <tr key={data.id}>
                <td style={{width:"20%"}}>
                             
                  <Button variant="danger" onClick={() => Delete(data.id)}>حذف</Button>
                 </td>
                <td style={{width:"50%"}}>{data.name}</td>
                <td style={{width:"30%"}}>{data.No}</td>
              </tr>
            ))
          )} */}
        </tbody>
      </Table>

      
     </Col>

     
   </Row>

   <ReactModal isOpen={modalIsOpen} onRequestClose={closeModal} style={{
          content: {
            width: '70%',
            height : '70%',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
            
          }}}>
      <AiIcons.AiOutlineClose onClick={closeModal} style={{  width: '5%' , height : '5%' }} />
        <div lang="ar" style={{marginTop:"10px" ,   textAlign: 'right'}}>
        
            
                    <div className="row">
                        <div className="col-md-6">
                              <div className="form-group mt-2">
                                       <label>:الاسم الأول</label>
                                       <input type="text" className="form-control" placeholder="Enter first_name"
                                           onChange={e=>setFirstName(e.target.value)}
                                       id="first_name" />
                              </div>   
                        </div>
                        <div className="col-md-6">
                               <div className="form-group mt-2">
                                       <label>:الاسم الثاني</label>
                                       <input type="text" className="form-control" placeholder="Enter last_name"
                                           onChange={e=>setLastName(e.target.value)}
                                       id="last_name" />
                               </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                                <div className="form-group mt-2">
                                       <label>:تاريخ الولادة</label>
                                       <input type="date" className="form-control" placeholder="Enter birth_day"
                                           onChange={e=>setBirthDay(e.target.value)}
                                       id="birth_day" />
                                </div>  
                        </div>
                        <div className="col-md-6">
                                
                                <div className="form-group mt-2">
                                       <label>:رقم الهاتف</label>
                                       <input type="number" className="form-control" placeholder="Enter phone_number"
                                           onChange={e=>setPhone(e.target.value)}
                                       id="phone_number" />
                                </div>
                        </div>

                       
                        
                    </div>

                    <div className="row">
                       
                        <div className="col-md-6">
                                <div className="form-group mt-2">
                                       <label>:الإيميل</label>
                                       <input type="email" className="form-control" placeholder="Enter email"
                                           onChange={e=>setEmail(e.target.value)}
                                       id="email" />
                                </div>
                        </div>
                        <div className="col-md-6">
                                <div className="form-group mt-2">
                                       <label>:كلمة المرور</label>
                                       <input type="password" className="form-control" placeholder="Enter password"
                                           onChange={e => setPassword(e.target.value)}
                                       id="pwd" />
                                </div>
                        </div>
                    </div>

                    <div className="row">

                    <div className="col-md-6">
                                <div className="form-group mt-2">
                                        <label>:دوره</label>
                                        <input type="number" className="form-control" placeholder="Enter roll_number"
                                            onChange={e=>setRoll(e.target.value)}
                                       id="roll_number" />
                                </div>
                        </div>
                        <div className="col-md-6">
                                <div className="form-group mt-4">
                                </div>
                                <div className="form-group mt-4">
                                        
                                        <select  onChange={(e)=>setBranchId(e.target.value)}>
                                                   <option value="">--Please select an option--</option>
                                                   {Branches.map(option => (
                                                     <option key={option.id} value={option.id} >{option.name}</option>
                                                   ))}
                                           </select>
                                           <label>:الفرع</label>
                                </div>
                        </div>
                    
                    </div>
                    
                    <button type="button" onClick={submitForm} className="btn btn-primary mt-4">حفظ</button>
              
           
        </div>
      </ReactModal> 


    <div>
{/*           
        <ReactModal isOpen={modalIsOpen} onRequestClose={closeModal} style={{
        content: {
          width: '70%',
          height : '60%',
          position: 'absolute',
          top: '50%',
          left: '40%',
          transform: 'translate(-50%, -50%)'
          
        }}}>
    <AiIcons.AiOutlineClose onClick={closeModal} style={{  width: '5%' , height : '5%' }} />
      <div lang="ar" style={{marginTop:"100px" ,   textAlign: 'right'}}>
      
          
                    <div className="row">
                        <div className="col-md-6">
                              <div className="form-group">
                                       <label>first_name:</label>
                                       <input type="text" className="form-control" placeholder="Enter first_name"
                                           onChange={e=>setFirstName(e.target.value)}
                                       id="first_name" />
                              </div>   
                        </div>
                        <div className="col-md-6">
                               <div className="form-group mt-2">
                                       <label>last_name:</label>
                                       <input type="text" className="form-control" placeholder="Enter last_name"
                                           onChange={e=>setLastName(e.target.value)}
                                       id="last_name" />
                               </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                                <div className="form-group mt-2">
                                       <label>birth_day:</label>
                                       <input type="date" className="form-control" placeholder="Enter birth_day"
                                           onChange={e=>setBirthDay(e.target.value)}
                                       id="birth_day" />
                                </div>  
                        </div>
                        <div className="col-md-6">
                                
                                <div className="form-group mt-2">
                                       <label>Number:</label>
                                       <input type="number" className="form-control" placeholder="Enter phone_number"
                                           onChange={e=>setPhone(e.target.value)}
                                       id="phone_number" />
                                </div>
                        </div>

                       
                        
                    </div>

                    <div className="row">
                       
                        <div className="col-md-6">
                                <div className="form-group mt-2">
                                       <label>Email address:</label>
                                       <input type="email" className="form-control" placeholder="Enter email"
                                           onChange={e=>setEmail(e.target.value)}
                                       id="email" />
                                </div>
                        </div>
                        <div className="col-md-6">
                                <div className="form-group mt-2">
                                       <label>Password:</label>
                                       <input type="password" className="form-control" placeholder="Enter password"
                                           onChange={e => setPassword(e.target.value)}
                                       id="pwd" />
                                </div>
                        </div>
                    </div>

                    <div className="row">

                    <div className="col-md-6">
                                <div className="form-group mt-2">
                                        <label>roll_number:</label>
                                        <input type="number" className="form-control" placeholder="Enter roll_number"
                                            onChange={e=>setRoll(e.target.value)}
                                       id="roll_number" />
                                </div>
                        </div>
                        <div className="col-md-6">
                                <div className="form-group mt-2">
                                        <label>setBranchId:</label>
                                        <select  onChange={(e)=>setBranchId(e.target.value)}>
                                                   <option value="">--Please select an option--</option>
                                                   {Branches.map(option => (
                                                     <option key={option.id} value={option.id} >{option.name}</option>
                                                   ))}
                                           </select>
                                </div>
                        </div>
                    
                    </div>
                    
                    
                    

                    
                    <button type="button" onClick={submitForm} className="btn btn-primary mt-4">Register</button>
              
      </div>
    </ReactModal>  */}






       </div>
      </Container>
    </section>
    </Fragment>
    )
}






