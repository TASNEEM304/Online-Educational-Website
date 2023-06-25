import { Container} from "reactstrap";
import { BrowserRouter as Router, Routes, Route ,Link,useNavigate} from "react-router-dom";

import React, { useState ,useRef} from "react";


{/* <Navbar className="header" light expand="md">
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
      <DropdownItem href="/RecordStudent/Subscribe">
       الاشتراكات
      </DropdownItem>
     
    </DropdownMenu>
  </Dropdown>
</Nav>
</Navbar> */}
const navLinks = [
  {
    display: "الصفحة الرئيسية",
    url: "/",
   
  },
  {
    display: " ماسح ال QrCode",
    url: "/Scanner",
   
  },
  {
    display: "المدفوعات",
    url: "/RecordStudent/Payment",
  },
  {
    display: "الفاتورة",
    url: "/PaymentCard",
  },
  {
    display: "الاشتراكات",
    url: "/RecordStudent/Subscribe",
    
  },
  {
    display: " تسجيل الطلاب",
    url: "/ManagementStudent/RecordStudent",
   
  },
];

const HeaderRecep = () => {
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
              <i class="ri-pantone-line"></i> موظف الإستقبال            </h2>
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

export default HeaderRecep;
