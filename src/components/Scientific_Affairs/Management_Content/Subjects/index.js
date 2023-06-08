import React,{useEffect,useState,Fragment} from 'react'
import axios from 'axios'

import { Container, Row, Col,Table,Button ,Form} from "reactstrap";
import HeaderSiectAff from "../../HeaderSiectAff" ;
import ReactPaginate from 'react-paginate';


import ReactModal from 'react-modal';
import * as AiIcons from "react-icons/ai";

 //const endpoint = 'http://localhost:8000/api/branch/store'

export const GetSubjects= () => {


 const [name ,setName] = useState("");
 const [content ,setcontent] = useState(null);
 
 const [price ,setprice] = useState("");
 const [houers ,sethouers] = useState("");
 const [number_of_lessons ,setnumber_of_lessons] = useState("");






const store = async (event) => {
 event.preventDefault();

 const formData = new FormData();
 formData.append("name", name);
 formData.append("content", content);
 formData.append("price", price);
 formData.append("houers", houers);
 formData.append("number_of_lessons", number_of_lessons);

 try {
   const response = await axios.post("http://localhost:8000/api/subject/store", formData, {
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
 
  return await axios.post(`http://localhost:8000/api/subject/destroy/${id}`).then((res)=>{
     alert(res.data.message);
     GetSubjects();
  })
 
}

const handleFileChange = (event) => {
 if (event.target.files) {
   setcontent(event.target.files[0]);
 }
};


const [modalIsOpen, setModalIsOpen] = useState(false);

const openModal = () => setModalIsOpen(true);
const closeModal = () => setModalIsOpen(false);


const [data, setData] = useState([]);
const [currentPage, setCurrentPage] = useState(1);

useEffect(() => {
  const loadData = async () => {
    const response = await axios.get('http://localhost:8000/api/subject/index?page=1');
    setData(response.data.data.data);
  };

  loadData();
}, []);

const handlePageClick = async ({ selected }) => {
 
 const response = await axios.get(`http://localhost:8000/api/subject/index?page=${selected}`);
 setData(response.data.data.data);
 setCurrentPage(selected);
};




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
                   <th >عدد الدروس</th>
                   <th >عدد الساعات </th>
                               
                              
                 <th>السعر</th>
                  <th>المحتوى</th>
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
               <td style={{width:"20%"}}>
               {/* <AiIcons.AiFillDelete onClick={() => Delete(data.id)} style={{ color: 'red' , width : '10%' , height: '10%' ,alignItems:"center" }} /> */}
                            
                 <Button variant="danger" onClick={() => Delete(data.id)}>حذف</Button>
                 {/* <Button variant="primary" href={`/Branches/edit/${data.id}`}>تحرير</Button> */}
               </td>
              
               <td style={{width:"30%"}}>{data.number_of_lessons}</td>
               <td style={{width:"30%"}}>{data.houers}</td>
                                 
               <td style={{width:"30%"}}>{data.price}</td>
                <td style={{width:"30%"}}>{data.content}</td>
                  <td style={{width:"30%"}}>{data.name}</td>
             </tr>
           ))
         )}
       </tbody>
     </Table>
     <div>
     {/* Render DataDisplay component with data */}
     <ReactPaginate
       pageCount={9} // Total number of pages
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
                                      <label>اسم المادة</label>
                                      <input type='text' 
                                             className='form-control' 
                                             placeholder='ادخل اسم المادة '
                                             Value={name} 
                                             onChange={(e)=>setName(e.target.value)}
                                             />
                             </div>  
                             <div className="form-group mt-2">
                                      <label>المحتوى العلمي </label>
                                      <input type='file' 
                                             className='form-control' 
                                             placeholder='ادخل المحتوى العلمي  '
                                         
                                             onChange={(event) => setcontent(event.target.files[0])}
                                             />
                             </div>   
                  
                          
                             <div className="form-group mt-2">
                                      <label>السعر </label>
                                      <input type='number' 
                                             className='form-control' 
                                             placeholder='ادخل السعر  '
                                             Value={price} 
                                             onChange={(e)=>setprice(e.target.value)}
                                             />
                             </div>   
                     
                       
                             <div className="form-group mt-2">
                                      <label>عدد الساعات </label>
                                      <input type='number' 
                                             className='form-control' 
                                             placeholder='ادخل عدد الساعات  '
                                             Value={houers} 
                                             onChange={(e)=>sethouers(e.target.value)}
                                             />
                             </div>   
                    



                    
                             <div className="form-group mt-2">
                                      <label>عدد الدروس </label>
                                      <input type='number' 
                                             className='form-control' 
                                             placeholder='ادخل عدد الدروس  '
                                             Value={number_of_lessons} 
                                             onChange={(e)=>setnumber_of_lessons(e.target.value)}
                                             />
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


