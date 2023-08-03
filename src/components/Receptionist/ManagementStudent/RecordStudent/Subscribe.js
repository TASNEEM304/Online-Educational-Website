import React ,{Fragment,useEffect,useState} from "react";
import { Container, Row, Col,Table,Button ,Form} from "reactstrap";
import HeaderRecep from "../../HeaderRecep";
import {useNavigate,Link,useHistory}  from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import ReactModal from 'react-modal';
import * as AiIcons from "react-icons/ai";
import Select from "react-select";
import AuthUser from  '../../../Auth/AuthUser';
import "./Style.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function GetSubscribe () {


    const {http} = AuthUser();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [Cards,setCards] = useState([]);
    const [Course,setCourse] = useState([]);
    const [card_id,setCards_Id] = useState();
    const [course_id,setCourse_Id] = useState();
    const [editing, setEditing] = useState(false);
    const [editedItem, setEditedItem] = useState({});
    const [searchTerm, setSearchTerm] = useState("");
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageCount, setpageCount] = useState(0);  
    const history = useNavigate();
    const options = [
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana' },
      { value: 'orange', label: 'Orange' },
      { value: 'grape', label: 'Grape' }
    ]; 
    const [selectedOption, setSelectedOption] = useState(null);
    const handleSelectChange = (selectedOption) => {
      setSelectedOption(selectedOption);
    };
   
    const NewDate=new Date();
    const [start_date, setFirstdate] =useState(new Date(NewDate.getFullYear(), NewDate.getMonth() - 1, NewDate.getDate()).toISOString().substr(0, 10));// useState(NewDate.toISOString().substr(0, 10));
    const [end_date, setEnddate] = useState(new Date(NewDate.getFullYear(), NewDate.getMonth() + 1, NewDate.getDate()).toISOString().substr(0, 10));

    
    
//=============================
// GetCards
//=============================
useEffect(()=>{
  GetCards()
  
},[])

const GetCards = async ()=>{
http.get('receptionist/card/index').then((res)=>{
  setCards(res.data.data);
  console.log(Cards);
});
}

///============================
/// Modal
///=============================

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

///============================
/// store
///=============================
const store = () =>{
      
    http.post('receptionist/store',{course_id:course_id, card_id:card_id}).then((res)=>{
      const data=res.data;
      setpageCount(0);
      loadData();
      toast.success("تمت العملية بنجاح")
    }).catch(function (error) {
      console.log(error);
      });
      
    closeModal();
    loadData();
   
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
http.get(`receptionist/searchDate/${searchTerm}?page=1&start_date=${start_date}&end_date=${end_date}`).then((res)=>{

setData(res.data.data.data);
setpageCount(res.data.data.total/res.data.data.data.length);
}).catch(function (error) {

});
};    


//=============================
// GetCards
//=============================

const payment = async (data)=>{
  debugger
http.post(`receptionist/payment/store/${data}`).then((res)=>{
  
  toast.success(res.data.message)
  loadData();
  //setCards(res.data.data);
});
}

///============================
/// Delete
///=============================





//=============================
// GetCards
//=============================
useEffect(()=>{
    Getcourse()
},[])

const Getcourse = async ()=>{
http.get('branch_admin/course/indexAvailable').then((res)=>{
    setCourse(res.data.data);
});
}

///============================
/// handlePageClick
///=============================

const handlePageClick = async ({ selected }) => {
http.get(`receptionist/searchDate/${searchTerm}?page=${selected+1}&start_date=${start_date}&end_date=${end_date}`).then((res)=>{
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


//=============================
// GetCards
//=============================

const Receipt = async (data)=>{
  // console.log(data);
    history('/RecordStudent/Receipt' , { state : { data } });
}
    return (
    
<Fragment>
<HeaderRecep />
<div className="container-fluid">
    
<Col md="12" lang="ar" style={{padding:'10px'}} >

       
<div className="card" style={{   textAlign: 'right' ,height: '500px' ,fontSize: "10px",background: 'white', marginTop:'15px', border: 'none',boxShadow: 'none'}}>
<div className="card-header" style={{background: 'white'}} dir="rtl">
                
                <div className="row">
                

<div className="col-lg-3">
<div className="input-group mb-4" style={{ fontSize:'20px',alignItems:"center" }}>
  
  <label>من تاريخ:</label>
                          <input type="date" className="form-control" placeholder="Enter birth_day"
                              onChange={e=>setFirstdate(e.target.value)}
                              
  value={start_date}
                          id="start_date" />
  
                  </div>
</div>
<div className="col-lg-3">
  
<div className="input-group mb-4" style={{ fontSize:'20px',alignItems:"center" }}>
  
  <label>الى تاريخ:</label>
                          <input type="date" className="form-control" placeholder="Enter birth_day"
                              onChange={e=>setEnddate(e.target.value)}
                              
  value={end_date}
                          id="birth_day" />
  
                  </div>
</div>
<div className="col-lg-4">

                <div className="input-group mb-4">
  <input
    type="text"
    className="form-control"
    placeholder="إبحث عن التاريخ"
    value={searchTerm}
    onChange={handleSearchChange}
    style={{ borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderBottom: '1px solid #ccc' }}
  />
  {/* <div className="input-group-append">
    <span className="input-group-text">
      <AiIcons.AiOutlineSearch onClick={handleSearchClick} style={{ fontSize:'30px',alignItems:"center" }} />
    </span> 
  </div>*/}
</div>


</div>

<div className="col-lg-2">
<div class="d-flex justify-content-between g-1">
  <button class="btn btn-primary" onClick={handleSearchClick}>بحث</button>
  <button class="btn btn-secondary" onClick={handleSearchClick}>تفريغ</button>
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
   <thead>
     <tr >
       <th style={{ width: "10%" }}></th>
       <th style={{ width: "20%" }}>حالة الاشتراك</th>
       <th style={{ width: "10%" }}>المادة</th>
       <th style={{ width: "10%" }}>الاسم</th>
       <th style={{ width: "10%" }}>تاريخ الإشتراك</th>
     </tr>
   </thead>
   <tbody>
     {data.length === 0 ? (
       <tr>
         <td colSpan={6} className="text-center">
           
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
        {/* <button className="btn btn primary"  onClick={() => payment(data.id)} disabled={data.state != 1}>انشاء فاتورة</button>
        <button className="btn btn primary" onClick={() => Receipt(data)} disabled={data.state == 1}>التفاصيل</button> */}
        <div class="d-flex justify-content-between g-1">
  <button class="btn btn-primary" onClick={() => payment(data.id)} disabled={data.state != 1} >إنشاء إيصال</button>
  {/* <button class="btn btn-secondary" onClick={handleSearchClick}>تفريغ</button> */}
</div>
        {/* <a href="#" onClick={() => payment(data.id)} disabled={data.state != 1} className="btn btn-primary">انشاء فاتورة</a>
        <a href="#" onClick={() => Receipt(data)} className="btn btn-primary">الدفع</a> */}
         </td>
           <td>{data.state === 1 ? 'قيد الإشتراك' : data.state === 2 ? 'اشتراك مبدأي' : data.state === 3 ? 'الإشتراك ملغى':'انتهاء الإشتراك' }</td>
           <td>{data.subjectName}</td>
           <td>{data.first_name+" "+data.last_name}</td>
           <td>{data.date}</td>
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
                      
                           
                      <AiIcons.AiFillPlusCircle onClick={openModal} style={{ fontSize:'60px', color:'#5b5ac9' ,
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
               <div className="col-md-6">اضافة إشتراك</div>
               <div className="col-md-6">
               <AiIcons.AiOutlineClose onClick={closeModal} /></div>

           </div>

     </div>
     <div class="card-body" dir="rtl">

                    <div className="row">

                        <div className="col-md-6">
                                <div className="form-group mt-2">
                                        <label>الطالب:</label>
                                        {/* <Select
      value={selectedOption}
      onChange={handleSelectChange}
      options={Cards}
      isSearchable={true}
    /> */}
                                        <select  onChange={(e)=>setCards_Id(e.target.value)}>
                                                   <option value=""> اختر طالب  </option>
                                                   
                                                   {Cards != null ? Cards.map(option => (
                                                     <option key={option.CardId} value={option.CardId} >{option.first_name+" "+option.last_name}</option>
                                                   )) : null}
                                           </select>
                                </div>
                        </div>

                        
                    <div className="col-md-6">
                                <div className="form-group mt-2">
                                        <label>الكورس:</label>
                                        <select  onChange={(e)=>setCourse_Id(e.target.value)}>
                                                   <option value="">اختر الكورس</option>
                                                   { Course !=null ? Course.map(option => (
                                                     <option key={option.id} value={option.id} >{option.subjectName}</option>
                                                   )):null}
                                           </select>
                                </div>
                        </div>
                    
                    </div>
           
     </div>
     <div class="card-footer text-muted">
          <a href="#" onClick={store} className="btn btn-primary">حفظ</a> 
     </div>
   </div>


</ReactModal> 





<ToastContainer/>



</div>  
</Fragment>
 
 );
};

export default GetSubscribe;