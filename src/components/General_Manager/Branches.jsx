import React ,{Fragment,useEffect,useState} from "react";
import { Container, Row, Col,Table,Button ,Form} from "reactstrap";
import Header from "./Header";
import ReactPaginate from 'react-paginate';
import axios from 'axios'
import ReactModal from 'react-modal';
import * as AiIcons from "react-icons/ai";
import AuthUser from  '../Auth/AuthUser';
const Getbranches = () => {

  const {http} = AuthUser();
  const [No ,setNo] = useState("");
  const [name ,setName] = useState("");
  const [searchTerm, setSearchTerm] = useState("null");
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  
  const pageCount = 20;

///============================
/// store
///=============================
  const store = async (e) => {
    debugger
    e.preventDefault()
    http.post('branch/store',{No:No,name:name}).catch(function (error) {

  });
  setNo('');
  setName('');
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

///============================
/// loadData
///=============================
useEffect(() => {
  loadData();
}, []);
const loadData = async () => {
  http.get(`branch/search/${searchTerm}?page=1`).then((res)=>{
    setData(res.data.data.data);
   }).catch(function (error) {

   }); 
};
///============================
/// handlePageClick
///=============================

const handlePageClick = async ({ selected }) => {
http.get(`branch/search/${searchTerm}?page=${selected+1}`).then((res)=>{
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
<Header />

<Container>
    
   <Row>
    
     <Col lg="12" lang="ar">

       
     <div className="card" style={{  textAlign: 'right' , height: '500px' ,fontSize: "10px",background: '#f8f9fa', marginTop:'15px'}}>
               <div className="card-header">
                <div className="row">
                <div className="col-md-6">

<div className="input-group mb-2">
  <input
    type="text"
    className="form-control"
    placeholder="Search"
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
<div className="col-md-6">
<Button variant="success" onClick={openModal} style={{

}}>أضف فرع جديد

</Button>
</div>

                </div>
             

              </div>
              <div className="card-body"style={{fontSize: "16px", 
                         width: "100%",
                         height : "100%",
                         padding: "0"
                         }}>
                   
                   
              <Table striped bordered hover  style={{fontSize: "16px", 
                         width: "100%"
                         }}>
        <thead style={{background:"#aaac",
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
  
                          
                <td>

                {!editing || editedItem.id !== data.id ? (
                  <button onClick={() => handleEditClick(data)}>Edit</button>
                ) : (
                  <>
                    <button onClick={handleSaveClick}>Save</button>
                    <button onClick={handleCancelClick}>Cancel</button>
                  </>
                )}
                <AiIcons.AiFillDelete onClick={() => Delete(data.id)} style={{ color: 'red' , width : '10%' , height: '10%' ,alignItems:"center" }} />
                   
              </td>
                <td>{editing && editedItem.id === data.id ? <input type="text" name="name" value={editedItem.name} onChange={handleInputChange} /> : data.name}</td>
                <td>{editing && editedItem.id === data.id ? <input type="text" name="no" value={editedItem.No} onChange={handleInputChange} /> : data.No}</td>
    
              </tr>
            ))
          )}
        </tbody>
      </Table>
              </div>
              <div className="card-footer text-muted">
                  
              <ReactPaginate
        pageCount={6} // Total number of pages
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

      
</Fragment>
    
  );
};

export default Getbranches;




{/* <Button variant="success" onClick={openModal} style={{fontSize: "10px", 
               
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
  
                          
                <td>

                {!editing || editedItem.id !== data.id ? (
                  <button onClick={() => handleEditClick(data)}>Edit</button>
                ) : (
                  <>
                    <button onClick={handleSaveClick}>Save</button>
                    <button onClick={handleCancelClick}>Cancel</button>
                  </>
                )}
                <AiIcons.AiFillDelete onClick={() => Delete(data.id)} style={{ color: 'red' , width : '10%' , height: '10%' ,alignItems:"center" }} />
                   
              </td>
                <td>{editing && editedItem.id === data.id ? <input type="text" name="name" value={editedItem.name} onChange={handleInputChange} /> : data.name}</td>
                <td>{editing && editedItem.id === data.id ? <input type="text" name="no" value={editedItem.No} onChange={handleInputChange} /> : data.No}</td>
    
              </tr>
            ))
          )}
        </tbody>
      </Table>
      <div>
      <ReactPaginate
        pageCount={6}
        onPageChange={handlePageClick}
        forcePage={currentPage}
        containerClassName="pagination"
        activeClassName="active"
      />
      </div> */}

      

{/* <div className="container">
    <div className="row">
        <div className="col-md-offset-1 col-md-10">
            <div className="panel">
                <div className="panel-heading">
                    <div className="row">
                        <div className="col col-sm-3 col-xs-12">
                            <h4 className="title">Data <span>List</span></h4>
                        </div>
                        <div className="col-sm-9 col-xs-12 text-right">
                            <div className="btn_group">
                                <input type="text" className="form-control" placeholder="Search"/>
                                <button className="btn btn-default" title="Reload"><i className="fa fa-sync-alt"></i></button>
                                <button className="btn btn-default" title="Pdf"><i className="fa fa-file-pdf"></i></button>
                                <button className="btn btn-default" title="Excel"><i className="fas fa-file-excel"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="panel-body table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Full Name</th>
                                <th>Age</th>
                                <th>Job Title</th>
                                <th>City</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Vincent Williamson</td>
                                <td>31</td>
                                <td>iOS Developer</td>
                                <td>Sinaai-Waas</td>
                                <td>
                                    <ul className="action-list">
                                        <li><a href="#" data-tip="edit"><i className="fa fa-edit"></i></a></li>
                                        <li><a href="#" data-tip="delete"><i className="fa fa-trash"></i></a></li>
                                    </ul>
                                </td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Taylor Reyes</td>
                                <td>22</td>
                                <td>UI/UX Developer</td>
                                <td>Baileux</td>
                                <td>
                                    <ul className="action-list">
                                        <li><a href="#" data-tip="edit"><i className="fa fa-edit"></i></a></li>
                                        <li><a href="#" data-tip="delete"><i className="fa fa-trash"></i></a></li>
                                    </ul>
                                </td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>Justin Block</td>
                                <td>26</td>
                                <td>Frontend Developer</td>
                                <td>Overland Park</td>
                                <td>
                                    <ul className="action-list">
                                        <li><a href="#" data-tip="edit"><i className="fa fa-edit"></i></a></li>
                                        <li><a href="#" data-tip="delete"><i className="fa fa-trash"></i></a></li>
                                    </ul>
                                </td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td>Sean Guzman</td>
                                <td>26</td>
                                <td>Web Designer</td>
                                <td>Gloucester</td>
                                <td>
                                    <ul className="action-list">
                                        <li><a href="#" data-tip="edit"><i className="fa fa-edit"></i></a></li>
                                        <li><a href="#" data-tip="delete"><i className="fa fa-trash"></i></a></li>
                                    </ul>
                                </td>
                            </tr>
                            <tr>
                                <td>5</td>
                                <td>Keith Carter</td>
                                <td>20</td>
                                <td>Graphic Designer</td>
                                <td>Oud-Turnhout</td>
                                <td>
                                    <ul className="action-list">
                                        <li><a href="#" data-tip="edit"><i className="fa fa-edit"></i></a></li>
                                        <li><a href="#" data-tip="delete"><i className="fa fa-trash"></i></a></li>
                                    </ul>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="panel-footer">
                    <div className="row">
                        <div className="col col-sm-6 col-xs-6">showing <b>5</b> out of <b>25</b> entries</div>
                        <div className="col-sm-6 col-xs-6">
                            <ul className="pagination hidden-xs pull-right">
                                <li><a href="#"></a></li>
                                <li className="active"><a href="#">1</a></li>
                                <li><a href="#">2</a></li>
                                <li><a href="#">3</a></li>
                                <li><a href="#">4</a></li>
                                <li><a href="#">5</a></li>
                                <li><a href="#"></a></li>
                            </ul>
                            <ul className="pagination visible-xs pull-right">
                                <li><a href="#"></a></li>
                                <li><a href="#"></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div> */}

