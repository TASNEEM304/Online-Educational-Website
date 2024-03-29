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
    const NewDate=new Date();
    const [start_date, setFirstdate] = useState(NewDate.toISOString().substr(0, 10));
    const [end_date, setEnddate] = useState(new Date(NewDate.getFullYear(), NewDate.getMonth() + 1, NewDate.getDate()).toISOString().substr(0, 10));
     
///============================
/// loadData
///=============================
useEffect(() => {
  
  loadData();
         }, []);
const loadData = async () => {
debugger

http.get(`branch_admin/course/search?page=1&start_date=${start_date}&end_date=${end_date}&approved=0`).then((res)=>{
setData(res.data.data.data);


setpageCount(res.data.data.total/res.data.data.data.length);
}).catch(function (error) {

});
};    
  //   useEffect(() => {
  //           loadData();
  //                  }, []);
  //  const loadData = async () => {
  //     debugger
  //     http.get(`branch_admin/course/search/${searchTerm === "" ? 'null' : searchTerm}?page=1`).then((res)=>{
  //      setData(res.data.data.data);
      

  //      setpageCount(res.data.data.total/res.data.data.data.length);
  //     }).catch(function (error) {
   
  //     });
  //   };    
//=============================
// store
//=============================
    // const store = () =>{
    //   debugger
    //   http.post('receptionist/course/store',{subject_id:subject_id,trainer_id:trainer_id,start:start,end:end}).then((res)=>{
    //     toast.success('تمت العملية بنجاح');

    //   }).catch(function (error) {
    //     toast.error("error");
    
    //     });

    const store = () =>{
      debugger
      http.post('branch_admin/course/store',{subject_id:subject_id,trainer_id:trainer_id,start:start,end:end,approved:0,min_students:10,max_students:20}).then((res)=>{
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
          http.get('trainer/trainerProfile/view').then((res)=>{
            setTrainer(res.data.data);
        });
      }
      useEffect(()=>{
        GetSubjectId()
      },[])
      
      const GetSubjectId = async ()=>{
          http.get('branch_admin/subject/view/').then((res)=>{
            setSubject(res.data.data);
        });
      }
///============================
/// handlePageClick
///=============================

// const handlePageClick = async ({ selected }) => {
// http.get(`receptionist/course/search/${searchTerm === "" ? 'null' : searchTerm}?page=${selected+1}`).then((res)=>{
// setData(res.data.data.data);
// setCurrentPage(selected);
// }).catch(function (error) {

// });
// };


const handlePageClick = async ({ selected }) => {
  http.get(`branch_admin/course/search?page=${selected+1}&start_date=${start_date}&end_date=${end_date}&approved=0`).then((res)=>{
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

//=============================
// GetCards
//=============================

const approve = async (id)=>{
  http.post(`course/approve/${id}`).then((res)=>{
    const data=res.data;
    toast.success("تمت الاعتماد بنجاح")
    loadData();
  //alert("تمت العملية بنجاح ")
   
  }).catch(function (error) {
    toast.error("error")
    });
}



    
    
    return(

<Fragment>
<Header />

{/* <div className="container-fluid"></div> */}
 
<div className="container-fluid">
<Row>
    
    <Col lg="12" lang="ar">

      
    <div className="card" style={{   textAlign: 'right' ,height: '500px' ,fontSize: "10px",background: 'white', marginTop:'15px', border: 'none',boxShadow: 'none'}}>
              <div className="card-header" style={{background: 'white'}} dir="rtl">
               
               <div className="row">
               
               <div className="col-lg-3">

               <div className="input-group mb-4">
 <input
   type="text"
   className="form-control"
   placeholder="إبحث عن التاريخ"
   value={searchTerm}
   onChange={handleSearchChange}
   style={{ borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderBottom: '1px solid #ccc' }}
 />
 <div className="input-group-append">
   <span className="input-group-text">
     <AiIcons.AiOutlineSearch onClick={handleSearchClick} style={{ fontSize:'30px',alignItems:"center" }} />
   </span>
 </div>
</div>


</div>
<div className="col-lg-4">
 
<div className="input-group mb-4" style={{ fontSize:'20px',alignItems:"center" }}>
 
 <label>تاريخ النهاية:</label>
                         <input type="date" className="form-control" placeholder="Enter birth_day"
                             onChange={e=>setEnddate(e.target.value)}
                             
 value={end_date}
                         id="birth_day" />
 
                 </div>
</div>
<div className="col-lg-4">
<div className="input-group mb-4" style={{ fontSize:'20px',alignItems:"center" }}>
 
 <label>تاريخ البداية:</label>
                         <input type="date" className="form-control" placeholder="Enter birth_day"
                             onChange={e=>setFirstdate(e.target.value)}
                             
 value={start_date}
                         id="start_date" />
 
                 </div>
</div>
<div className="col-lg-1">
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
       <thead style={{background: " linear-gradient(to left, #2980b9, #2c3e50)" , 
       }}>
         
         <tr >
           <th style={{ width: "10%" }}></th>
           <th style={{ width: "10%" }}>الاعتماد</th>
           <th style={{ width: "10%" }}>تاريخ الإنتهاء</th>
           <th style={{ width: "10%" }}>تاريخ البدء</th>
           <th style={{ width: "10%" }}>عدد الجلسات</th>
           <th style={{ width: "10%" }}>عدد الساعات</th>
           <th style={{ width: "10%" }}>التسعير</th>
           <th style={{ width: "10%" }}>اسم المدرب</th>
           <th style={{ width: "20%" }}>اسم المادة</th>
         </tr>
       </thead>
       <tbody>
         {data  && data.length === 0 ? (
           <tr>
             <td colSpan={8} className="text-center">
               لا يوجد بيانات
             </td>
           </tr>
         ) : (
           data && data.map((data) => (
             <tr key={data.id}>
 
                         
               {/* <td>

               {!editing || editedItem.id !== data.id ? (
               <AiIcons.AiOutlineEdit onClick={() => handleEditClick(data)} style={{ color: 'green' , width : '10%' , height: '10%' ,alignItems:"center" }} />
               
               ) : (
                 <>
                   <button onClick={handleSaveClick}>Save</button>
                   <button onClick={handleCancelClick}>Cancel</button>
                 </>
               )}
               <AiIcons.AiFillDelete onClick={() => Delete(data.id)} style={{ color: 'red' , width : '10%' , height: '10%' ,alignItems:"center" }} />
                  
             </td> */}
             <td >
               
       <button className="btn btn-primary" onClick={()=>approve(data.id)}>اعتماد</button>
           
             </td>
               <td>{data.approved === 0 ? 'ليس معتمد' : 'معتمد'}</td>
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
             <div className="card-footer text-muted" style={{background: 'white'}}>
               <div className="row">
                  
                   
                 <div className="col-lg-3"> 
                     
                     <div className="input-group mb-4">
                          
                     <AiIcons.AiFillPlusCircle onClick={openModal} style={{ fontSize:'60px', color:'secondary' ,
                             border: 'none', alignItems:"center" }} />
                       
                     </div>
                </div>
                <div className="col-lg-6">
                        
                        <div className="input-group mb-4">
                        </div>
                </div>
                 

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
                </div>
                               </div>
           </div>
     

     
    </Col>

    
  </Row>

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
                                                    <option key={option.id} value={option.id} >{option.subjectName}</option>
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