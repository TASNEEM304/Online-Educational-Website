




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

const HeaderSiectAff = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const menuRef = useRef();

  const menuToggle = () => menuRef.current.classList.toggle("active__menu");


  return (

















    <Navbar className="header" light expand="lg">
  <NavbarBrand href="/">
    <img src={logo} className="logo" alt="Logo" style={{maxWidth:'100px',height:'auto',borderRadius:'50%'}} />
  </NavbarBrand>
  <Nav className="mr-auto" navbar>
    <NavItem>
      <NavLink href="/" style={{color: 'white', fontSize: '14px'}}>الصفحة الرئيسية</NavLink>
    </NavItem>
    <Dropdown nav isOpen={dropdownOpen} toggle={toggleDropdown}>
      <DropdownToggle nav caret  style={{color: 'white', fontSize: '14px'}}>
      ادارة المحتوى
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem href="/Subjects/index">
          المواد العلمية
        </DropdownItem>
        <DropdownItem href="/QuestionBank/index">
        بنك الأسئلة
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </Nav>
</Navbar>
  );
};

export default HeaderSiectAff;

