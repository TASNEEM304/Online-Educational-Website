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

const HeaderRecep = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const menuRef = useRef();

  const menuToggle = () => menuRef.current.classList.toggle("active__menu");


  return (

    <Navbar className="header" light expand="md">
      <NavbarBrand href="/">موظف الاستقبال</NavbarBrand>
      <Nav className="mr-auto" navbar>
        <NavItem>
          <NavLink href="/">الصفحة الرئيسية</NavLink>
        </NavItem>

        <NavItem>
          <NavLink href="/Scanner"> ماسح البارمود</NavLink>
        </NavItem>
       
        
        <Dropdown nav isOpen={dropdownOpen} toggle={toggleDropdown}>
          <DropdownToggle nav caret>
            بطاقات الطلاب
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem href="/ManagementStudent/RecordStudent">
            تسجيل الطلاب
            </DropdownItem>
           
          </DropdownMenu>
        </Dropdown>
      </Nav>
    </Navbar>
  );
};

export default HeaderRecep;
