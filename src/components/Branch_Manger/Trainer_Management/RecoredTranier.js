import React,{ useState,useEffect,Fragment } from "react";
import {useNavigate,Link,useHistory}  from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { Container, Row, Col,Table,Button ,Form} from "reactstrap";
import ReactModal from 'react-modal';
import * as AiIcons from "react-icons/ai";
import Header from "./../HeaderBrcMgr";
import AuthUser from  '../../Auth/AuthUser';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function RecoredTranier() {
    
    const {http} = AuthUser();
    const [first_name,setFirstName] = useState();
    const [last_name,setLastName] = useState();
    const [roll_number,setRoll] =useState(4);
    const [birth_day,setBirthDay] =useState();
    const [branch_id,setBranchId] =useState();
    const [Branches,setbranches] = useState([]);
    const [phone_number,setPhone] =useState();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    
    const [editing, setEditing] = useState(false);
    const [editedItem, setEditedItem] = useState({});
    const [searchTerm, setSearchTerm] = useState("");
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageCount, setpageCount] = useState(0);  
    const history = useNavigate();
    
    
///============================
/// Modal
///=============================

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

///============================
/// Getbranches
///=============================
      // useEffect(()=>{
      //   const Getbranches = async ()=>{
      //     http.get('branch/index').then((res)=>{
      //      setbranches(res.data.data.data);
      //   });
      // }
      //   Getbranches();
      // },[])

///============================
/// loadData
///=============================
      // useEffect(() => {
      //   const loadData = async () => {
      //     http.get(`user/search/samar?page=1`).then((res)=>{
      //       setData(res.data.data.data);
      //       setCurrentPage(1);
      //      }).catch(function (error) {
    
      //      }); 
      //   };
      
      //   loadData();
      // }, []);

///============================
/// handlePageClick
///=============================
    
// const handlePageClick = async ({ selected }) => {
//   http.get(`user/search/samar?page=${selected}`).then((res)=>{
//     setData(res.data.data);
//     setCurrentPage(selected);
//    }).catch(function (error) {

//    });
// };

///============================
/// store
///=============================
    const store = () =>{
      
        http.post('branch_admin/add_employee',{roll_number:roll_number,first_name:first_name,last_name:last_name,birth_day:birth_day,branch_id:branch_id,phone_number:phone_number,email:email,password:password}).then((res)=>{
          const data=res.data;
          toast.success("تمت العملية بنجاح");
          
        }).catch(function (error) {
          console.log(error);
          toast.error(error);
          });
       
    }
///============================
/// Delete
///=============================

    const Delete= async (id) =>{
  
    http.post(`branch/destroy/${id}`).then((res)=>{
       alert(res.data.message);
    })
 }


    
///============================
/// loadData
///=============================
useEffect(() => {
  loadData();
         }, []);
const loadData = async () => {
debugger
http.get(`user/search/${searchTerm === "" ? 'null' : searchTerm}?roll_number=4&page=1`).then((res)=>{
setData(res.data.data.data);
setpageCount(res.data.data.total/res.data.data.data.length);
}).catch(function (error) {

});
};    

///============================
/// Delete
///=============================





//=============================
// Getbranches
//=============================
useEffect(()=>{
Getbranches()
},[])

const Getbranches = async ()=>{
http.get('branch/index').then((res)=>{
 setbranches(res.data.data.data);
});
}


///============================
/// handlePageClick
///=============================

const handlePageClick = async ({ selected }) => {
http.get(`user/search/${searchTerm === "" ? 'null' : searchTerm}?roll_number=4&page=${selected+1}`).then((res)=>{
setData(res.data.data.data);
setCurrentPage(selected);
}).catch(function (error) {

});
};

///============================
/// Search
///=============================

const handleSearchChange = (event) => {
setSearchTerm(event.target.value);

//setCurrentPage(1); // reset page number when search term changes
};
const handleSearchClick = () => {
loadData();
};

//=============================
// Update
//=============================

const Update = async (editedItem) => {
debugger
http.post(`branch/update/${editedItem.id}`,editedItem).catch(function (error) {
console.log(error);
});
}

const handleEditClick = (item) => {
setEditedItem(item);
setEditing(true);
};

const handleSaveClick = () => {
debugger
setData(data.map((item) => (item.id === editedItem.id ? editedItem : item)));
setEditing(false);
Update(editedItem);

};

const handleCancelClick = () => {
setEditing(false);
};

const handleInputChange = (event) => {
const { name, value } = event.target;
setEditedItem((prevState) => ({ ...prevState, [name]: value }));
};




  
    return(


<Fragment>
<Header />
<div className="container-fluid">
    
<Col md="12" lang="ar" style={{padding:'10px'}} >

       
<div className="card" style={{   textAlign: 'right' ,height: '500px' ,fontSize: "10px",background: '#f8f9fa', marginTop:'15px'}}>
          <div className="card-header">
           <div className="row">
           
           <div className="col-md-4">

<div className="input-group mb-2">
<input
type="text"
className="form-control"
placeholder=" بحث...   "
value={searchTerm}
onChange={handleSearchChange}

/>
<div className="input-group-append">
<span className="input-group-text">
<AiIcons.AiOutlineSearch onClick={handleSearchClick} style={{ fontSize:'30px',alignItems:"center" }} />

</span>
</div>

           
</div>
</div>
<div className="col-md-2">
           </div>
<div className="col-md-6">
<Button variant="success"  onClick={openModal} style={{  background :  "linear-gradient(to left, #2980b9, #2c3e50)" , borderColor: 'blue' }}>أضف مدرب جديد

</Button>
</div>

           </div>
        

         </div>
         <div className="card-body"style={{ textAlign: 'center' ,fontSize: "16px", 
                    width: "100%",
                    height : "100%",
                    padding: "0"
                    }}>
              
              
         <Table style={{fontSize: "16px", 
                    width: "100%"
                    }}>
   <thead style={{background: "#2980b9" , 
   }}>
     <tr >
       <th style={{ width: "10%" }}></th>
       <th style={{ width: "10%" }}>الفرع</th>
       <th style={{ width: "10%" }}>رقم الهاتف</th>
       <th style={{ width: "20%" }}>البريد الإلكتروني</th>
       <th style={{ width: "20%" }}>تاريخ الميلاد</th>
       <th style={{ width: "10%" }}>النسبة</th>
       <th style={{ width: "10%" }}>الاسم</th>
       <th style={{ width: "10%" }}>الرقم</th>
     </tr>
   </thead>
   <tbody>
     {data.length === 0 ? (
       <tr>
         <td colSpan={3} className="text-center">
           
         </td>
       </tr>
     ) : (
       data.map((data) => (
         <tr key={data.id}>

                     
           <td>

           {!editing || editedItem.id !== data.id ? (
           <AiIcons.AiOutlineEdit onClick={() => handleEditClick(data)} style={{ color: 'green' , width : '10%' , height: '10%' ,alignItems:"center" }} />
           
           ) : (
             <>
               <button onClick={handleSaveClick}>Save</button>
               <button onClick={handleCancelClick}>Cancel</button>
             </>
           )}
           <AiIcons.AiFillDelete onClick={() => Delete(data.id)} style={{ color: 'red' , width : '10%' , height: '10%' ,alignItems:"center" }} />
           <Link to="/ManagementRecptiones/RecoredRecpitions/details">
           
           
        <button>Show</button>
                </Link>
         </td>
           <td>{editing && editedItem.id === data.id ? <input type="text" name="name" value={editedItem.name} onChange={handleInputChange} /> : data.name}</td>
           <td>{editing && editedItem.id === data.id ? <input type="text" name="name" value={editedItem.name} onChange={handleInputChange} /> : data.phone_number}</td>
           <td>{editing && editedItem.id === data.id ? <input type="text" name="name" value={editedItem.name} onChange={handleInputChange} /> : data.email}</td>
           <td>{editing && editedItem.id === data.id ? <input type="text" name="name" value={editedItem.name} onChange={handleInputChange} /> : data.birth_day}</td>
           <td>{editing && editedItem.id === data.id ? <input type="text" name="name" value={editedItem.name} onChange={handleInputChange} /> : data.last_name}</td>
           <td>{editing && editedItem.id === data.id ? <input type="text" name="name" value={editedItem.name} onChange={handleInputChange} /> : data.first_name}</td>
           <td>{editing && editedItem.id === data.id ? <input type="text" name="no" value={editedItem.No} onChange={handleInputChange} /> : data.No}</td>

         </tr>
       ))
     )}
   </tbody>
         </Table>
         </div>
         <div className="card-footer text-muted">
             
         <ReactPaginate
   pageCount={pageCount} // Total number of pages
   onPageChange={handlePageClick}
   containerClassName={'pagination'}
   pageClassName={'page-item'}
   activeClassName={'active'}
   previousClassName={'page-item'}
   nextClassName={'page-item'}
   breakClassName={'page-item'}
   pageLinkClassName={'page-link #550505'}
   previousLinkClassName={'page-link'}
   nextLinkClassName={'page-link'}
   breakLinkClassName={'page-link'}
   disableInitialCallback={true}
   previousLabel={<AiIcons.AiOutlineDoubleLeft />}
   nextLabel={<AiIcons.AiOutlineDoubleRight />}
 />
                           </div>
       </div>
 

 
</Col>
</div>

      <div>



<ReactModal isOpen={modalIsOpen}
style={{
 overlay: {
   backgroundColor: 'rgba(0, 0, 0, 0.5)',
   zIndex: 9999,
   display: 'flex',
 },
 content: {
   width: '800px',
   height: '500px',
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   borderRadius: '10px',
   background: '#fff',
   boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)',
   padding: '0px',
   paddingTop :'0px',
   display: 'flex',
 }
}}>


<div class="card" style={{ 
textAlign: 'right',
width: '800px',
height: 'auto',
padding: 0,
background: '#fff',
boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)',
display: 'flex',
flexDirection: 'column',
}}>
      <div class="card-header">

           <div className="row">
               <div className="col-md-6">سجل جديد </div>
               <div className="col-md-6">
               <AiIcons.AiOutlineClose onClick={closeModal} /></div>

           </div>

     </div>
     <div class="card-body">
     <div className="row">
                        <div className="col-md-6">
                              <div className="form-group mt-2">
                                       <label>الأسم الأول</label>
                                       <input type="text" className="form-control" 
                                           onChange={e=>setFirstName(e.target.value)}
                                       id="first_name" />
                              </div>   
                        </div>
                        <div className="col-md-6">
                               <div className="form-group mt-2">
                                       <label>الأسم الأخير</label>
                                       <input type="text" className="form-control" 
                                           onChange={e=>setLastName(e.target.value)}
                                       id="last_name" />
                               </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                                <div className="form-group mt-2">
                                       <label>تاريخ الميلاد</label>
                                       <input type="date" className="form-control" 
                                           onChange={e=>setBirthDay(e.target.value)}
                                       id="birth_day" />
                                </div>  
                        </div>
                        <div className="col-md-6">
                                
                                <div className="form-group mt-2">
                                       <label>رقم الهاتف</label>
                                       <input type="number" className="form-control"
                                           onChange={e=>setPhone(e.target.value)}
                                       id="phone_number" />
                                </div>
                        </div>

                       
                        
                    </div>

                    <div className="row">
                       
                        <div className="col-md-6">
                                <div className="form-group mt-2">
                                       <label>البريد الالكتروني</label>
                                       <input type="email" className="form-control" 
                                           onChange={e=>setEmail(e.target.value)}
                                       id="email" />
                                </div>
                        </div>
                        <div className="col-md-6">
                                <div className="form-group mt-2">
                                       <label>كلمة السر</label>
                                       <input type="password" className="form-control" 
                                           onChange={e => setPassword(e.target.value)}
                                       id="pwd" />
                                </div>
                        </div>
                    </div>

                    <div className="row">

                    <div className="col-md-6">
                                {/* <div className="form-group mt-2">
                                        <label>roll_number:</label>
                                        <input type="number" className="form-control" placeholder="Enter roll_number"
                                            onChange={e=>setRoll(e.target.value)}
                                       id="roll_number" />
                                </div> */}
                        </div>
                        <div className="col-md-6">
                                <div className="form-group mt-2">
                                        <label></label>
                                        <select  onChange={(e)=>setBranchId(e.target.value)}>
                                                   <option value="">الرجاء اختيار الفرع</option>
                                                   {Branches.map(option => (
                                                     <option key={option.id} value={option.id} >{option.name}</option>
                                                   ))}
                                           </select>
                                </div>
                        </div>
                    
                    </div>
           
     </div>
     <div class="card-footer text-muted">
          <a href="#" onClick={store} class="btn btn-primary">حفظ</a> 
     </div>
   </div>


</ReactModal> 

<ToastContainer/>




</div>  
</Fragment>
    )
}



    






