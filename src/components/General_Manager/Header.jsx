//import React, { useRef } from "react";
import { Container } from "reactstrap";

import { BrowserRouter as Router, Routes, Route ,Link} from "react-router-dom";




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
              <i class="ri-pantone-line"></i> سوريين ايجابيين بالمطلق
            </h2>
          </div>

          <div className="nav d-flex align-items-center gap-5">
            <div className="nav__menu" ref={menuRef} onClick={menuToggle}>
              <ul className="nav__list">

                
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
                      
                     </DropdownMenu>
                   </Dropdown>
              </ul>
            </div>
          </div>

        </div>
      </Container>
    </header>




















    // <Navbar color="light" light expand="md">
    //   <NavbarBrand href="/">سوريين ايجابيين بالمطلق</NavbarBrand>
    //   <Nav className="mr-auto" navbar>
    //     <NavItem>
    //       <NavLink href="/">Home</NavLink>
    //     </NavItem>
    //     <NavItem>
    //       <NavLink href="/about">About</NavLink>
    //     </NavItem>
        
    //     <Dropdown nav isOpen={dropdownOpen} toggle={toggleDropdown}>
    //       <DropdownToggle nav caret>
    //         الترميزات
    //       </DropdownToggle>
    //       <DropdownMenu>
    //         <DropdownItem href="/Codes/Branch">
    //         الفروع
    //         </DropdownItem>
    //         <DropdownItem href="/services/service2">
    //           Service 2
    //         </DropdownItem>
           
    //       </DropdownMenu>
    //     </Dropdown>
    //   </Nav>
    // </Navbar>
  );
};

export default Header;

// const navLinks = [
//   {
//     display: "Home",
//     url: "/",
//    // path: "/",
//   },
//   {
//     display: "Codes",
//     url: "/About",
    
//   },

//   {
//     display: "Courses",
//     url: "#",
//     //path: "/Courses",
//   },
//   {
//     display: "Pages",
//     url: "#",
//    // path: "",
//   },
  
//   {
//     display: "Dashboard",
//     url: "/Dashboard",
//   },
//   {
//     display: "Dashboard",
//     url: "/Dashboard",
//   },
// ];

// const Header = () => {
//   const menuRef = useRef();

//   const menuToggle = () => menuRef.current.classList.toggle("active__menu");

//   return (
//     <header className="header">
//       <Container>
//         <div className="navigation d-flex align-items-center justify-content-between">
//           <div className="logo">
//             <h2 className=" d-flex align-items-center gap-1">
//               <i class="ri-pantone-line"></i> سوريين ايجابيين بالمطلق
//             </h2>
//           </div>

//           <div className="nav d-flex align-items-center gap-5">
//             <div className="nav__menu" ref={menuRef} onClick={menuToggle}>
//               <ul className="nav__list">
//                 {navLinks.map((item, index) => (
//                   <li key={index} className="nav__item">
//                     <Link to={item.url}>{item.display}</Link>
//                   </li>
//                 ))}

//                 <li>
//                 {/* <a href="/About" onClick={(e) => {
//   e.preventDefault();
//   window.location.replace("/About");
// }}>Dashboard</a> */}
                
//                 </li>
//               </ul>
//             </div>

//             <div className="nav__right">
//               <p className="mb-0 d-flex align-items-center gap-2">
//                 <i class="ri-phone-line"></i> +88 0123456789
//               </p>
//             </div>
//           </div>

//           <div className="mobile__menu">
//             <span>
//               <i class="ri-menu-line" onClick={menuToggle}></i>
//             </span>
//           </div>
//         </div>
//       </Container>
//     </header>
//   );
// };

// export default Header;
