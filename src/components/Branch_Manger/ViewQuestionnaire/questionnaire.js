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



export default function GetQuestionner () {

  const {http} = AuthUser();
  const [full_name_ar ,setfull_name_ar] = useState("");
  const [full_name_en ,setfull_name_en] = useState("");
  const [mother_name ,setmothername] = useState("");
  const [address, setaddress] = useState("");
  const [first_subj, setfirstsubj] = useState("");
  const [secound_subj, setsecoundsubj] = useState("");
  const [third_subj, setthirdsubj] = useState("");
  const [first_time, setfirsttime] = useState("");
  const [secound_time, setsecoundtime] = useState("");
  const [third_time, setthirdtime] = useState("");
  const [poll_date, setpolldate] = useState("");
  const [phone_numb, setphone_numb] = useState("");
  const [whatsapp_numb, setwhatsapp_numb] = useState("");
  const [notice, setnotice] = useState("");
  const [branch_id,setBranchId] =useState();
    const [Branches,setbranches] = useState([]);
 
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setpageCount] = useState(0);
 
  const [editing, setEditing] = useState(false);
  const [editedItem, setEditedItem] = useState({});
  
  
  
  



  

///============================
/// Delete
///=============================

  const Delete= async (id) =>{
    
       http.post(`poll/destroy/${id}`).then((res)=>{
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
    http.get(`poll/search_by_branch/${searchTerm === "" ? 'null' : searchTerm}?page=1`).then((res)=>{
      setData(res.data.data.data);
      console.log(res);
      setpageCount(res.data.data.total/res.data.data.data.length);
     }).catch(function (error) {
  
     });
};
///============================
/// handlePageClick
///=============================

const handlePageClick = async ({ selected }) => {
http.get(`poll/search_by_branch/${searchTerm === "" ? 'null' : searchTerm}?page=${selected+1}`).then((res)=>{
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
  http.post(`poll/update/${editedItem.id}`,editedItem).catch(function (error) {
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
            <th style={{ width: "10%" }}>الفرع</th>
            <th style={{ width: "10%" }}>ملاحظات  </th>
            <th style={{ width: "10%" }}> التاريخ  </th>
            <th style={{ width: "10%" }}>جوال </th>
            <th style={{ width: "10%" }}> واتساب  </th>
            <th style={{ width: "10%" }}>العنوان  </th>
            
           
            <th style={{ width: "10%" }}>الدورة 3  </th>
            <th style={{ width: "10%" }}>وقت الدورة3    </th>
            <th style={{ width: "10%" }}>الدورة 2  </th>
            <th style={{ width: "10%" }}> وقت الدورة2 </th>
            <th style={{ width: "10%" }}>الدورة 1</th>
            <th style={{ width: "10%" }}>وقت الدورة 1 </th>
            <th style={{ width: "10%" }}>اسم الأم </th>
            <th style={{ width: "10%" }}>الاسم  عربي</th>
            <th style={{ width: "10%" }}>الاسم انكليزي </th>
        
         
       
           
           
            
        
 
 
 
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
             
               
                <td>{editing && editedItem.id === data.id ? <input type="number" name="branch_id" value={editedItem.branch_id} onChange={handleInputChange} /> : data.branch_id}</td>
                <td>{editing && editedItem.id === data.id ? <input type="text" name="notice" value={editedItem.notice} onChange={handleInputChange} /> : data.notice}</td>

                <td>{editing && editedItem.id === data.id ? <input type="date" name="poll_date" value={editedItem.poll_date} onChange={handleInputChange} /> : data.poll_date}</td>

                <td>{editing && editedItem.id === data.id ? <input type="number" name="phone_numb" value={editedItem.phone_numb} onChange={handleInputChange} /> : data.phone_numb}</td>

                <td>{editing && editedItem.id === data.id ? <input type="number" name="whatsapp_numb" value={editedItem.whatsapp_numb} onChange={handleInputChange} /> : data.whatsapp_numb}</td>

                <td>{editing && editedItem.id === data.id ? <input type="text" name="address" value={editedItem.address} onChange={handleInputChange} /> : data.address}</td>

                <td>{editing && editedItem.id === data.id ? <input type="text" name="third_subj" value={editedItem.third_subj} onChange={handleInputChange} /> : data.subjectName}</td>

                <td>{editing && editedItem.id === data.id ? <input type="text" name="third_time" value={editedItem.third_time} onChange={handleInputChange} /> : data.third_time}</td>

                <td>{editing && editedItem.id === data.id ? <input type="text" name="secound_subj" value={editedItem.secound_subj} onChange={handleInputChange} /> : data.subjectName}</td>

                <td>{editing && editedItem.id === data.id ? <input type="text" name="secound_time" value={editedItem.secound_time} onChange={handleInputChange} /> : data.secound_time}</td>

                <td>{editing && editedItem.id === data.id ? <input type="text" name="first_subj" value={editedItem.first_subj} onChange={handleInputChange} /> : data.subjectName}</td>

                <td>{editing && editedItem.id === data.id ? <input type="text" name="first_time" value={editedItem.first_time} onChange={handleInputChange} /> : data.first_time}</td>

                <td>{editing && editedItem.id === data.id ? <input type="text" name="mother_name" value={editedItem.mother_name} onChange={handleInputChange} /> : data.mother_name}</td>

                <td>{editing && editedItem.id === data.id ? <input type="text" name="full_name_ar" value={editedItem.full_name_ar} onChange={handleInputChange} /> : data.full_name_ar}</td>

                <td>{editing && editedItem.id === data.id ? <input type="text" name="full_name_en" value={editedItem.full_name_en} onChange={handleInputChange} /> : data.full_name_en}</td>
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





