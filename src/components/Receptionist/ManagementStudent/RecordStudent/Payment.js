import React ,{Fragment,useEffect,useState} from "react";
import { Container, Row, Col,Table ,Form} from "reactstrap";
import HeaderRecep from "../../HeaderRecep";
import {useNavigate,Link,useHistory}  from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import ReactModal from 'react-modal';
import * as AiIcons from "react-icons/ai";
import AuthUser from  '../../../Auth/AuthUser';
import "./Style.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


function GetPayment () {


    const {http} = AuthUser();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalIsOpenWithdraw, setModalIsOpenWithdraw] = useState(false);
    const [Cards,setCards] = useState([]);
    const [Course,setCourse] = useState([]);
    const [card_id,setCards_Id] = useState();
    const [course_id,setCourse_Id] = useState();
    const [editing, setEditing] = useState(false);
    const [editedItem, setEditedItem] = useState({});
    const [searchTerm, setSearchTerm] = useState("");
    const [data, setData] = useState([]);
    const [dataRow, setDataRow] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageCount, setpageCount] = useState(0);  
    const history = useNavigate();

    const [Debit,setDebit] = useState();   
    const [amount,setAmount] = useState();    

    const [show, setShow] = useState(false);
    const handleShow = () => {
      setShow(true);
      closeModalWithdraw();}
    const handleClose = () => setShow(false);
///============================
/// Modal
///=============================

    const openModal = (node) => {
      debugger
      setDataRow(node);
      setModalIsOpen(true);
    }
    const closeModal = () => setModalIsOpen(false);


///============================
/// store
///=============================
const storereceipt = () =>{
      debugger
  http.post('receptionist/receipt/store',{Debit:Debit,user_id:dataRow.users_id,payment_id:dataRow.payment_id,description:'dsadda'}).then((res)=>{
    const data=res.data;
    toast.success(data.success)
    loadData(); 
    
    closeModal();

  }).catch(function (error) {
    console.log(error);
    });
 
}

///============================
/// loadData
///=============================
useEffect(() => {
loadData();
     }, []);
const loadData = async () => {
debugger
http.get(`receptionist/receipt/search/${searchTerm}?page=1`).then((res)=>{
setData(res.data.data);
setpageCount(res.data.data.total/res.data.data.data.length);
}).catch(function (error) {

});
};    


///============================
/// Modal
///=============================

const openModalWithdraw = (node) => {
  debugger
  setDataRow(node);
  setModalIsOpenWithdraw(true);
}
const closeModalWithdraw = () => setModalIsOpenWithdraw(false);

//=============================
// Withdraw
//=============================

const storeWithdraw = async ()=>{
  handleClose()
  http.post('receptionist/withdraw/store',{amount:amount,user_id:dataRow.users_id,payment_id:dataRow.payment_id,description:'dsadda'}).then((res)=>{
    const data=res.data;
    
    toast.success(data.success)
    loadData(); 
    

  }).catch(function (error) {
    console.log(error);
    });
 
}

///============================
/// handlePageClick
///=============================

const handlePageClick = async ({ selected }) => {
http.get(`payment/search/${searchTerm === "" ? 'null' : searchTerm}?page=${selected+1}`).then((res)=>{
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


    return (
    
<Fragment>
<HeaderRecep />
<div className="container-fluid">
    
<Col md="12" lang="ar" style={{padding:'10px'}} >

       
<div className="card" style={{   textAlign: 'right' ,height: '500px' ,fontSize: "10px",background: 'white', marginTop:'15px', border: 'none',boxShadow: 'none'}}>
          <div className="card-header" style={{background: 'white'}} dir="rtl">
           <div className="row">
           
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
<div className="col-md-2">
           </div>


           </div>
        

         </div>
         <div className="card-body" style={{ textAlign: 'center' ,fontSize: "16px", 
                         width: "100%",
                         height : "100%",
                         padding: "0"
                         }}>
              
              
         <Table style={{fontSize: "16px", 
                    width: "100%"
                    }}>
   <thead style={{background: "#2980b9" , 
   }}>
     <tr>
       <th style={{ width: "20%" }}></th>
       <th style={{ width: "10%" }}>المتبقي</th>
       <th style={{ width: "10%" }}>المدفوع</th>
       <th style={{ width: "10%" }}>سعرالمادة</th>
       <th style={{ width: "10%" }}>المادة</th>
       <th style={{ width: "20%" }}>الاسم</th>
       <th style={{ width: "20%" }}>تاريخ الدفع</th>
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
{/* 
           <Link to="/RecordStudent/Receipt">
        <button>Show</button>
                </Link> */}
                
               {/* <button className="btn btn primary" onClick={() => Receipt(data)}>الدفع</button> */}
                        
               <div class="d-flex justify-content-between g-0">
                   <button class="btn btn-primary" onClick={() => openModal(data)} disabled={data.students[0].remaining_balance == 0}>الدفع</button>
                   <button class="btn btn-secondary" onClick={() => openModalWithdraw(data)} disabled={data.students[0].subscribes_state == 4}> سحب المبلغ</button>
               </div>
         </td>
           <td>{data.students[0].remaining_balance}</td>
           <td>{data.students[0].total_credit}</td>
           <td>{data.students[0].payment_amount}</td>
           <td>{data.students[0].subject_name}</td>
           <td>{data.students[0].student_name}</td>
           <td>{data.students[0].payment_date}</td>
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
               <div className="col-md-6">اضافة إشتراك</div>
               <div className="col-md-6">
               <AiIcons.AiOutlineClose onClick={closeModal} /></div>

           </div>

     </div>
     <div class="card-body">

     <div className="row">
                        <div className="col-md-6">
                              <div className="form-group mt-2">
                                       <label> المبلغ</label>
                                       <input type="text" className="form-control" 
                                           onChange={e=>setDebit(e.target.value)}
                                       id="first_name" />
                              </div>   
                        </div>
                        <div className="col-md-6">
                            
                        </div>
                    </div>
           
     </div>
     <div class="card-footer text-muted">
          <a href="#" onClick={storereceipt} class="btn btn-primary">حفظ</a> 
     </div>
   </div>


</ReactModal> 


<ReactModal isOpen={modalIsOpenWithdraw}
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
               <div className="col-md-6"> سحب المبلغ</div>
               <div className="col-md-6">
               <AiIcons.AiOutlineClose onClick={closeModalWithdraw} /></div>

           </div>

     </div>
     <div class="card-body">

     <div className="row">
                        <div className="col-md-6">
                              <div className="form-group mt-2">
                                       <label> المبلغ</label>
                                       <input type="text" className="form-control" 
                                           onChange={e=>setAmount(e.target.value)}
                                       id="first_name" />
                              </div>   
                        </div>
                        <div className="col-md-6">
                            
                        </div>
                    </div>
           
     </div>
     <div class="card-footer text-muted">
          <a href="#"onClick={handleShow} class="btn btn-primary">حفظ</a> 
     </div>
   </div>


</ReactModal> 

<Modal show={show} onHide={handleClose}>
  <Modal.Header closeButton>
    <Modal.Title>تأكيد السحب</Modal.Title>
  </Modal.Header>
  <Modal.Body>هل أنت متأكد من رغبتك في اتمام العملية ؟</Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleClose}>
      إغلاق
    </Button>
    <Button variant="danger" onClick={storeWithdraw}>
      تأكيد
    </Button>
  </Modal.Footer>
</Modal>


<ToastContainer/>




</div>  
</Fragment>
 
 );
};

export default GetPayment;