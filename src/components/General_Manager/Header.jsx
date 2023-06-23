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
    display: "إدارة مدراء الفروع",
    url: "/RecoredBranchesManagers",
    
  },
  {
    display: "إدارة الفروع",
    url: "/Codes/Branch",
    
  },
];
const Header = () => {
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
              <i class="ri-pantone-line"></i> المدير العام  </h2>
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



















//     <Navbar className="header" light expand="lg">
//   <NavbarBrand href="/">
//     <img src={logo} className="logo" alt="Logo" style={{maxWidth:'100px',height:'auto',borderRadius:'50%'}} />
//   </NavbarBrand>
//   <Nav className="mr-auto" navbar>
//     <NavItem>
//       <NavLink href="/" style={{color: 'white', fontSize: '14px'}}>الصفحة الرئيسية</NavLink>
//     </NavItem>
//     <NavItem>
//       <NavLink href="/RecoredBranchesManagers" style={{color: 'white', fontSize: '14px', lineHeight: '80px'}}>إضافة موظفين</NavLink>
//     </NavItem>
//     <Dropdown nav isOpen={dropdownOpen} toggle={toggleDropdown}>
//       <DropdownToggle nav caret  style={{color: 'white', fontSize: '14px'}}>
//         الترميزات
//       </DropdownToggle>
//       <DropdownMenu>
//         <DropdownItem href="/Codes/Branch">
//           الفروع
//         </DropdownItem>
       
//       </DropdownMenu>
//     </Dropdown>
//   </Nav>
// </Navbar>
  );
};

export default Header;
