import React,{ useState,useEffect,Fragment } from "react";
import {useNavigate,Link,useHistory}  from 'react-router-dom';

import ReactPaginate from 'react-paginate';
import { Container, Row, Col,Table ,Button,Form} from "reactstrap";
import ReactModal from 'react-modal';
import * as AiIcons from "react-icons/ai";
import HeaderRecep from "../../HeaderRecep" ;
import AuthUser from  '../../../Auth/AuthUser';
import "./Style.css";
import QrReader from "react-web-qr-reader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function GetRecordStudent() {
    
    const {http} = AuthUser();
    const [first_name,setFirstName] = useState();
    const [last_name,setLastName] = useState();
    const [roll_number,setRoll] =useState(5);
    const [birth_day,setBirthDay] =useState();
    const [branch_id,setBranchId] =useState();
    const [phone_number,setPhone] =useState();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalIsOpenScan, setModalIsOpenScan] = useState(false);
    const [Branches,setbranches] = useState([]);
    const [editing, setEditing] = useState(false);
    const [editedItem, setEditedItem] = useState({});
    const [searchTerm, setSearchTerm] = useState("");
    const [barcode, setbarcode] = useState("");
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageCount, setpageCount] = useState(0);  
    const history = useNavigate();


    const delay = 500;

    const previewStyle = {
      height: 200,
      width: 300,
      marginLeft: '10px' 
    };
    const [startScan, setStartScan] = useState(false);    
    //const [result, setResult] = useState("");

    const handleScan = (data) => {

      console.log(data);
      setbarcode(data.data)
      if(barcode !== "")
      {
        closeModalScan();
      }
    };
  
    const handleError = (err) => {
      console.error(err);
    };    
///============================
/// Modal
///=============================

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

///============================
/// Modal
///=============================

const openModalScan = () =>{
  
  setModalIsOpenScan(true);
  setStartScan(!startScan);

}
const closeModalScan = () => {
  setStartScan(!startScan);
  setModalIsOpenScan(false);
  loadData();
  loadData();
} 
  
const empty = () => {
  setbarcode("");
  setSearchTerm("");
  loadData();
}
///============================
/// store
///=============================
    const store = () =>{
      
        http.post('register',{roll_number:roll_number,first_name:first_name,last_name:last_name,birth_day:birth_day,branch_id:branch_id,phone_number:phone_number,email:email,password:password}).then((res)=>{
          const data=res.data;
          history('/Cards/index' , { state : { data } });
        }).catch(function (error) {
         toast.error("فشل العملية");
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
  
// http.get(`branch_admin/user/search/${searchTerm === "" ? 'null' : searchTerm}?roll_number=5&page=1`)

http.get(`branch_admin/user/searchByFilterWithBarcode/${searchTerm}?page=1&roll_number=5&barcode=${barcode}`).then((res)=>{
setData(res.data.data.data);
setpageCount(res.data.data.total/res.data.data.data.length);
}).catch(function (error) {

});
};    

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
http.get(`branch_admin/user/searchByFilterWithBarcode/${searchTerm}?roll_number=5&page=${selected+1}&barcode=${barcode}`).then((res)=>{
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
// GetCards
//=============================

const details = async (data)=>{
  
    history('/ManagementStudent/RecordStudent/details' , { state : { data } });
}


//=============================
// Update
//=============================

const Update = async (editedItem) => {

http.post(`branch/update/${editedItem.id}`,editedItem).catch(function (error) {
console.log(error);
});
}




const handleEditClick = (item) => {
setEditedItem(item);
setEditing(true);
};

const handleSaveClick = () => {

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
<HeaderRecep />
<div className="container-fluid">
    
<Col md="12" lang="ar">

       
<div className="card" style={{   textAlign: 'right' ,height: '500px' ,fontSize: "10px",background: '#f8f9fa', marginTop:'15px',border: 'none',boxShadow: 'none'}}>
          <div className="card-header" style={{background: 'white'}}>
           <div className="row">

           <div className="col-md-4">

</div>
<div className="col-md-4">
  
<div class="d-flex justify-content-between ml-2">
<button className="btn btn-secondary" onClick={empty}>   تفريغ</button>
<button className="btn btn-secondary" onClick={openModalScan}>  بحث متقدم</button>

</div>
</div>           
           <div className="col-md-4">

<div className="input-group mb-2">
<input
type="text"
className="form-control"
placeholder="إبحث عن اسم أو رقم"
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
         <td colSpan={8} className="text-center">
           لايوجد بيانات
         </td>
       </tr>
     ) : (
       data.map((data) => (
         <tr key={data.id}>

                     
           <td>

           {/* {!editing || editedItem.id !== data.id ? (
           <AiIcons.AiOutlineEdit onClick={() => handleEditClick(data)} style={{ color: 'green' , width : '10%' , height: '10%' ,alignItems:"center" }} />
           
           ) : (
             <>
               <button onClick={handleSaveClick}>Save</button>
               <button onClick={handleCancelClick}>Cancel</button>
             </>
           )} */}
           {/* <AiIcons.AiFillDelete onClick={() => Delete(data.id)} style={{ color: 'red' , width : '10%' , height: '10%' ,alignItems:"center" }} /> */}
           {/* <Link to="/ManagementStudent/RecordStudent/details"> */}
           
        <button className="btn btn-primary" onClick={()=>details(data)}>التفاصيل</button>
                {/* </Link> */}
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
         <div className="card-footer text-muted" style={{background: 'white'}}>
           <div className="row">
                   
                 <div className="col-lg-3">
                         
                         <div className="input-group mb-4">
                             
                             
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
                                         nextLabel={<AiIcons.AiOutlineDoubleRight />}/>
   
                         </div>
   
                    </div>
                    
                 <div className="col-lg-6">
                         
                         <div className="input-group mb-4">
                         </div>
                 </div>
                  

                 
                 <div className="col-lg-3"> 
                      
                           
                      <AiIcons.AiFillPlusCircle onClick={openModal} style={{ fontSize:'60px', color:'#0a58ca' ,
                              border: 'none', alignItems:"center" }} />
                        
                      
                 </div>
            </div>
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
               <div className="col-md-6">اضافة طالب</div>
               <div className="col-md-6">
               <AiIcons.AiOutlineClose onClick={closeModal} /></div>

           </div>

     </div>
     <div class="card-body" dir="rtl">
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
                                <div className="form-group mt-2" dir="rtl">
                                       <label>تاريخ الميلاد</label>
                                       <input type="date" className="form-control" 
                                           onChange={e=>setBirthDay(e.target.value)}
                                       id="birth_day" />
                                </div>  
                        </div>
                        <div className="col-md-6">
                                
                                <div className="form-group mt-2" dir="rtl">
                                       <label>رقم الهاتف</label>
                                       <input type="number" className="form-control" 
                                           onChange={e=>setPhone(e.target.value)}
                                       id="phone_number" />
                                </div>
                        </div>

                       
                        
                    </div>

                    <div className="row">
                       
                        <div className="col-md-6" dir="rtl">
                                <div className="form-group mt-2">
                                       <label> البريد الالكتروني</label>
                                       <input type="email" className="form-control" 
                                           onChange={e=>setEmail(e.target.value)}
                                       id="email" />
                                </div>
                        </div>
                        <div className="col-md-6">
                                <div className="form-group mt-2" dir="rtl">
                                       <label>كلمة السر</label>
                                       <input type="password" className="form-control" 
                                           onChange={e => setPassword(e.target.value)}
                                       id="pwd" />
                                </div>
                        </div>
                    </div>

           
     </div>
     <div class="card-footer text-muted">
     <div class="row">
 								<div class="col-sm-3"></div>
 								<div class="col-sm-9 text-secondary">
 									<input type="button" onClick={store} class="btn btn-primary px-4" value="حفظ"/>
 								</div>
 							</div>
          {/* <a href="#" onClick={store} class="btn btn-primary">حفظ</a>  */}
     </div>
   </div>


</ReactModal> 


<ReactModal isOpen={modalIsOpenScan}
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
               <div className="col-md-6">مسح البطاقة</div>
               <div className="col-md-6">
               <AiIcons.AiOutlineClose onClick={closeModalScan} /></div>

           </div>

     </div>
     <div class="card-body" dir="rtl">
     <div class="card-body">
              
<div className="row">
  <div className="col-lg-4"></div>
  <div className="col-lg-4">
    
 {/* <button type="button" className="btn btn-primary mt-0" onClick={() => setStartScan(!startScan)} style={{ display: 'inline-block', marginLeft: '10px', backgroundColor: 'green', borderRadius: '8px', border: 'none' }}>
     {startScan ? "ايقاف المسح" : "بدء المسح"}
 </button>
 
 <button type="button" className="btn btn-primary mt-0" style={{ display: 'inline-block', marginLeft: '10px', backgroundColor: 'red', borderRadius: '8px', border: 'none' }}>
     امسح
 </button> */}
 
 
             
     {startScan && (
       
 <div>
 <QrReader
   delay={delay}
   facingMode={"user"}
   style={previewStyle}
   onError={handleError}
   onScan={handleScan}
 />
 </div>
       
     )}
  </div>
  <div className="col-lg-4"></div>
</div>
     
 
             </div>
           
     </div>
     <div class="card-footer text-muted">
     <div class="row">
 								<div class="col-sm-3"></div>
 								<div class="col-sm-9 text-secondary">
 									<input type="button" onClick={store} class="btn btn-primary px-4" value="حفظ"/>
 								</div>
 							</div>
          {/* <a href="#" onClick={store} class="btn btn-primary">حفظ</a>  */}
     </div>
   </div>


</ReactModal> 
</div>  
</Fragment>
    )
}



    






