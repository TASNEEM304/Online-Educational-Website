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



export default function GetQuestionBankview () {

  const {http} = AuthUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [course_id ,setCourse_Id] = useState("");
  const [model ,setmodel] = useState("");
  const [file ,setfile] = useState(null);
  const [branch_id ,setbranchid] = useState("");
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setpageCount] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [Branches,setbranches] = useState([]);
  const [Courses,setCourse] = useState([]);
 
  const [editing, setEditing] = useState(false);
  const [editedItem, setEditedItem] = useState({});
  
  
  
  



  
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
 http.get(`qbank/search_by_branch/${searchTerm === "" ? 'null' : searchTerm}?page=1`).then((res)=>{
   setData(res.data.data.data);
   setpageCount(res.data.data.total/res.data.data.data.length);
  }).catch(function (error) {

  });


};









///============================
/// handlePageClick
///=============================

const handlePageClick = async ({ selected }) => {
http.get(`qbank/search_by_branch/${searchTerm === "" ? 'null' : searchTerm}?page=${selected+1}`).then((res)=>{
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
   Getcourse()
},[])

const Getcourse = async ()=>{
http.get('course/indexa').then((res)=>{
   setCourse(res.data.data);
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
    placeholder="بحث...    "
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
            <th style={{ width: "30%" }}>ملف الاسئلة  </th>
            <th style={{ width: "30%" }}> النموذج</th>
            <th style={{ width: "30%" }}> الدورة</th>
        
         
       
           
           
            
        
 
 
 
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

        
                   
              </td>
                <td>{editing && editedItem.id === data.id ? <input type="file" name="file" value={editedItem.file} onChange={handleInputChange} /> : data.file}</td>
                <td>{editing && editedItem.id === data.id ? <input type="text" name="model" value={editedItem.model} onChange={handleInputChange} /> : data.model}</td>
                <td>{editing && editedItem.id === data.id ? <input type="number" name="course_id" value={editedItem.course_id} onChange={handleInputChange} /> : data.subjectName}</td>
         
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
      </div>







</div>  
</Fragment>
    
  );
};





