import React,{useEffect,useState,Fragment} from 'react'
import axios from 'axios'

import { Container, Row, Col,Table,Button ,Form} from "reactstrap";
import HeaderSiectAff from "../../HeaderSiectAff" ;
import ReactPaginate from 'react-paginate';


import ReactModal from 'react-modal';
import * as AiIcons from "react-icons/ai";

 //const endpoint = 'http://localhost:8000/api/branch/store'

export const GetQuestionBank= () => {


  const [course_id ,setcourseid] = useState("");
  const [model ,setmodel] = useState("");
  const [file ,setfile] = useState(null);
  const [branch_id ,setbranchid] = useState("");






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
 GetQuestionBank();
 closeModal();
};
const Delete= async (id) =>{
 
  return await axios.post(`http://localhost:8000/api/qbank/destroy/${id}`).then((res)=>{
     alert(res.data.message);
     GetQuestionBank();
  })
 
}

const handleFileChange = (event) => {
 if (event.target.files) {
   setfile(event.target.files[0]);
 }
};


const [modalIsOpen, setModalIsOpen] = useState(false);

const openModal = () => setModalIsOpen(true);
const closeModal = () => setModalIsOpen(false);


const [data, setData] = useState([]);
const [currentPage, setCurrentPage] = useState(0);

const handlePageClick = async ({ selected }) => {
 debugger
 const response = await axios.get(`http://localhost:8000/api/qbank/index?page=${selected}`);
 setData(response.data.data.data);
 setCurrentPage(selected);
};
const [Branches,setbranches] = useState([])
useEffect(()=>{
    Getbranches()
  },[])
const Getbranches = async ()=>{
    return await axios.get('http://localhost:8000/api/branch/index').then((res)=>{
     setbranches(res.data.data.data);
    
    
  });
}
const [Courses,setCourses] = useState([])
useEffect(()=>{
    GetCourses()
  },[])
const GetCourses = async ()=>{
  
    return await axios.get('http://localhost:8000/api/course/index').then((res)=>{
     setCourses(res.data.data.data);
    
    
  });
}




return (


 <Fragment>
<HeaderSiectAff />
<section>
     <Container>

  
     
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
                   <th>الفرع</th>
                <th>ملف الاسئلة</th>
                <th>النموذج</th>
                <th>الدورة</th>
                  
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
               <td style={{width:"20%"}}>
               {/* <AiIcons.AiFillDelete onClick={() => Delete(data.id)} style={{ color: 'red' , width : '10%' , height: '10%' ,alignItems:"center" }} /> */}
                            
                 <Button variant="danger" onClick={() => Delete(data.id)}>حذف</Button>
                 {/* <Button variant="primary" href={`/Branches/edit/${data.id}`}>تحرير</Button> */}
               </td>
              
               

                  <td style={{width:"30%"}}>{data.Branches}</td>
                <td style={{width:"30%"}}>{data.file}</td>
                <td style={{width:"30%"}}>{data.model}</td>
                <td style={{width:"30%"}}>{data.course_id}</td>
               
             </tr>
           ))
         )}
       </tbody>
     </Table>
     <div>
     {/* Render DataDisplay component with data */}
     <ReactPaginate
       pageCount={3} // Total number of pages
       onPageChange={handlePageClick}
       forcePage={currentPage}
       containerClassName="pagination"
       activeClassName="active"
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
                                      <label> الدورة</label>
                                      <select className='form-control'   onChange={(e)=>setcourseid(e.target.value)}>
         <option value="">الرجاء اختيار الدورة</option>
         {Courses.map(option => (
             <option key={option.id} value={option.id} >{option.name}</option>
                        ))}
            </select>
                             </div>  
                             <div className="form-group mt-2">
                                      <label>النموذج  </label>
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
                <select className='form-control'  onChange={(e)=>setbranchid(e.target.value)}>
                                                    <option value="">الرجاء اختيار الفرع</option>
                                                   {Branches.map(option => (
                                                     <option key={option.id} value={option.id} >{option.name}</option>
                                                    ))}
                                            </select>
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


