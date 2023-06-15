import React,{ useState,useEffect,Fragment } from "react";
import {useNavigate,Link,useHistory}  from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { Container, Row, Col,Table,Button ,Form} from "reactstrap";
import ReactModal from 'react-modal';
import * as AiIcons from "react-icons/ai";
import HeaderRecep from "../../HeaderBrcMgr" ;
import AuthUser from  '../../../Auth/AuthUser';
import "./Style.css";

export default function GetRecordRecptions() {
    
    const {http} = AuthUser();
    const [first_name,setFirstName] = useState();
    const [last_name,setLastName] = useState();
    const [roll_number,setRoll] =useState();
    const [birth_day,setBirthDay] =useState();
    const [branch_id,setBranchId] =useState();
    const [phone_number,setPhone] =useState();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [Branches,setbranches] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const history = useNavigate();
    
    
///============================
/// Modal
///=============================

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

///============================
/// Getbranches
///=============================
      useEffect(()=>{
        const Getbranches = async ()=>{
          http.get('branch/index').then((res)=>{
           setbranches(res.data.data.data);
        });
      }
        Getbranches();
      },[])

///============================
/// loadData
///=============================
      useEffect(() => {
        const loadData = async () => {
          http.get(`user/search/samar?page=1`).then((res)=>{
            setData(res.data.data);
            setCurrentPage(1);
           }).catch(function (error) {
    
           }); 
        };
      
        loadData();
      }, []);

///============================
/// handlePageClick
///=============================
    
const handlePageClick = async ({ selected }) => {
  http.get(`user/search/samar?page=${selected}`).then((res)=>{
    setData(res.data.data);
    setCurrentPage(selected);
   }).catch(function (error) {

   });
};

///============================
/// store
///=============================
    const submitForm = () =>{
      
        http.post('register',{roll_number:roll_number,first_name:first_name,last_name:last_name,birth_day:birth_day,branch_id:branch_id,phone_number:phone_number,email:email,password:password}).then((res)=>{
          const data=res.data;
          history('/Cards/index' , { state : { data } });
        }).catch(function (error) {
          console.log(error);
          });
       
    }
///============================
/// Delete
///=============================

    const Delete= async (id) =>{
  
    http.post(`branch/destroy/${id}`).then((res)=>{
       alert(res.data.message);
    })
 }


    
  
    return(


<Fragment>
<HeaderRecep />
    <section>
      <Container>

   
      
          <Row>
               <Col lg="12" md="6" lang="ar" style={{marginTop:"5px" ,   textAlign: 'right'}}>

      
                <Button variant="success" onClick={openModal} style={{fontSize: "10px", 
                         
                         }}>أضف طالب جديد
                        
                </Button>
                                
                                <br/>
                <Table striped bordered hover  style={{fontSize: "16px", 
                         width: "100%"
                         }}>
                    <thead style={{background:"#ece24c",
                    }}>
                      <tr >
                        <th ></th>

                        
                        <th>الأسم الثاني</th>
                        <th >الأسم الأول</th>
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
                    data.data.map((data) => (
                      <tr key={data.id}>
                          <td style={{width:"20%"}}>
                {/* <AiIcons.AiFillDelete onClick={() => Delete(data.id)} style={{ color: 'red' , width : '10%' , height: '10%' ,alignItems:"center" }} /> */}
                             
                  <Button variant="danger" onClick={() => Delete(data.id)}>حذف</Button>
                  {/* <Button variant="primary" href={`/Branches/edit/${data.id}`}>تحرير</Button> */}
                          </td>
          
                          <td style={{width:"50%"}}>{data.last_name}</td>
                          <td style={{width:"50%"}}>{data.first_name}</td>
                          <td style={{width:"30%"}}>{data.No}</td>
                      </tr>
                    ))
          )}
                    </tbody>
                </Table>
                {/* Render DataDisplay component with data */}
                <ReactPaginate
                  pageCount={6} // Total number of pages
                  onPageChange={handlePageClick}
                  forcePage={currentPage}
                  containerClassName="pagination"
                  activeClassName="active"
                />
      
               </Col>

     
          </Row>
    
          <ReactModal isOpen={modalIsOpen} onRequestClose={closeModal} 
                      style={{
                   content: {
                   width: '70%',
                   height : '80%',
                   position: 'absolute',
                   top: '50%',
                   left: '50%',
                   transform: 'translate(-50%, -50%)',
                   padding: '20px',
                   border:'10px',
                             }}}
                       >
        
        
            <div class="card" style={{  textAlign: 'right'  }}>
               <div class="card-header">

                    <div className="row">
                        <div className="col-md-6">اضافة موظف</div>
                        <div className="col-md-6">
                        <AiIcons.AiOutlineClose onClick={closeModal} style={{  width: '5%' , height : '5%' }} />
                        </div>

                    </div>

              </div>
              <div class="card-body">
                    <div className="row">
                        <div className="col-md-6">
                              <div className="form-group mt-2">
                                       <label>:الاسم الأول</label>
                                       <input type="text" className="form-control" placeholder="Enter first_name"
                                           onChange={e=>setFirstName(e.target.value)}
                                       id="first_name" />
                              </div>   
                        </div>
                        <div className="col-md-6">
                               <div className="form-group mt-2">
                                       <label>:الاسم الثاني</label>
                                       <input type="text" className="form-control" placeholder="Enter last_name"
                                           onChange={e=>setLastName(e.target.value)}
                                       id="last_name" />
                               </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                                <div className="form-group mt-2">
                                       <label>:تاريخ الولادة</label>
                                       <input type="date" className="form-control" placeholder="Enter birth_day"
                                           onChange={e=>setBirthDay(e.target.value)}
                                       id="birth_day" />
                                </div>  
                        </div>
                        <div className="col-md-6">
                                
                                <div className="form-group mt-2">
                                       <label>:رقم الهاتف</label>
                                       <input type="number" className="form-control" placeholder="Enter phone_number"
                                           onChange={e=>setPhone(e.target.value)}
                                       id="phone_number" />
                                </div>
                        </div>
 
                    </div>

                    <div className="row">
                       
                        <div className="col-md-6">
                                <div className="form-group mt-2">
                                       <label>:الإيميل</label>
                                       <input type="email" className="form-control" placeholder="Enter email"
                                           onChange={e=>setEmail(e.target.value)}
                                       id="email" />
                                </div>
                        </div>
                        <div className="col-md-6">
                                <div className="form-group mt-2">
                                       <label>:كلمة المرور</label>
                                       <input type="password" className="form-control" placeholder="Enter password"
                                           onChange={e => setPassword(e.target.value)}
                                       id="pwd" />
                                </div>
                        </div>
                    </div>

                    <div className="row">

                        <div className="col-md-6">
                                <div className="form-group mt-2">
                                        <label>:دوره</label>
                                        <input type="number" className="form-control" placeholder="Enter roll_number"
                                            onChange={e=>setRoll(e.target.value)}
                                       id="roll_number" />
                                </div>
                        </div>
                        <div className="col-md-6">
                               
                                <div className="form-group mt-4">
                                </div>
                                <div className="form-group mt-4">
                                        
                                        <select  onChange={(e)=>setBranchId(e.target.value)}>
                                                   <option value="">                        </option>
                                                   {Branches.map(option => (
                                                     <option key={option.id} value={option.id} >{option.name}</option>
                                                   ))}
                                           </select>
                                           <label>:الفرع</label>
                                </div>
                        </div>
                    
                    </div>
                    
              </div>
              <div class="card-footer text-muted">
                   <a href="#" onClick={submitForm} class="btn btn-primary">حفظ</a> 
              </div>
            </div>

        
          </ReactModal> 


      </Container>
    </section> 
</Fragment>
    )
}
{/* <div class="container">
		<div class="main-body">
			<div class="row">
				<div class="col-lg-4">
					<div class="card">
						<div class="card-body">
							<div class="d-flex flex-column align-items-center text-center">
								<img src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="Admin" class="rounded-circle p-1 bg-primary" width="110"/>
								<div class="mt-3">
									<h4>John Doe</h4>
									<p class="text-secondary mb-1">Full Stack Developer</p>
									<p class="text-muted font-size-sm">Bay Area, San Francisco, CA</p>
									<button class="btn btn-primary">Follow</button>
									<button class="btn btn-outline-primary">Message</button>
								</div>
							</div>


                            <hr class="my-4"/>

							<ul class="list-group list-group-flush">
								<li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
									<h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-globe me-2 icon-inline"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>Website</h6>
									<span class="text-secondary">https://bootdey.com</span>
								</li>
								<li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
									<h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-github me-2 icon-inline"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>Github</h6>
									<span class="text-secondary">bootdey</span>
								</li>
								<li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
									<h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-twitter me-2 icon-inline text-info"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>Twitter</h6>
									<span class="text-secondary">@bootdey</span>
								</li>
								<li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
									<h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-instagram me-2 icon-inline text-danger"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>Instagram</h6>
									<span class="text-secondary">bootdey</span>
								</li>
								<li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
									<h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-facebook me-2 icon-inline text-primary"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>Facebook</h6>
									<span class="text-secondary">bootdey</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div class="col-lg-8">
					<div class="card">
						<div class="card-body">
							<div class="row mb-3">
								<div class="col-sm-3">
									<h6 class="mb-0">Full Name</h6>
								</div>
								<div class="col-sm-9 text-secondary">
									<input type="text" class="form-control" value="John Doe"/>
								</div>
							</div>
							<div class="row mb-3">
								<div class="col-sm-3">
									<h6 class="mb-0">Email</h6>
								</div>
								<div class="col-sm-9 text-secondary">
									<input type="text" class="form-control" value="john@example.com"/>
								</div>
							</div>
							<div class="row mb-3">
								<div class="col-sm-3">
									<h6 class="mb-0">Phone</h6>
								</div>
								<div class="col-sm-9 text-secondary">
									<input type="text" class="form-control" value="(239) 816-9029"/>
								</div>
							</div>
							<div class="row mb-3">
								<div class="col-sm-3">
									<h6 class="mb-0">Mobile</h6>
								</div>
								<div class="col-sm-9 text-secondary">
									<input type="text" class="form-control" value="(320) 380-4539"/>
								</div>
							</div>
							<div class="row mb-3">
								<div class="col-sm-3">
									<h6 class="mb-0">Address</h6>
								</div>
								<div class="col-sm-9 text-secondary">
									<input type="text" class="form-control" value="Bay Area, San Francisco, CA"/>
								</div>
							</div>
							<div class="row">
								<div class="col-sm-3"></div>
								<div class="col-sm-9 text-secondary">
									<input type="button" class="btn btn-primary px-4" value="Save Changes"/>
								</div>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-sm-12">
							<div class="card">
								<div class="card-body">
									<h5 class="d-flex align-items-center mb-3">Project Status</h5>
									<p>Web Design</p>
									<div class="progress mb-3"  style={{height: "5px" , width: '66%'}}>
										<div class="progress-bar bg-primary" role="progressbar"  aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
									</div>
									<p>Website Markup</p>
									<div class="progress mb-3"  style={{height: "5px" , width: '66%'}}>
										<div class="progress-bar bg-danger" role="progressbar"  aria-valuenow="72" aria-valuemin="0" aria-valuemax="100"></div>
									</div>
									<p>One Page</p>
									<div class="progress mb-3"  style={{height: "5px" , width: '66%'}}>
										<div class="progress-bar bg-success" role="progressbar"  aria-valuenow="89" aria-valuemin="0" aria-valuemax="100"></div>
									</div>
									<p>Mobile Template</p>
									<div class="progress mb-3"  style={{height: "5px" , width: '66%'}}>
										<div class="progress-bar bg-warning" role="progressbar" aria-valuenow="55" aria-valuemin="0" aria-valuemax="100"></div>
									</div>
									<p>Backend API</p>
									<div class="progress" style={{height: "5px" , width: '66%'}}>
										<div class="progress-bar bg-info" role="progressbar"  aria-valuenow="66" aria-valuemin="0" aria-valuemax="100"></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
</div> */}


    






