import { Container} from "reactstrap";
import { BrowserRouter as Router, Routes, Route ,Link,useNavigate} from "react-router-dom";

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

    <Navbar className="header" light expand="md">
      <NavbarBrand href="/">مدير الشؤوون العلمية</NavbarBrand>
      <Nav className="mr-auto" navbar>
        <NavItem>
          <NavLink href="/">الصفحة الرئيسية</NavLink>
        </NavItem>
        
        <Dropdown nav isOpen={dropdownOpen} toggle={toggleDropdown}>
          <DropdownToggle nav caret>
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
