import React, {useState, useRef } from "react";
import { Container } from "reactstrap";
import "./header.css";
import { BrowserRouter as Router, Routes, Route ,Link,useNavigate} from "react-router-dom";

import AuthUser from "../Auth/AuthUser";


const navLinks = [
  {
    display: "الصفحة الرئيسية",
    url: "/",
   
  },
  {
    display: "الاستبيانات",
    url: "/About",
    
  },

 
  // {
  //   display: "Dashboard",
  //   url: "/Dashboard",
  // },
  // {
  //   display: "Login",
  //   url: "/Login",
  // },
];
//const navigate = useNavigate();

const Header = () => {


  const Logout = () => {
    localStorage.clear();
    //navigate('/Login');
  }
   
  const {getToken,getUser} = AuthUser();
  


//const [DashBoard, setDashBoard] = useState('');

// if(!getToken() && !getUser()){
//   setDashBoard('/');
// }

// else if(getUser().roll_number===0){
//   setDashBoard('/Dashboard');

// }
// else if(getUser().roll_number===3){
//   setDashBoard('/dashboardRec');
// }

 
  const menuRef = useRef();

  const menuToggle = () => menuRef.current.classList.toggle("active__menu");

  return (
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
              
                {navLinks.map((item, index) => (

                  <li key={index} className="nav__item">
                    <Link to={item.url}>{item.display}</Link>
                  </li>
                ))}
                  <li className="nav__item">
                          <Link to= {getToken() == null ? '/Login' 
                                    :getUser().roll_number===0 ?'/dashboard'
                                    :getUser().roll_number===1 ?'/dashboardScientAff'
                                    :getUser().roll_number===2 ?'/dashboardBrcMgr'
                                    :getUser().roll_number===3 ?'/dashboardRec'
                                    :getUser().roll_number===4 ?'/DashboardTrainers'
                                    :getUser().roll_number===5 ?'/dashboardRec'
                                    :'/'} >{ getToken() == null ? 'تسجيل الدخول ': 'لوحة التحكم' } </Link>
                   
                  </li>
                  <li className="nav__item">
                    <Link to={'/Student/Courses'}>اشتراكاتي</Link>
                  </li>
                    {/* <li className="nav__item" if>
                    <Link onClick={Logout}>تسجيل خروج </Link>
                  
                  </li> */}
<li className="nav__item">
                    <Link to={'/Register'}>تسجيل </Link>
                  
                  </li>
                  
                  
              </ul>
            </div>

          </div>

          <div className="mobile__menu">
            <span>
              <i class="ri-menu-line" onClick={menuToggle}></i>
            </span>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
