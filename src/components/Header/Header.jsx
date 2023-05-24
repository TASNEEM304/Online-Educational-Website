import React, { useRef } from "react";
import { Container } from "reactstrap";
import "./header.css";
import { BrowserRouter as Router, Routes, Route ,Link} from "react-router-dom";

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

 
  {
    display: "Courses",
    url: "#",
    //path: "/Courses",
  },
  {
    display: "Pages",
    url: "#",
   // path: "",
  },
  {
    display: "Blog",
    url: "#",
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

const Header = () => {
 
  const {getToken,getUser} = AuthUser();
  

 
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
                    <Link to= {getToken() == null ? '/Login' : '/Dashboard'} >{ getToken() == null ? 'Login' : 'Dashboard'}</Link>
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
