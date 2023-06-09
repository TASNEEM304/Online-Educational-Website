import React,{useEffect,useState,Fragment} from 'react'
import axios from 'axios'

import { Container, Row, Col,Table,Button ,Form} from "reactstrap";
import HeaderSiectAff from "../../HeaderSiectAff" ;
import ReactPaginate from 'react-paginate';


import ReactModal from 'react-modal';
import * as AiIcons from "react-icons/ai";
import AuthUser from  '../../../Auth/AuthUser';

 //const endpoint = 'http://localhost:8000/api/branch/store'

export const GetSubjects= () => {

  const {http} = AuthUser();
 const [name ,setName] = useState("");
 const [content ,setcontent] = useState(null);
 const [searchTerm, setSearchTerm] = useState('');
 
 const [price ,setprice] = useState("");
 const [houers ,sethouers] = useState("");
 const [number_of_lessons ,setnumber_of_lessons] = useState("");
 const pageCount = 20;






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
    
  http.post(`subject/destroy/${id}`).then((res)=>{
   alert(res.data.message);
  // loadData();
})

}

const handleFileChange = (event) => {
 if (event.target.files) {
   setcontent(event.target.files[0]);
 }
};


useEffect(() => {
  const loadData = async () => {
    http.get(`subject/index?page=1`).then((res)=>{
      setData(res.data.data.data);
      setCurrentPage(1);
     }).catch(function (error) {

     }); 
  };

  loadData();
}, []);




const [modalIsOpen, setModalIsOpen] = useState(false);

const openModal = () => setModalIsOpen(true);
const closeModal = () => setModalIsOpen(false);


const [data, setData] = useState([]);
const [currentPage, setCurrentPage] = useState(1);



const handlePageClick = async ({ selected }) => {
  http.get(`subject/index?page=${selected}`).then((res)=>{
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
  setCurrentPage(1); // reset page number when search term changes
};
const handleSearchClick = () => {
  console.log('Search term:', searchTerm);
  // your code to perform the search goes here
};



//=============================
// Update
//=============================

const Update = async (editedItem) => {
  debugger
  http.post(`branch/update/${editedItem.id}`,editedItem).catch(function (error) {
  console.log(error);
});
}


  const [editing, setEditing] = useState(false);
  const [editedItem, setEditedItem] = useState({});

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
<HeaderSiectAff />
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
                {/* <td style={{width:"20%"}}> */}
  
  
                {/* <AiIcons.AiFillDelete onClick={() => Delete(data.id)} style={{ color: 'red' , width : '10%' , height: '10%' ,alignItems:"center" }} /> */}
                             
                  {/* <Button variant="danger" onClick={() => Delete(data.id)}>حذف</Button> */}
                  {/* <Button variant="primary" href={`/Branches/edit/${data.id}`}>تحرير</Button> */}
                {/* </td> */}
                <td>
                {!editing || editedItem.id !== data.id ? (
                  <button onClick={() => handleEditClick(data)}>Edit</button>
                ) : (
                  <>
                    <button onClick={handleSaveClick}>Save</button>
                    <button onClick={handleCancelClick}>Cancel</button>
                  </>
                )}
              </td>
              <td>{editing && editedItem.id === data.id ? <input type="text" name="number_of_lessons" value={editedItem.number_of_lessons} onChange={handleInputChange} /> : data.number_of_lessons}</td>

                {/* <td style={{width:"50%"}}>{data.name}</td> */}
                <td>{editing && editedItem.id === data.id ? <input type="text" name="houers" value={editedItem.houers} onChange={handleInputChange} /> : data.houers}</td>

                <td>{editing && editedItem.id === data.id ? <input type="text" name="price" value={editedItem.price} onChange={handleInputChange} /> : data.price}</td>
                <td>{editing && editedItem.id === data.id ? <input type="text" name="content" value={editedItem.content} onChange={handleInputChange} /> : data.content}</td>
                <td>{editing && editedItem.id === data.id ? <input type="text" name="name" value={editedItem.name} onChange={handleInputChange} /> : data.name}</td>

              </tr>
            ))
          )}
        </tbody>
      

 
     </Table>
     <div className="App">
      {/* your code to display the data goes here */}
      <ReactPaginate
        previousLabel={'<'}
        nextLabel={'>'}
        breakLabel={'...'}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        pageClassName={'page-item'}
        activeClassName={'active'}
        previousClassName={'page-item'}
        nextClassName={'page-item'}
        breakClassName={'page-item'}
        pageLinkClassName={'page-link'}
        previousLinkClassName={'page-link'}
        nextLinkClassName={'page-link'}
        breakLinkClassName={'page-link'}
        disableInitialCallback={true}
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


