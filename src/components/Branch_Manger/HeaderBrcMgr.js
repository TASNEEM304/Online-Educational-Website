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
          <NavLink href="/Course/Add">اضافة كورسات</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/ViewQuestionnaire/questionnaire">استطلاع الاستبيانات</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/ViewQusationBank/all">استطلاع بنك الأسئلة</NavLink>
        </NavItem>
        <Dropdown nav isOpen={dropdownOpen} toggle={toggleDropdown}>
          <DropdownToggle nav caret>
             تسجيل
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem href="/Trainer_Management/RecoredTranier">
             تسجيل المدربين
            </DropdownItem>
            <DropdownItem href="/ManagementRecptiones/RecoredRecpitions">
             تسجيل موظفين
            </DropdownItem>
           
          </DropdownMenu>
           </Dropdown>

           <Dropdown nav isOpen={dropdownOpen1} toggle={toggleDropdown1}>
          <DropdownToggle nav caret>
             ادارةالملفات الشخصية
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem href="/Trainer_Management/details">
             ملفات المدربين 
            </DropdownItem>
            <DropdownItem href="/ManagementRecptiones/RecoredRecpitions/details">
             ملفات الموظفين
            </DropdownItem>
           
          </DropdownMenu>
           </Dropdown>









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


