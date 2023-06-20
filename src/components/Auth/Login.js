import { Fragment,useRef, useState } from "react"
import { BrowserRouter as Router, Routes, Route ,Link,useNavigate} from "react-router-dom";
import AuthUser from './AuthUser';
import { Container, Row, Col } from "reactstrap";
import Header from "../Header/Header";
import axios from 'axios'



export default function Login() {
   const {http,setToken} = AuthUser();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    
    const submitForm = () =>{
       
        http.post('/login',{email:email,password:password}).then((res)=>{
            setToken(res.data.user,res.data.authorisation.token);
           
            console.log(res);
            
        }).catch(function (error) {
            console.log(error);
          });
       
        
    }
    const menuRef = useRef();

    const menuToggle = () => menuRef.current.classList.toggle("active__menu");
  
    return(
        
        <Fragment>
        <header className="header">
          <Container>
            <div className="navigation d-flex align-items-center justify-content-between">
              <div className="logo">
                <h2 className=" d-flex align-items-center gap-1">
                  <i class="ri-pantone-line"></i> سوريين ايجابيين بالمطلق
                </h2>
              </div>
    
              <div className="nav d-flex align-items-center gap-5">
                <div className="nav__menu" ref={menuRef} onClick={menuToggle}>
                  <ul className="nav__list">
                  
                      <li className="nav__item">
                        
                              <Link to= '/' > الصفحة الرئيسية </Link>
                       
                      </li>
                      
    
                      
                  </ul>
                </div>
    
              </div>
            </div>
          </Container>
        </header>
        <Container>
          
        <div className="row justify-content-center pt-5">
            <div className="col-sm-6">
                <div className="card p-4">
                    <h1 className="text-center mb-3">Login </h1>
                    <div className="form-group  mt-3 " style={{textAlign:'right'}}>
                        <label style={{textAlign:'right'}}> البريد الالكتروني</label>
                        <input type="email" className="form-control" 
                            onChange={e=>setEmail(e.target.value)}
                        id="email" />
                    </div>
                    <div className="form-group mt-3">
                        <label>كلمة السر</label>
                        <input type="password" className="form-control" 
                            onChange={e => setPassword(e.target.value)}
                        id="pwd" />
                    </div>
                   
                    <button type="button" onClick={submitForm} className="btn btn-primary mt-4">
                      
                   
                      <h3>تسجيل الدخول</h3>
                     </button>
                   
                </div>
            </div>
        </div>
        </Container>
         </Fragment>
        

    )
}

