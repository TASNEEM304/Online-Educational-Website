import React ,{Fragment,useEffect,useState} from "react";
import { Container, Row, Col,Table,Button ,Form} from "reactstrap";
import Header from "./Header";
import ReactPaginate from 'react-paginate';
import axios from 'axios'
  

import ReactModal from 'react-modal';
import * as AiIcons from "react-icons/ai";

const Getbranches = () => {
  //const [data,setdata] = useState([])
  const [No ,setNo] = useState("");
  const [name ,setName] = useState("");
  const [searchTerm, setSearchTerm] = useState('');
  
  

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
  
  
  

  // useEffect(()=>{
  //   Getbranches()
  // },[])
  // const Getbranches = async ()=>{
  //   debugger
  //    return await axios.get('http://localhost:8000/api/branch/index').then((res)=>{
  //     setdata(res.data.data.data);
  //     console.log(res.data)
  //  });
  // }



  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = async ({ selected }) => {
    debugger
    const response = await axios.get(`http://localhost:8000/api/branch/index?page=${selected}`);
    setData(response.data.data.data);
    setCurrentPage(selected);
  };


  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(0); // reset page number when search term changes
  };
  const handleSearchClick = () => {
    console.log('Search term:', searchTerm);
    // your code to perform the search goes here
  };

  return (
<Fragment>
<Header />
<section>
      <Container>
    
      <div className="container mt-4">
      <div className="row">
      <div className="col-md-6">

          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          
      <button className="btn btn-primary" type="button" onClick={() => console.log('Search term:', searchTerm)}>بحث</button>
      </div>
      </div>
      </div>
      </div>
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

export default Getbranches;
