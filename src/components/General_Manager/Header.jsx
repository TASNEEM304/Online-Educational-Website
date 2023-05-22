
import React, { useState } from "react";
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

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <Navbar color="light" light expand="md">
      <NavbarBrand href="/"> سوريين ايجابيين بالمطلق </NavbarBrand>
      <Nav className="mr-auto" navbar>
      <NavItem>
          <NavLink href="/">الصفحةالرئيسية</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/About">الاستبيانات</NavLink>
        </NavItem>
       
        <Dropdown nav isOpen={dropdownOpen} toggle={toggleDropdown}>
          <DropdownToggle nav caret>
            الترميزات
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem href="/Codes/Branch">
              الفروع
            </DropdownItem>
            <DropdownItem href="/services/service2">
              Service 2
            </DropdownItem>
            <DropdownItem href="/services/service3">
              Service 3
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Nav>
    </Navbar>
  );
};

export default Header;
