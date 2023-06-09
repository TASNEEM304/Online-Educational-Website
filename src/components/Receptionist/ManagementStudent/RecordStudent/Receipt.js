import React ,{Fragment,useEffect,useState} from "react";
import { Container, Row, Col,Table,Button ,Form} from "reactstrap";
import HeaderRecep from "../../HeaderRecep";
import {useNavigate,useLocation,Link,useHistory}  from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import ReactModal from 'react-modal';
import * as AiIcons from "react-icons/ai";
import AuthUser from  '../../../Auth/AuthUser';
import "./Style.css";

function GetReceipt () {


    const {http} = AuthUser();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [Cards,setCards] = useState([]);
    const [Course,setCourse] = useState([]);
    const [card_id,setCards_Id] = useState();
    const [editing, setEditing] = useState(false);
    const [editedItem, setEditedItem] = useState({});
    const [searchTerm, setSearchTerm] = useState("");
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageCount, setpageCount] = useState(0);  
    const history = useNavigate();
    

    const [Debit,setDebit] = useState();
    
    const location = useLocation();
    const dataRow = location.state.data;
    //console.log(dataRow);
///============================
/// Modal
///=============================

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

///============================
/// store
///=============================
const store = () =>{
      
    http.post('receptionist/receipt/store',{Debit:Debit,user_id:dataRow.user_id,subscription_id:dataRow.id,description:'dsadda'}).then((res)=>{
      const data=res.data;
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
http.get(`receptionist/receipt/indexing/${dataRow.id}`).then((res)=>{
setData(res.data.data.data);
setpageCount(res.data.data.total/res.data.data.data.length);
}).catch(function (error) {

});
};    


///============================
/// handlePageClick
///=============================

const handlePageClick = async ({ selected }) => {
http.get(`user/search/${searchTerm === "" ? 'null' : searchTerm}?roll_number=5&page=${selected+1}`).then((res)=>{
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


    return (
    
<Fragment>
<HeaderRecep />
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
<div className="col-md-6">
<Button variant="success"  onClick={openModal} style={{  background :  "linear-gradient(to left, #2980b9, #2c3e50)" , borderColor: 'blue' }}>أضف فرع جديد

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
       <th style={{ width: "20%" }}>حالة الاشتراك</th>
       <th style={{ width: "20%" }}>سعرالمادة</th>
       <th style={{ width: "10%" }}>المادة</th>
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
         </td>
           <td>{data.state}</td>
           <td>{data.price}</td>
           <td>{data.subjectName}</td>
           <td>{data.first_name+" "+data.last_name}</td>
           <td>{data.no}</td>
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
                                        <label>:الطالب</label>

                                        <select  onChange={(e)=>setCards_Id(e.target.value)}>
                                                   <option value="">--Please select an option--</option>
                                                   {Cards.map(option => (
                                                     <option key={option.id} value={option.id} >{option.first_name+" "+option.last_name}</option>
                                                   ))}
                                           </select>
                                </div>
                        </div>

                        
                    <div className="col-md-6">
                    <div className="form-group mt-2">
                                       <label>Email address:</label>
                                       <input type="integer" className="form-control" placeholder="Enter Debit"
                                           onChange={e=>setDebit(e.target.value)}
                                       id="Debit" />
                                </div>
                        </div>
                    
                    </div>
           
     </div>
     <div class="card-footer text-muted">
          <a href="#" onClick={store} class="btn btn-primary">حفظ</a> 
     </div>
   </div>


</ReactModal> 






</div>  
</Fragment>
 
 );
};

export default GetReceipt;