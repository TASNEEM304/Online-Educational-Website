import React ,{Fragment,useEffect,useState} from "react";
import { Container, Row, Col,Table,Button ,Form} from "reactstrap";
import Header from "./Header";
import ReactPaginate from 'react-paginate';
import axios from 'axios'
import ReactModal from 'react-modal';
import * as AiIcons from "react-icons/ai";
import AuthUser from  '../Auth/AuthUser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';
import Validate from "./Validate";


const Getbranches = () => {

  const {http} = AuthUser();
  const [No ,setNo] = useState(0);
  const [name ,setName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setpageCount] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editedItem, setEditedItem] = useState({});
  const[errors,setErorrs]=useState({});
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  
  const schema = Yup.object().shape({
    No: Yup.number().required(),
    name: Yup.string().required(),
  });
///============================
/// store
///=============================
// const store = () =>{
//   schema.validate({ No, name }).then(() => {
      
//   http.post('branch/store',{No:No,name:name}).then((res)=>{
//     const data=res.data;
//     toast.success("تمت العملية بنجاح")
//   //alert("تمت العملية بنجاح ")
   
//   }).catch(function (error) {
//     toast.error("error")
//     });
 
//     setNo('');
//     setName('');
//     closeModal();
//     loadData();
// }


const store = (event) => {
//event.perventDefault();
setErorrs(Validate(data));
  schema.validate({ No, name }).then(() => {
    
    http.post('branch/store', { No, name })
      .then((res) => {
        const data = res.data;
        toast.success('تمت العملية بنجاح');
        setNo('');
        setName('');
        closeModal();
        loadData();
      })
      .catch(function (error) {
        toast.error('error');
      });
  }).catch((err) => {
    toast.error("اكمل تعبئة الحقول ");
    
  });
};
  

///============================
/// Delete
///=============================

  const Delete= async (id) =>{
    
       http.post(`general_admin/branch/destroy/${id}`).then((res)=>{
        alert(res.data.message);
        loadData();
        
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
    http.get(`general_admin/branch/search/${searchTerm === "" ? 'null' : searchTerm}?page=1`).then((res)=>{
      setData(res.data.data.data);
      setpageCount(res.data.data.total/res.data.data.data.length);
     }).catch(function (error) {
  
     });
};
///============================
/// handlePageClick
///=============================

const handlePageClick = async ({ selected }) => {
http.get(`general_admin/branch/search/${searchTerm === "" ? 'null' : searchTerm}?page=${selected+1}`).then((res)=>{
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
  http.post(`general_admin/branch/update/${editedItem.id}`,editedItem).catch(function (error) {
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
  }

  

  return (
<Fragment>
<Header />

<Container>


   <Row>
    
     <Col lg="12" lang="ar">

       
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
        <thead style={{background: " linear-gradient(to left, #2980b9, #2c3e50)" , 
        }}>
          <tr >
            <th style={{ width: "20%" }}></th>
            <th style={{ width: "50%" }}>الاسم</th>
            <th style={{ width: "30%" }}>الرقم</th>
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
                   
              </td>
                <td>{editing && editedItem.id === data.id ? <input type="text" name="name" value={editedItem.name} onChange={handleInputChange} /> : data.name}</td>
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

     
   </Row>

    
      </Container>

      <div>


<form onSubmit={store}>
<ReactModal isOpen={modalIsOpen}
style={{
 overlay: {
   backgroundColor: 'rgba(0, 0, 0, 0.5)',
   zIndex: 9999,
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center'
 },
 content: {
   width: '800px',
   height: 'auto',
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   borderRadius: '10px',
   background: '#fff',
   boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)',
   padding: 0,
   paddingTop :0,
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center'
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
     <div class="card-body">

     <div lang="ar" className="row">
         
         <div className="col-md-6">
               <div className="form-group mt-2">
                        <label>:الرقم</label>
                        <input type='number' 
                               className='form-control' 
                               placeholder='ادخل رقم الفرع'
                               Value={No} 
                               onChange={(e)=>setNo(e.target.value)}
                               />
                                {errors.No && <span style={{color:"red"}}>{errors.No}</span>}
               </div>   
         </div>
         <div className="col-md-6">
                <div className="form-group mt-2">
                        <label>:الأسم</label>
                        
                       <input type='text' 
                        className='form-control' 
                        placeholder='ادخل اسم الفرع'
                        Value={name} 
                        onChange={(e)=>setName(e.target.value)}
                        />
                         {errors.name && <span style={{color:"red"}}>{errors.name}</span>}
                </div>
         </div>
 </div>
           
     </div>
     <div class="card-footer text-muted">

          <a href="#" onClick={store} class="btn btn-primary">حفظ</a> 
       
     </div>
   </div>



</ReactModal> 
</form>
<ToastContainer/>




</div>  
</Fragment>
    
  );
};

export default Getbranches;



