import { Container} from "reactstrap";
import { BrowserRouter as Router, Routes, Route ,Link,useNavigate} from "react-router-dom";
import logo from"../../assests/images/logo.jpg"
import React, { useState ,useRef} from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const navLinks = [
  {
    display: "الصفحة الرئيسية",
    url: "/",
   
  },
  {
    display: "إدارة موظفين",
    url: "/ManagementRecptiones/RecoredRecpitions",
    
  },

  {
    display: " إدارة المدربين",
    url: "/Trainer_Management/RecoredTranier",
    
  },

  {
    display: "استطلاع بنك الأسئلة",
    url: "/ViewQusationBank/all",
    
  },
  {
    display: "استطلاع الاستبيانات",
    url: "/ViewQuestionnaire/questionnaire",
    
  },
  {
    display: "الكورسات",
    url: "/Course/Add",
    
  },
  {
    display: " القاعات",
    url: "/Codes/ClassRoom",
    
  },
];


const HeaderBrcMgr = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleDropdown1 = () => setDropdownOpen1(!dropdownOpen1);

  const menuRef = useRef();

  const menuToggle = () => menuRef.current.classList.toggle("active__menu");


  return (

<header className="header">
      <Container>
        <div className="navigation d-flex align-items-center justify-content-between">
          
        <h2 className=" d-flex align-items-center gap-1">
         مدير الفرع  </h2>

          <div className="nav d-flex align-items-center gap-5">
            <div className="nav__menu" ref={menuRef} onClick={menuToggle}>
              <ul className="nav__list">
              
                {navLinks.map((item, index) => (

                  <li key={index} className="nav__item">
                    <Link to={item.url}>{item.display}</Link>
                    <span className="nav__line"></span>
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


    // <Navbar className="header" light expand="md">
    //   <NavbarBrand href="/">مدير الفرع</NavbarBrand>
    //   <Nav className="mr-auto" navbar>
    //     <NavItem>
    //       <NavLink href="/">الصفحة الرئيسية</NavLink>
    //     </NavItem>
    //     <NavItem>
    //       <NavLink href="/Codes/ClassRoom">القاعات</NavLink>
    //     </NavItem>
    //     <NavItem>
    //       <NavLink href="/Course/Add">اضافة كورسات</NavLink>
    //     </NavItem>
    //     <NavItem>
    //       <NavLink href="/ViewQuestionnaire/questionnaire">استطلاع الاستبيانات</NavLink>
    //     </NavItem>
    //     <NavItem>
    //       <NavLink href="/ViewQusationBank/all">استطلاع بنك الأسئلة</NavLink>
    //     </NavItem>
    //     <Dropdown nav isOpen={dropdownOpen} toggle={toggleDropdown}>
    //       <DropdownToggle nav caret>
    //          تسجيل
    //       </DropdownToggle>
    //       <DropdownMenu>
    //         <DropdownItem href="/Trainer_Management/RecoredTranier">
    //          تسجيل المدربين
    //         </DropdownItem>
    //         <DropdownItem href="/ManagementRecptiones/RecoredRecpitions">
    //          تسجيل موظفين
    //         </DropdownItem>
           
    //       </DropdownMenu>
    //        </Dropdown>

    //        <Dropdown nav isOpen={dropdownOpen1} toggle={toggleDropdown1}>
    //       <DropdownToggle nav caret>
    //          ادارةالملفات الشخصية
    //       </DropdownToggle>
    //       <DropdownMenu>
    //         <DropdownItem href="/Trainer_Management/details">
    //          ملفات المدربين 
    //         </DropdownItem>
    //         <DropdownItem href="/ManagementRecptiones/RecoredRecpitions/details">
    //          ملفات الموظفين
    //         </DropdownItem>
           
    //       </DropdownMenu>
    //        </Dropdown>









    //     {/* <Dropdown nav isOpen={dropdownOpen} toggle={toggleDropdown}>
    //       <DropdownToggle nav caret>
    //          إدارة سجلات المتدربين
    //       </DropdownToggle>
    //       <DropdownMenu>
    //         <DropdownItem href="/Trainer_Management/RecoredTranier">
    //          تسجيل المتدربين
    //         </DropdownItem>
           
    //       </DropdownMenu>
    //     </Dropdown> */}
    //   </Nav>
    // </Navbar>
  );
};

export default HeaderBrcMgr;


