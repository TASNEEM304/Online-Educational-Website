import React ,{Fragment,useEffect,useState} from "react";
import { Container, Row, Col,Table,Button ,Form} from "reactstrap";
import Header from "../../HeaderBrcMgr";
import ReactPaginate from 'react-paginate';
import axios from 'axios'
import ReactModal from 'react-modal';
import * as AiIcons from "react-icons/ai";
import AuthUser from  '../../../Auth/AuthUser';

export const GetClassRoom = () => {

  const {http} = AuthUser();
const [data, setData] = useState([]);
const [searchTerm, setSearchTerm] = useState("");
const [No ,setNo] = useState("");
const [name ,setName] = useState("");
const [size ,setSize] = useState("");
const [branch_id ,setbranchid] = useState("");
const [currentPage, setCurrentPage] = useState(0);
const [pageCount, setpageCount] = useState(0);
const [modalIsOpen, setModalIsOpen] = useState(false);
  
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  
  
///============================
/// store
///=============================
  const store = async (e) => {
    debugger
    e.preventDefault()
    http.post('class/store',{No:No,name:name,size:size,branch_id:branch_id}).catch(function (error) {

  });
  setNo('');
  setName('');
  setSize('');
  setbranchid('');
  closeModal();
  loadData();
  }

///============================
/// Delete
///=============================

  const Delete= async (id) =>{
    
       http.post(`class/destroy/${id}`).then((res)=>{
        alert(res.data.message);
        loadData();
        
     })
    
  }

///============================
/// loadData
///=============================
useEffect(() => {
  loadData();
}, []);
const loadData = async () => {
  debugger
    http.get(`class/search/${searchTerm === "" ? 'null' : searchTerm}?page=1`).then((res)=>{
      setData(res.data.data.data);
      setpageCount(res.data.data.total/res.data.data.data.length);
     }).catch(function (error) {
  
     });
  
   
};
///============================
/// handlePageClick
///=============================

const handlePageClick = async ({ selected }) => {
http.get(`class/search/${searchTerm === "" ? 'null' : searchTerm}?page=${selected+1}`).then((res)=>{
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
  http.post(`class/update/${editedItem.id}`,editedItem).catch(function (error) {
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

  
  // const [Branches,setBranches] = useState([])
  // useEffect(()=>{
  //   Getbranches()
  //   },[])
  // const Getbranches = async ()=>{
  //   http.get(`class/index?page=1`).then((res)=>{
  //      setBranches(res.data.data);
      
      
  //   });
  // }
  

  return (
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
    placeholder=" بحث....   "
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
<Button variant="success"  onClick={openModal} style={{  background :  "linear-gradient(to left, #2980b9, #2c3e50)" , borderColor: 'blue' }}>أضف   قاعة دراسية

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
        
            <th style={{ width: "20%" }}></th>
            <th style={{ width: "30%" }}>الفرع</th>
            <th style={{ width: "30%" }}>سعة القاعة</th>
            <th style={{ width: "30%" }}> الأسم</th>
            <th style={{ width: "30%" }}>الرقم</th>
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
                <td>{editing && editedItem.id === data.id ? <input type="number" name="branch_id" value={editedItem.branch_id} onChange={handleInputChange} /> : data.branch_id}</td>
                <td>{editing && editedItem.id === data.id ? <input type="number" name="size" value={editedItem.size} onChange={handleInputChange} /> : data.size}</td>
                <td>{editing && editedItem.id === data.id ? <input type="text" name="name" value={editedItem.name} onChange={handleInputChange} /> : data.name}</td>
                <td>{editing && editedItem.id === data.id ? <input type="number" name="no" value={editedItem.No} onChange={handleInputChange} /> : data.No}</td>

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
   justifyContent: 'center',
   alignItems: 'center'
 },
 content: {
   width: '800px',
   height: 'auto',
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   borderRadius: '10px',
   background: '#fff',
   boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)',
   padding: 0,
   paddingTop :0,
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center'
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
               <div className="col-md-6">سجل جديد </div>
               <div className="col-md-6">
               <AiIcons.AiOutlineClose onClick={closeModal} /></div>

           </div>

     </div>
     <div class="card-body">

     <div lang="ar" className="row">
         
         {/* <div className="col-md-6">
               <div className="form-group mt-2">
                        <label>الفرع</label>
                        <select className='form-control'   onChange={(e)=>setBranches(e.target.value)}>
         <option value="">الرجاء اختيار الفرع</option>
         {Branches.map(option => (
             <option key={option.id} value={option.id} >{option.name}</option>
                        ))}
            </select>
              
               </div>   
         </div> */}
         <div className="col-md-6">
                <div className="form-group mt-2">
                        <label>حجم القاعة</label>
                        
                       <input type='number' 
                        className='form-control' 
                        placeholder='ادخل سعة القاعة  '
                        Value={size} 
                        onChange={(e)=>setSize(e.target.value)}
                        />
                </div>
         </div>

         <div className="col-md-6">
                <div className="form-group mt-2">
                        <label>اسم القاعة</label>
                        
                       <input type='text' 
                        className='form-control' 
                        placeholder='ادخل اسم القاعة  '
                        Value={name} 
                        onChange={(e)=>setSize(e.target.value)}
                        />
                </div>
         </div>



         <div className="col-md-6">
                <div className="form-group mt-2">
                        <label>رمز القاعة</label>
                        
                       <input type='number' 
                        className='form-control' 
                        placeholder='ادخل رمز القاعة  '
                        Value={No} 
                        onChange={(e)=>setNo(e.target.value)}
                        />
                </div>
         </div>

        




 </div>
           
     </div>
     <div class="card-footer text-muted">
          <a href="#" onClick={store} class="btn btn-primary">حفظ</a> 
     </div>
   </div>


</ReactModal> 






</div>  
</Fragment>
    
  );
};





