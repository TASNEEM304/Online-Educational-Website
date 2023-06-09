import React,{useEffect,useState,Fragment} from 'react'
import axios from 'axios'

import { Container, Row, Col,Table,Button ,Form} from "reactstrap";
import HeaderSiectAff from "../../HeaderSiectAff" ;
import ReactPaginate from 'react-paginate';


import ReactModal from 'react-modal';
import * as AiIcons from "react-icons/ai";
import AuthUser from  '../../../Auth/AuthUser';

 //const endpoint = 'http://localhost:8000/api/branch/store'

export const GetQuestionBank= () => {

  const {http} = AuthUser();
 const [searchTerm, setSearchTerm] = useState('');
 const [course_id ,setcourseid] = useState("");
  const [model ,setmodel] = useState("");
  const [file ,setfile] = useState(null);
  const [branch_id ,setbranchid] = useState("");
  
 const pageCount = 20;

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
 //GetSubjects();
 closeModal();
};
const Delete= async (id) =>{
    
  http.post(`qbank/destroy/${id}`).then((res)=>{
   alert(res.data.message);
   //loadData();
})

}

const handleFileChange = (event) => {
 if (event.target.files) {
   setfile(event.target.files[0]);
 }
};

useEffect(() => {
  const loadData = async () => {
    http.get(`subject/index?page=1`).then((res)=>{
      setData(res.data.data.data);
      setCurrentPage(1);
     }).catch(function (error) {

     }); 
  };

  loadData();
}, []);


// const [Branches,setbranches] = useState([])
// useEffect(()=>{
//     Getbranches()
//   },[])
// const Getbranches = async ()=>{
//   http.get(`branch/index?page=1`).then((res)=>{
//      setbranches(res.data.data);
    
    
//   });
// }
const [Courses,setCourses] = useState([])
useEffect(()=>{
    GetCourses()
  },[])
const GetCourses = async ()=>{
  http.get(`course/index?page=1`).then((res)=>{
     setCourses(res.data.data);
    
    
  });
}






const [modalIsOpen, setModalIsOpen] = useState(false);

const openModal = () => setModalIsOpen(true);
const closeModal = () => setModalIsOpen(false);


const [data, setData] = useState([]);
const [currentPage, setCurrentPage] = useState(1);



const handlePageClick = async ({ selected }) => {
  http.get(`qbank/index?page=${selected}`).then((res)=>{
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
  setCurrentPage(1); // reset page number when search term changes
};
const handleSearchClick = () => {
  console.log('Search term:', searchTerm);
  // your code to perform the search goes here
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


return (


 <Fragment>
<HeaderSiectAff />
<section>
     <Container>
     <div className="container mt-4">
      <div className="row">
      <div className="col-md-6">

          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          
      <button className="btn btn-primary" type="button" onClick={() => console.log('Search term:', searchTerm)}>بحث</button>
      </div>
      </div>
      </div>
      </div>
  
     
  <Row>
    <Col lg="12" md="6" lang="ar" style={{marginTop:"10px" ,   textAlign: 'right'}}>

     
     <Button variant="success" onClick={openModal} style={{fontSize: "10px", 
                        width: "15%",height:"25%"
                        }}> سجل جديد
                       
                        </Button>
                        
                        <br/>
     <Table striped bordered hover  style={{fontSize: "16px", 
                        width: "100%"
                        }}>
       <thead style={{background:"#ece24c",
       }}>
        <tr>
                   
                   <th ></th>
                   <th >الدورة</th>
                   <th >النموذج</th>
                               
                              
                 <th>ملف الأسئلة</th>
                  <th>الفرع</th>
              <th>اسم المادة</th>
                  
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
                {/* <td style={{width:"20%"}}> */}
  
  
                {/* <AiIcons.AiFillDelete onClick={() => Delete(data.id)} style={{ color: 'red' , width : '10%' , height: '10%' ,alignItems:"center" }} /> */}
                             
                  {/* <Button variant="danger" onClick={() => Delete(data.id)}>حذف</Button> */}
                  {/* <Button variant="primary" href={`/Branches/edit/${data.id}`}>تحرير</Button> */}
                {/* </td> */}
                <td>
                {!editing || editedItem.id !== data.id ? (
                  <button onClick={() => handleEditClick(data)}>Edit</button>
                ) : (
                  <>
                    <button onClick={handleSaveClick}>Save</button>
                    <button onClick={handleCancelClick}>Cancel</button>
                  </>
                )}
              </td>
              <td>{editing && editedItem.id === data.id ? <input type="text" name="branch_id" value={editedItem.course_id} onChange={handleInputChange} /> : data.course_id}</td>

                {/* <td style={{width:"50%"}}>{data.name}</td> */}
                <td>{editing && editedItem.id === data.id ? <input type="text" name="model" value={editedItem.model} onChange={handleInputChange} /> : data.model}</td>

                <td>{editing && editedItem.id === data.id ? <input type="text" name="file" value={editedItem.file} onChange={handleInputChange} /> : data.file}</td>
                <td>{editing && editedItem.id === data.id ? <input type="text" name="branch_id" value={editedItem.branch_id} onChange={handleInputChange} /> : data.branch_id}</td>
                <td>{editing && editedItem.id === data.id ? <input type="text" name="name" value={editedItem.name} onChange={handleInputChange} /> : data.name}</td>

              </tr>
            ))
          )}
        </tbody>
      

 
     </Table>
     <div className="App">
      {/* your code to display the data goes here */}
      <ReactPaginate
        previousLabel={'<'}
        nextLabel={'>'}
        breakLabel={'...'}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        pageClassName={'page-item'}
        activeClassName={'active'}
        previousClassName={'page-item'}
        nextClassName={'page-item'}
        breakClassName={'page-item'}
        pageLinkClassName={'page-link'}
        previousLinkClassName={'page-link'}
        nextLinkClassName={'page-link'}
        breakLinkClassName={'page-link'}
        disableInitialCallback={true}
      />
    </div>


     
    </Col>

    
  </Row>

   <div>
        
        <ReactModal isOpen={modalIsOpen} onRequestClose={closeModal} style={{
         content: {
           width: '70%',
           height : '60%',
           position: 'absolute',
           top: '50%',
           left: '50%',
           transform: 'translate(-50%, -50%)'
           
         }}}>
     <AiIcons.AiOutlineClose onClick={closeModal} style={{  width: '5%' , height : '5%' }} />
       <div lang="ar" style={{marginTop:"100px" ,   textAlign: 'right'}}>
       
           
               <div lang="ar" className="row">
                 
                      
                       <div className="col-md-12">
                             




                              <div className="form-group mt-2">
                              <label>الدورة </label>
                <select className='form-control'   onChange={(e)=>setcourseid(e.target.value)}>
         <option value="">الرجاء اختيار الدورة</option>
         {Courses.map(option => (
             <option key={option.id} value={option.id} >{option.name}</option>
                        ))}
            </select>
                             </div>  
                             <div className="form-group mt-2">
                             <label>النموذج </label>
                <input
           value={model} className='form-control'
           onChange = {(e)=> setmodel(e.target.value)}
          
            />   
                             </div>   
                  
                          
                             <div className="form-group mt-2">
                             <label>ملف الأسئلة </label>
                           <input className='form-control'  type="file" onChange={(event) => setfile(event.target.files[0])} />

                             </div>   
                     
                             <div className="form-group mt-2">
                             <label>الفرع </label>
                {/* <select className='form-control'  onChange={(e)=>setbranchid(e.target.value)}>
                                                    <option value="">الرجاء اختيار الفرع</option>
                                                   {Branches.map(option => (
                                                     <option key={option.id} value={option.id} >{option.name}</option>
                                                    ))}
                                            </select>     */}
                             </div>  
                            




                       </div>
               </div>
                   <button type="button" onClick={store} className="btn btn-primary mt-4">حفظ</button>
               
          
       </div>
     </ReactModal> 






      </div>
     </Container>
   </section>
</Fragment>


);

};


