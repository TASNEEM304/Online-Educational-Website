import React ,{Fragment,useEffect,useState} from "react";
import { Container, Row, Col,Table,Button ,Form} from "reactstrap";
import Header from "../../HeaderSiectAff";
import ReactPaginate from 'react-paginate';
import axios from 'axios'
import ReactModal from 'react-modal';
import * as AiIcons from "react-icons/ai";
import AuthUser from  '../../../Auth/AuthUser';

export const GetQuestionBank = () => {

  const {http} = AuthUser();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [course_id ,setcourseid] = useState("");
  const [model ,setmodel] = useState("");
  const [file ,setfile] = useState(null);
  const [branch_id ,setbranchid] = useState("");
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setpageCount] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [Branches,setbranches] = useState([]);
  const [Courses,setcourses] = useState([]);
  
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  
  
///============================
/// store
///=============================
const store = async (event) => {
  event.preventDefault();

  const formData = new FormData();
 
  formData.append("course_id", course_id);
  formData.append("model", model);
  formData.append("file", file);
  formData.append("branch_id", branch_id);

  try {
    const response = await axios.post("http://localhost:8000/api/qbank/store", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Service added successfully", response.data);
  } catch (error) {
    console.error("Error adding service", error);
  }
 // GetQuestionBank();
  closeModal();
};


///============================
/// Delete
///=============================

  const Delete= async (id) =>{
    
       http.post(`qbank/destroy/${id}`).then((res)=>{
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
    http.get(`qbank/search/${searchTerm === "" ? 'null' : searchTerm}?page=1`).then((res)=>{
      setData(res.data.data.data);
      setpageCount(res.data.data.total/res.data.data.data.length);
     }).catch(function (error) {
  
     });
  
   
};









///============================
/// handlePageClick
///=============================

const handlePageClick = async ({ selected }) => {
http.get(`qbank/search/${searchTerm === "" ? 'null' : searchTerm}?page=${selected+1}`).then((res)=>{
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
  http.post(`qbank/update/${editedItem.id}`,editedItem).catch(function (error) {
  console.log(error);
});
}


  const [editing, setEditing] = useState(false);
  const [editedItem, setEditedItem] = useState({});

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

  useEffect(()=>{
    Getbranches()
    },[])
    
    const Getbranches = async ()=>{
    http.get('branch/index').then((res)=>{
     setbranches(res.data.data.data);
    });
    }


    useEffect(()=>{
      GetCourses()
      },[])
      
      const GetCourses = async ()=>{
      http.get('course/index').then((res)=>{
       setcourses(res.data.data.data);
      });
      }
  
  return (
<Fragment>
<Header />

{/* <div className="container-fluid"></div> */}
 
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
    placeholder=" بحث....   "
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
<Button variant="success"  onClick={openModal} style={{  background :  "linear-gradient(to left, #2980b9, #2c3e50)" , borderColor: 'blue' }}>أضف  نموذج اسئلة 

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
            <th style={{ width: "30%" }}> الفرع</th>
            <th style={{ width: "30%" }}>ملف الاسئلة  </th>
            <th style={{ width: "30%" }}> النموذج</th>
            <th style={{ width: "30%" }}> الدورة</th>
        
           
            <th></th>
                   
                              
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={3} className="text-center">
                No Data
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
                <td>{editing && editedItem.id === data.id ? <input type="number" name="branch_id" value={editedItem.branch_id} onChange={handleInputChange} /> : data.number_of_lessons}</td>
                <td>{editing && editedItem.id === data.id ? <input type="file" name="file" value={editedItem.file} onChange={handleInputChange} /> : data.file}</td>
                <td>{editing && editedItem.id === data.id ? <input type="text" name="model" value={editedItem.model} onChange={handleInputChange} /> : data.model}</td>
                <td>{editing && editedItem.id === data.id ? <input type="number" name="course_id" value={editedItem.course_id} onChange={handleInputChange} /> : data.course_id}</td>
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
               <div className="col-md-6">سجل جديد </div>
               <div className="col-md-6">
               <AiIcons.AiOutlineClose onClick={closeModal} /></div>

           </div>

     </div>
     <div class="card-body">

     <div lang="ar" className="row">
         
         <div className="col-md-6">
               <div className="form-group mt-2">
               <label>الفرع </label>
             
                                        <select  onChange={(e)=>setbranches(e.target.value)}>
                                                   <option value="">--Please select an option--</option>
                                                   {Branches.map(option => (
                                                     <option key={option.id} value={option.id} >{option.name}</option>
                                                   ))}
                                           </select>                
              
               </div>   
         </div>
         <div className="col-md-6">
                <div className="form-group mt-2">
                <label>ملف الأسئلة </label>
                           <input className='form-control'  type="file" onChange={(event) => setfile(event.target.files[0])} />

                </div>
         </div>

        

         <div className="col-md-6">
               <div className="form-group mt-2">
               <label>النموذج </label>
                <input
           value={model} className='form-control'
           onChange = {(e)=> setmodel(e.target.value)}
          
            />              
               </div>   
         </div>


         <div className="col-md-6">
                <div className="form-group mt-2">
                <label>الدورة </label>
                <select  onChange={(e)=>setcourses(e.target.value)}>
                                                   <option value="">--Please select an option--</option>
                                                   {Courses.map(option => (
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






</div>  
</Fragment>
    
  );
};





