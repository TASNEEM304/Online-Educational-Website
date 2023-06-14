// import { Container} from "reactstrap";
// import { BrowserRouter as Router, Routes, Route ,Link,useNavigate} from "react-router-dom";

// import React, { useState ,useRef} from "react";
// import {
//   Navbar,
//   NavbarBrand,
//   Nav,
//   NavItem,
//   NavLink,
//   Dropdown,
//   DropdownToggle,
//   DropdownMenu,
//   DropdownItem,
// } from "reactstrap";

// const HeaderBrcMgr = () => {
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

//   const menuRef = useRef();

//   const menuToggle = () => menuRef.current.classList.toggle("active__menu");


//   return (

//     <Navbar className="header" light expand="md">
//       <NavbarBrand href="/">مدير الفرع</NavbarBrand>
//       <Nav className="mr-auto" navbar>
//         <NavItem>
//           <NavLink href="/">الصفحة الرئيسية</NavLink>
//         </NavItem>
        
//         <Dropdown nav isOpen={dropdownOpen} toggle={toggleDropdown}>
//           <DropdownToggle nav caret>
//              الترميزات
//           </DropdownToggle>
//           <DropdownMenu>
//             <DropdownItem href="/Codes/ClassRoom">
//              القاعات
//             </DropdownItem>
           
//           </DropdownMenu>
//         </Dropdown>
//       </Nav>
//     </Navbar>
//   );
// };

// export default HeaderBrcMgr;












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

const HeaderBrcMgr = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleDropdown1 = () => setDropdownOpen1(!dropdownOpen1);

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
      الترميزات 
      </DropdownToggle>
      <DropdownMenu>
      <DropdownItem href="/Codes/ClassRoom">
              القاعات
             </DropdownItem>
           
      </DropdownMenu>
      
    
      
       
      
    </Dropdown>
    <Dropdown nav isOpen={dropdownOpen1} toggle={toggleDropdown1}>
    <DropdownToggle nav caret  style={{color: 'white', fontSize: '14px'}}>
      تسجيل  
      </DropdownToggle>
      <DropdownMenu>
      
             <DropdownItem href="/ManagementRecptiones/RecoredRecpitions">
                تسجيل موظف استقبال
             </DropdownItem>
      </DropdownMenu>
      </Dropdown>
  </Nav>
</Navbar>
  );
};

export default HeaderBrcMgr;


