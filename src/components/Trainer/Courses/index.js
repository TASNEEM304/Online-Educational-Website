import React ,{Fragment,useEffect,useState} from "react";
import { Container, Row, Col,Table ,Form} from "reactstrap";
import {
    Button,
  } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import AuthUser from  '../../Auth/AuthUser';
import Header from "../HeaderTrainer";
import ReactPaginate from 'react-paginate';
import * as AiIcons from "react-icons/ai";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function CourseTrainer() {
    const history = useNavigate();
    const navigate = useNavigate();
    const {http} = AuthUser();
    const [searchTerm, setSearchTerm] = useState("");
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageCount, setpageCount] = useState(0);  
   
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

http.get(`trainer/Course/GetCoursesByTrainerId?page=1`).then((res)=>{
setData(res.data.data.data);


setpageCount(res.data.data.total/res.data.data.data.length);
}).catch(function (error) {

});
};    
const handlePageClick = async ({ selected }) => {
  http.get(`trainer/Course/GetCoursesByTrainerId?page=${selected+1}`).then((res)=>{
  setData(res.data.data.data);
  setCurrentPage(selected);
  }).catch(function (error) {
  
  });
  };

const handleSearchChange = (event) => {
setSearchTerm(event.target.value);
};
const handleSearchClick = () => {
loadData();
};


const Modeling = async (data)=>{
    // console.log(data);
      history('/Trainer/QuestionBank' , { state : { data } });
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
           <th style={{ width: "10%" }}>عدد الساعات</th>
           <th style={{ width: "10%" }}>السعر</th>
           <th style={{ width: "10%" }}>تاريخ النهاية</th>
           <th style={{ width: "10%" }}>تاريخ البداية</th>
           <th style={{ width: "20%" }}>اسم الكورس</th>
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
 
             <td >
               
       {/* <button className="btn btn-primary" onClick={()=>Modeling(data.id)}>النماذج</button> */}
       <Button type="submit" variant="contained" color="primary" onClick={()=>Modeling(data.id)}>
       النماذج 
          </Button>
             </td>
               <td>{data.approved === 0 ? 'ليس معتمد' : 'معتمد'}</td>
               <td>{data.houers}</td>
               <td>{data.price}</td>
               <td>{data.end}</td>
               <td>{data.start}</td>
               <td>{data.subjectName}</td>
   
             </tr>
           ))
         )}
       </tbody>
             </Table>
             </div>
             <div className="card-footer text-muted" style={{background: 'white'}}>
               <div className="row">
                  
                   
                 <div className="col-lg-3"> 
                     
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

</div>  
</Fragment>
    
   )
}