 import React,{useEffect,useState,Fragment} from 'react'
 import axios from 'axios'

 import { Container, Row, Col,Table,Button ,Form} from "reactstrap";
 import HeaderSiectAff from "./../../HeaderSiectAff" ;
 import ReactPaginate from 'react-paginate';

 
 import ReactModal from 'react-modal';
 import * as AiIcons from "react-icons/ai";

  //const endpoint = 'http://localhost:8000/api/branch/store'

export const GetSubjects= () => {

 // const [data,setdata] = useState([])

const [name ,setName] = useState("");
const [content ,setcontent] = useState(null);

const [price ,setprice] = useState("");
const [houers ,sethouers] = useState("");
const [number_of_lessons ,setnumber_of_lessons] = useState("");




// useEffect(()=>{
//   GetSubjects()
// },[])
// const GetSubjects = async ()=>{
//    return await axios.get('http://localhost:8000/api/subject/index').then((res)=>{
//     setdata(res.data.data);
   
   
//  });
 
//}
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
  GetSubjects();
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
const [currentPage, setCurrentPage] = useState(0);

const handlePageClick = async ({ selected }) => {
  debugger
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
                         }}>أضف فرع جديد
                        
                         </Button>
                         
                         <br/>
      <Table striped bordered hover  style={{fontSize: "16px", 
                         width: "100%"
                         }}>
        <thead style={{background:"#ece24c",
        }}>
          <tr >
            <th ></th>
            <th >الاسم</th>
            <th>الرقم</th>
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
                <td style={{width:"50%"}}>{data.name}</td>
                <td style={{width:"30%"}}>{data.No}</td>
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
                  
                        <div className="col-md-6">
                              <div className="form-group mt-2">
                                       <label>الرقم:</label>
                                       <input type='number' 
                                              className='form-control' 
                                              placeholder='ادخل رقم الفرع'
                                              Value={No} 
                                              onChange={(e)=>setNo(e.target.value)}
                                              />
                              </div>   
                        </div>
                        <div className="col-md-6">
                               <div className="form-group mt-2">
                                       <label>الأسم:</label>
                                       
                                      <input type='text' 
                                       className='form-control' 
                                       placeholder='ادخل اسم الفرع'
                                       Value={name} 
                                       onChange={(e)=>setName(e.target.value)}
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

//   <div className="trans-content">
//   <MDBContainer>
//     <form 
//     // style={{
//     //   margin:"auto",
//     //   marginRight:"1000px",
//     //   padding:"15px",
//     //   maxWidth:"500px",
//     //   alignContent:"center",

//     // }}
//     className='d-flex input-group w-auto' onSubmit={store}>
      

//         </form>


//          <ReactModal isOpen={modalIsOpen} onRequestClose={closeModal} style={{
//           content: {
//             width: '70%',
//             height : '60%',
//             position: 'absolute',
//             top: '50%',
//             left: '40%',
//             transform: 'translate(-50%, -50%)'
            
//           }}}>
//       <AiIcons.AiOutlineClose onClick={closeModal} style={{  width: '5%' , height : '5%' }} />
//         <div lang="ar" style={{marginTop:"100px" ,   textAlign: 'right'}}>
        
            
//                 <div lang="ar" className="row">


               
                        
//                               <div className="form-group mt-2">
//                                        <label>اسم المادة</label>
//                                        <input type='text' 
//                                               className='form-control' 
//                                               placeholder='ادخل اسم المادة '
//                                               Value={name} 
//                                               onChange={(e)=>setName(e.target.value)}
//                                               />
//                               </div>  
//                               <div className="form-group mt-2">
//                                        <label>المحتوى العلمي </label>
//                                        <input type='file' 
//                                               className='form-control' 
//                                               placeholder='ادخل المحتوى العلمي  '
                                          
//                                               onChange={(event) => setcontent(event.target.files[0])}
//                                               />
//                               </div>   
                   
                           
//                               <div className="form-group mt-2">
//                                        <label>السعر </label>
//                                        <input type='number' 
//                                               className='form-control' 
//                                               placeholder='ادخل السعر  '
//                                               Value={price} 
//                                               onChange={(e)=>setprice(e.target.value)}
//                                               />
//                               </div>   
                      
                        
//                               <div className="form-group mt-2">
//                                        <label>عدد الساعات </label>
//                                        <input type='number' 
//                                               className='form-control' 
//                                               placeholder='ادخل عدد الساعات  '
//                                               Value={houers} 
//                                               onChange={(e)=>sethouers(e.target.value)}
//                                               />
//                               </div>   
                     



                     
//                               <div className="form-group mt-2">
//                                        <label>عدد الدروس </label>
//                                        <input type='number' 
//                                               className='form-control' 
//                                               placeholder='ادخل عدد الدروس  '
//                                               Value={number_of_lessons} 
//                                               onChange={(e)=>setnumber_of_lessons(e.target.value)}
//                                               />
//                               </div>   
                        


//                 </div>
//                     <button type="button" onClick={store} className="btn btn-primary mt-4">حفظ</button>
//              </div>   
           
    
//       </ReactModal> 

// <div lang="ar" style={{marginTop:"100px" ,   textAlign: 'right'}}>
  
          
//           <MDBRow>
            
//             <MDBCol size="10">
              
//                <h2>جميع المواد</h2>
//                <AiIcons.AiOutlinePlus onClick={openModal} style={{ background :"green" }}/>
//                {/* <div className="col-md-4"><button onClick={openModal}>أضف فرع جديد</button></div> */}
               
//               <MDBTable>
//                 <MDBTableHead dark>
//                   <tr>
                    
//                     <th scope='col-md-2' size="2" ></th>
//                     <th scope='col'>عدد الدروس</th>
//                                  <th scope='col'>عدد الساعات </th>
                                
                               
//                                 <th scope='col'>السعر</th>
//                                 <th scope='col'>المحتوى</th>
//                                <th scope='col'>اسم المادة</th>
                   
//                   </tr>
                  

//                 </MDBTableHead>

//                 {
                  
//                   data.length === 0 ? (
//                     <MDBTableBody className='align-center mb-0'>
//                     <tr>
//                        <td colSpan={8} className='text-center mb-0'>
//                       No Data 
//                        </td>
//                     </tr>
//                     </MDBTableBody>
//                   ):(
//                     data.map((data)=>(
//                       <MDBTableBody >
//                         <tr>
                          
//                         {/* <td><button onClick={() => Delete(data.id)} className='btn btn-danger mt-4' >Delete</button></td> */}
                          

//                           <td>
//                              <AiIcons.AiFillDelete onClick={() => Delete(data.id)} style={{ color: 'red' , width : '10%' , height: '10%' ,alignItems:"center" }} />
                             
//                              {/* <Link to={`/Branches/edit/${data.id}`} >
//                               <AiIcons.AiFillEdit style={{ color: 'green' , width : '10%' , height: '10%' ,alignItems:"center" }}/ >
//                              </Link> */}
                          
//                           </td>
                              
//                           <td>{data.number_of_lessons}</td>
//                                       <td>{data.houers}</td>
                                  
//                                        <td>{data.price}</td>
//                                        <td>{data.content}</td>
//                                        <td>{data.name}</td>
                                      
                          
                  
//                         </tr>
    
//                       </MDBTableBody>
    
    
//                         ))
//                       )
//                     }
//                   </MDBTable>
    
//             </MDBCol>
//             <MDBCol size="4">

//             </MDBCol>
//               </MDBRow>

// </div>







//               </MDBContainer>
//    </div>
 
