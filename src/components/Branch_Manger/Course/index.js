import React ,{Fragment,useEffect,useState} from "react";
import { Container, Row, Col,Table,Button ,Form} from "reactstrap";
import { useNavigate } from 'react-router-dom';
import AuthUser from  '../../Auth/AuthUser';
import Header from "../HeaderBrcMgr";
import ReactPaginate from 'react-paginate';
import ReactModal from 'react-modal';
import * as AiIcons from "react-icons/ai";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Course() {
    const navigate = useNavigate();
    const {http} = AuthUser();
    const [subject_id,setSubjectId] =useState();
    const [trainer_id,setTrainerId] =useState();
    const [subjects,setSubject] =useState([]);
    const [trainers,setTrainer] =useState([]);
    const [start,setStart] =useState();
    const [end,setEnd] =useState();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [editing, setEditing] = useState(false);
    const [editedItem, setEditedItem] = useState({});
    const [searchTerm, setSearchTerm] = useState("");
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageCount, setpageCount] = useState(0);  

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);


///============================
/// loadData
///=============================
    useEffect(() => {
            loadData();
                   }, []);
   const loadData = async () => {
      debugger
      http.get(`receptionist/course/search/${searchTerm === "" ? 'null' : searchTerm}?page=1`).then((res)=>{
       setData(res.data.data.data);
      

       setpageCount(res.data.data.total/res.data.data.data.length);
      }).catch(function (error) {
   
      });
    };    
//=============================
// store
//=============================
    const store = () =>{
      debugger
      http.post('receptionist/course/store',{subject_id:subject_id,trainer_id:trainer_id,start:start,end:end}).then((res)=>{
        toast.success('تمت العملية بنجاح');

      }).catch(function (error) {
        toast.error("error");
    
        });

        
  setSubjectId('');
  setTrainerId('');
  setStart('');
  setEnd('');
  closeModal();
  loadData();
     
    }

///============================
/// Delete
///=============================

const Delete= async (id) =>{
    
  http.post(`branch/destroy/${id}`).then((res)=>{
   alert(res.data.message);
   loadData();
   
})

}
    
//=============================
// Getbranches
//=============================
      useEffect(()=>{
        GetTrainerId()
      },[])

      const GetTrainerId = async ()=>{
          http.get('trainerProfile/view?roll_number=4').then((res)=>{
            setTrainer(res.data.data);
        });
      }
      useEffect(()=>{
        GetSubjectId()
      },[])
      
      const GetSubjectId = async ()=>{
          http.get('subject/view').then((res)=>{
            setSubject(res.data.data);
        });
      }
///============================
/// handlePageClick
///=============================

const handlePageClick = async ({ selected }) => {
http.get(`receptionist/course/search/${searchTerm === "" ? 'null' : searchTerm}?page=${selected+1}`).then((res)=>{
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
http.post(`course/update/${editedItem.id}`,editedItem).catch(function (error) {
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



    
    
    return(

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
    placeholder="إبحث عن التاريخ"
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
<Button variant="success"  onClick={openModal} style={{  background :  "rgb(19,130,64)"}}>أضف كورس جديد

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
            <th style={{ width: "10%" }}></th>
            <th style={{ width: "10%" }}>الاعتماد</th>
            <th style={{ width: "15%" }}>تاريخ الإنتهاء</th>
            <th style={{ width: "15%" }}>تاريخ البدء</th>
            <th style={{ width: "10%" }}>عدد الجلسات</th>
            <th style={{ width: "10%" }}>عدد الساعات</th>
            <th style={{ width: "10%" }}>التسعير</th>
            <th style={{ width: "15%" }}>اسم المدرب</th>
            <th style={{ width: "15%" }}>اسم المادة</th>
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
                <td>{data.approved === 1 ? 'ليس معتمد' : 'معتمد'}</td>
                <td>{editing && editedItem.id === data.id ? <input type="text" name="name" value={editedItem.name} onChange={handleInputChange} /> : data.end}</td>
                <td>{editing && editedItem.id === data.id ? <input type="text" name="name" value={editedItem.name} onChange={handleInputChange} /> : data.start}</td>
                <td>{editing && editedItem.id === data.id ? <input type="text" name="no" value={editedItem.No} onChange={handleInputChange} /> : data.number_of_lessons}</td>
                <td>{editing && editedItem.id === data.id ? <input type="text" name="name" value={editedItem.name} onChange={handleInputChange} /> : data.houers}</td>
                <td>{editing && editedItem.id === data.id ? <input type="text" name="no" value={editedItem.No} onChange={handleInputChange} /> : data.price}</td>
                <td>{editing && editedItem.id === data.id ? <input type="text" name="name" value={editedItem.name} onChange={handleInputChange} /> : data.first_name+' '+data.last_name}</td>
                <td>{editing && editedItem.id === data.id ? <input type="text" name="name" value={editedItem.No} onChange={handleInputChange} /> : data.subjectName}</td>
    
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
               <div className="col-md-6">اضافة دورة</div>
               <div className="col-md-6">
               <AiIcons.AiOutlineClose onClick={closeModal} /></div>

           </div>

     </div>
     <div class="card-body">
     <div className="row">
                        <div className="col-md-6">
                               <div className="form-group mt-2">
                                       <label>:المادة</label>
                                       <select  onChange={(e)=>setSubjectId(e.target.value)}>
                                                  {subjects!=null?subjects.map(option => (
                                                    <option key={option.id} value={option.id} >{option.first_name}</option>
                                                  )):null}
                                          </select>
                               </div>
                        </div>
                        <div className="col-md-6">
                        <div className="form-group mt-2">
                                       <label>:المدرب</label>
                                      
                                        <select  onChange={(e) => setTrainerId(e.target.value)}>
                                                   {trainers.map(option => (
                                                     <option key={option.id} value={option.id} >{option.first_name}</option>
                                                   ))}
                                           </select>
                                </div> 
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                                <div className="form-group mt-2">
                                       <label>:تاريخ البدء</label>
                                       <input type="date" className="form-control"
                                           onChange={e=>setStart(e.target.value)}
                                       id="birth_day" />
                                </div>  
                        </div>
                        
                        <div className="col-md-6">
                        <div className="form-group mt-2">
                                       <label>:تاريخ الإنتهاء</label>
                                       <input type="date" className="form-control"
                                           onChange={e=>setEnd(e.target.value)}
                                       id="birth_day" />
                                </div> 
                                
                        </div>

                       
                        
                    </div>

           
     </div>
     <div class="card-footer text-muted">
          <a href="#" onClick={store} class="btn btn-primary">حفظ</a>
      <ToastContainer />
     </div>
   </div>

   <div>
      
    </div>
</ReactModal> 
</div>  
</Fragment>
    
   )
}