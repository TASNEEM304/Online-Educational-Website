
import { Container} from "reactstrap";
import { BrowserRouter as Router, Routes, Route ,Link,useNavigate} from "react-router-dom";
import logo from"../../assests/images/logo.jpg"
import React, { useState ,useRef} from "react";

const navLinks = [
  {
    display: "الصفحة الرئيسية",
    url: "/",
   
  },
  {
    display: "بنك الأسئلة",
    url: "/Trainer/QuestionBank",
    
  }
  ,  {
    display: "كورسات المدرب ",
    url: "/Trainer/CoursesById",
    
  }

  
];


const HeaderTrainer = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const menuRef = useRef();

  const menuToggle = () => menuRef.current.classList.toggle("active__menu");


  return (


<header className="header">
      <Container>
        <div className="navigation d-flex align-items-center justify-content-between">
          <div className="logo">
            <h2 className=" d-flex align-items-center gap-1">
              <i class="ri-pantone-line"></i>  المدربين </h2>
          </div>

          <div className="nav d-flex align-items-center gap-5">
            <div className="nav__menu" ref={menuRef} onClick={menuToggle}>
              <ul className="nav__list">
              
                {navLinks.map((item, index) => (

                  <li key={index} className="nav__item">
                    <Link to={item.url}>{item.display}</Link>
                  </li>
                ))}
                  
                  
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

export default HeaderTrainer;

