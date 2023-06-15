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

const HeaderBrcMgr = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const menuRef = useRef();

  const menuToggle = () => menuRef.current.classList.toggle("active__menu");


  return (

    <Navbar className="header" light expand="md">
      <NavbarBrand href="/">مدير الفرع</NavbarBrand>
      <Nav className="mr-auto" navbar>
        <NavItem>
          <NavLink href="/">الصفحة الرئيسية</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/Codes/ClassRoom">القاعات</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/Trainer_Management/RecoredTranier">  إدارة سجلات المتدربين</NavLink>
        </NavItem>
        {/* <Dropdown nav isOpen={dropdownOpen} toggle={toggleDropdown}>
          <DropdownToggle nav caret>
             الترميزات
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem href="/Codes/ClassRoom">
             القاعات
            </DropdownItem>
           
          </DropdownMenu>
        </Dropdown> */}
        {/* <Dropdown nav isOpen={dropdownOpen} toggle={toggleDropdown}>
          <DropdownToggle nav caret>
             إدارة سجلات المتدربين
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem href="/Trainer_Management/RecoredTranier">
             تسجيل المتدربين
            </DropdownItem>
           
          </DropdownMenu>
        </Dropdown> */}
      </Nav>
    </Navbar>
  );
};

export default HeaderBrcMgr;
