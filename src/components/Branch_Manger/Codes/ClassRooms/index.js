import React,{useEffect,useState, Fragment } from 'react'
import axios from 'axios'
import { Link ,useNavigate} from 'react-router-dom'
import ReactModal from 'react-modal';
import * as AiIcons from "react-icons/ai";
import { Container, Row, Col,Table,Button ,Form} from "reactstrap";
import HeaderBrcMgr from "../../HeaderBrcMgr";


  //const endpoint = 'http://localhost:8000/api/branch/store'

const GetClassRoom = () => {
 

const [data,setClassRoom ] = useState([])
const [No ,setNo] = useState("");
const [name ,setName] = useState("");
const [size ,setSize] = useState("");
const [branch_id ,setbranchid] = useState("");

 useEffect(()=>{
  GetClassRoom()
 },[])
const GetClassRoom = async ()=>{
   return await axios.get('http://localhost:8000/api/class/index').then((res)=>{
    setClassRoom(res.data.data.data);
   
   
 });
 
 //console.log(response.data.data)
}

const Delete= async (id) =>{
  
   return await axios.post(`http://localhost:8000/api/class/destroy/${id}`).then((res)=>{
      alert(res.data.message);
   })
  //GetClassRoom()
  //history('/index');
}







const [modalIsOpen, setModalIsOpen] = useState(false);

const openModal = () => setModalIsOpen(true);
const closeModal = () => setModalIsOpen(false);



const [Branches,setbranches] = useState([])
useEffect(()=>{
    Getbranches()
  },[])
const Getbranches = async ()=>{
    return await axios.get('http://localhost:8000/api/branch/index').then((res)=>{
     setbranches(res.data.data);
    
    
  });
}




let history=useNavigate();
    
    const store = async (e) => {
      debugger
        e.preventDefault()
       await axios.post('http://localhost:8000/api/class/store',{No:No,name:name,size:size,branch_id:branch_id})
       .catch(function (error) {
        console.log(error);
      });
      GetClassRoom();
      closeModal();
      }

 return (

  <Fragment>
<HeaderBrcMgr />
<section>
      <Container>

   
      
   <Row>
     <Col lg="12" md="6" lang="ar" style={{marginTop:"10px" ,   textAlign: 'right'}}>

      
      <Button variant="success" onClick={openModal} style={{fontSize: "10px", 
                         width: "15%",height:"25%"
                         }}>أضف قاعة جديدة
                        
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
                             
                {/* <Button variant="danger" onClick={() => Delete(data.id)}>حذف</Button> */}
                  {/* <Button variant="primary" href={`/Branches/edit/${data.id}`}>تحرير</Button> */}
                </td>
                <td style={{width:"50%"}}>{data.name}</td>
                <td style={{width:"30%"}}>{data.No}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      
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
                                       <label>:الرقم</label>
                                       <input type='number' 
                                              className='form-control' 
                                              placeholder=' ادخل رقم القاعة'
                                              Value={No} 
                                              onChange={(e)=>setNo(e.target.value)}
                                              />
                              </div>   
                        </div>
                        <div className="col-md-6">
                               <div className="form-group mt-2">
                                       <label>:الأسم</label>
                                       
                                      <input type='text' 
                                       className='form-control' 
                                       placeholder='ادخل اسم القاعة'
                                       Value={name} 
                                       onChange={(e)=>setName(e.target.value)}
                                       />
                               </div>
                        </div>
                        <div className="col-md-6">
                               <div className="form-group mt-2">
                                       <label>:السعى</label>
                                       
                                      <input type='text' 
                                       className='form-control' 
                                       placeholder='ادخل سعة القاعة'
                                       Value={name} 
                                       onChange={(e)=>setSize(e.target.value)}
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

          

//   <div className="services">
//   <MDBContainer>

//                <ReactModal isOpen={modalIsOpen} onRequestClose={closeModal} style={{ backgroundColor: 'white', width: '10%' , height : '10%'}}>
//                            <AiIcons.AiOutlineClose onClick={closeModal} style={{  width: '5%' , height : '5%' }} />
//                            <div lang="ar" style={{ textAlign: 'right'}}>
        
            
//                                <Form className="d-grid gap-2" style={{margin:"5rem"}}>
//                                            <Form.Group className="mb-3" controlId='formNo'>
//                                                     <Form.Control type='text' placeholder=' ادخل رقم القاعة' required onChange={(e)=>setNo(e.target.value)}> 
                                        
//                                                     </Form.Control>
//                                            </Form.Group>
//                                            <Form.Group className="mb-3" controlId='formName'>
//                                            <Form.Control type='text' placeholder=' ادخل اسم القاعة' required onChange={(e)=>setName(e.target.value)}> 
                               
//                                            </Form.Control>
//                                            </Form.Group>
//                                            <Form.Group className="mb-3" controlId='formSize'>
//                                            <Form.Control type='text' placeholder=' ادخل سعة القاعة' required onChange={(e)=>setSize(e.target.value)}> 
                               
//                                            </Form.Control>
//                                            </Form.Group>
//                                            <Form.Group className="mb-3" controlId='formName'>
//                                            <select  onChange={(e)=>setbranchid(e.target.value)}>
//                                                    <option value="">--Please select an option--</option>
//                                                    {Branches.map(option => (
//                                                      <option key={option.id} value={option.id} >{option.name}</option>
//                                                    ))}
//                                            </select>
  
    
//                                </Form.Group>


//                                <Button type="submit" onClick={(e)=>store(e)}>
//                                    حفظ
//                                </Button>
//                                </Form>
               
                    
//                            </div>
//                </ReactModal>
//                <AiIcons.AiOutlinePlus  onClick={openModal} style={{ background :"green" }} title='نت'/>
                          
//               <div lang="ar" style={{marginTop:"100px" ,   textAlign: 'right'}}>
//                         <h2>جميع القاعات</h2>
//                         <MDBRow>
//                           <MDBCol size="12">
//                           <AiIcons.AiOutlinePlus  onClick={openModal} style={{ background :"green" }} title='نت'/>
//                             <MDBTable>
//                               <MDBTableHead dark>
//                                 <tr>
//                                 <th scope='col'></th>
//                                 <th scope='col'>الفرع</th>
//                                 <th scope='col'>سعة القاعة</th>
//                                 <th scope='col'>الأسم</th>
//                                 <th scope='col'>الرقم</th>
                                 
//                                 </tr>
                                
              
//                               </MDBTableHead>
              
//                               {
                                
//                                 ClassRoom.length === 0 ? (
//                                   <MDBTableBody className='align-center mb-0'>
//                                   <tr>
//                                      <td colSpan={8} className='text-center mb-0'>
//                                     No Data 
//                                      </td>
//                                   </tr>
//                                   </MDBTableBody>
//                                 ):(
//                                   ClassRoom.map((data)=>(
//                                     <MDBTableBody >
//                                       <tr>
//                                       <td>
//                                            <AiIcons.AiFillDelete onClick={() => Delete(data.id)} style={{ color: 'red' , width : '10%' , height: '10%' ,alignItems:"center" }} />
//                                       </td>
//                                       <td>{data.branch_id}</td>
//                                       <td>{data.size}</td>
//                                       <td>{data.name}</td>
//                                       <td>{data.No}</td>
                                      
                                      
//                                       </tr>
                  
//                                     </MDBTableBody>
                  
                  
//                                       ))
//                                     )
//                                   }
//                                 </MDBTable>
//                               </MDBCol>
//                             </MDBRow>
              
//               </div>


//  </MDBContainer>
//    </div>
 )
}

export default GetClassRoom;