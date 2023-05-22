import React ,{Fragment,useEffect,useState} from "react";
import { Container, Row, Col,Table,Button ,Form} from "reactstrap";
import Header from "./Header";

import axios from 'axios'

  import { Routes, Route, Link } from 'react-router-dom'
  

import ReactModal from 'react-modal';
import * as AiIcons from "react-icons/ai";

const Getbranches = () => {
  const [data,setdata] = useState([])
  const [No ,setNo] = useState("");
  const [name ,setName] = useState("");
  
  
  useEffect(()=>{
    Getbranches()
  },[])
  const Getbranches = async ()=>{
     return await axios.get('http://localhost:8000/api/branch/index').then((res)=>{
      setdata(res.data.data);
     
     
   });
   
  }
  const store = async (e) => {
    debugger
    e.preventDefault()
   await axios.post('http://localhost:8000/api/branch/store',{No:No,name:name}).catch(function (error) {
    console.log(error);
  });
  setNo('');
  setName('');
  Getbranches();
  closeModal();
  }
  const Delete= async (id) =>{
    
     return await axios.post(`http://localhost:8000/api/branch/destroy/${id}`).then((res)=>{
        alert(res.data.message);
        Getbranches();
     })
    
  }
  
  
  const [modalIsOpen, setModalIsOpen] = useState(false);
  
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  
  
  




  return (
    <Fragment>
<Header />
<section>
      <Container>

   
      
   <Row>
     <Col lg="6" md="6">
       
     </Col>

     <Col lg="6" md="6">
       <div>
         <h2>جميع الفروع </h2>
         <ReactModal isOpen={modalIsOpen} onRequestClose={closeModal} style={{
          content: {
            width: '70%',
            height : '60%',
            position: 'absolute',
            top: '50%',
            left: '40%',
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
                               <div className="form-group">
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





<div className='row' lang="ar" style={{marginTop:"100px" ,   textAlign: 'right'}}>
<div>
      
      <Button variant="success" onClick={openModal} style={{fontSize: "10px", 
                         width: "15%",height:"25%"
                         }}>أضف فرع جديد
                        
                         </Button>
                         
                         <br/>
      <Table striped bordered hover  style={{fontSize: "16px", 
                         width: "100%"
                         }}>
        <thead style={{background:"#eaeae1",
        borderBottom: "2px solid blue"}}>
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
    </div>  
    </div> 
   </div>

     </Col>
   </Row>
      </Container>
    </section>
    </Fragment>
    
  );
};

export default Getbranches;
