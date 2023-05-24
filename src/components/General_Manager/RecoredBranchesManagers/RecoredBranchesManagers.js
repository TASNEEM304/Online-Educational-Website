import React,{ useState,useEffect } from "react"
import { useNavigate } from 'react-router-dom';
import AuthUser from  '../../Auth/AuthUser';
import ReactModal from 'react-modal';
import * as AiIcons from "react-icons/ai";
export default function RecoredBranchesManagers() {
    const navigate = useNavigate();
    const {http,setToken} = AuthUser();
    const [first_name,setFirstName] = useState();
    const [last_name,setLastName] = useState();
    const [roll_number,setRoll] =useState();
    const [birth_day,setBirthDay] =useState();
    const [branch_id,setBranchId] =useState();
    const [phone_number,setPhone] =useState();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [employee,setemployee] = useState([]);

    const [Branches,setbranches] = useState([]);
      useEffect(()=>{
        GetBranchesManager()
        
      },[])
      const GetBranchesManager = async ()=>{
         http.get('http://localhost:8000/api/branch/index').then((res)=>{
          setemployee(res.data.data);
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


    const submitForm = () =>{
        http.post('register',{roll_number:roll_number,first_name:first_name,last_name:last_name,birth_day:birth_day,branch_id:branch_id,phone_number:phone_number,email:email,password:password}).then((res)=>{
           
        }).catch(function (error) {

          });
       
    }
    const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

    return(


<div className="trans-content">

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
      
          
      <div className="col-md-8">
                <div className="card p-4">
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
      </div>
      </div>
    </ReactModal> 
 </div>
    )
}