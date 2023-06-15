import React ,{Fragment,useEffect,useState} from "react";
import { Container, Row, Col,Table,Button ,Form} from "reactstrap";
import HeaderRecep from "../../../components/Branch_Manger/HeaderBrcMgr";

export default function GetTrainerdetails () {


    return (
    <Fragment>
<HeaderRecep />
<section>
      
  <div class="container">
 		<div class="main-body">
 			<div class="row">
 				<div class="col-lg-4">
 					<div class="card">
 						<div class="card-body">
 							<div class="d-flex flex-column align-items-center text-center">
 								<img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" class="rounded-circle p-1 bg-primary" width="110"/>
 								<div class="mt-3">
 									<h4> المدرب</h4>
 									<p class="text-secondary mb-1">  مدرب معتمد لدى سوريين ايجابيين بالمطلق</p>
 									{/* <p class="text-muted font-size-sm">Bay Area, San Francisco, CA</p>
 									<button class="btn btn-primary">Follow</button>
 									<button class="btn btn-outline-primary">Message</button> */}
 								</div>
 							</div>


                             <hr class="my-4"/>

 							<ul class="list-group list-group-flush">
 								<li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
 									<h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-globe me-2 icon-inline"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>البريد الالكتروني</h6>
 									<span class="text-secondary">https://bootdey.com</span>
 								</li>
 								<li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
 									<h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-github me-2 icon-inline"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>واتساب</h6>
 									<span class="text-secondary">bootdey</span>
 								</li>
 								
 							</ul>
 						</div>
 					</div>
 				</div>
 				<div class="col-lg-8">
                 <div class="card">
 						<div class="card-body">



                         <div lang="ar" className="row">
         
         <div className="col-md-6">
               <div className="form-group mt-2">
                        <label>الأسم الأول </label>
                        <input type='text' 
                               className='form-control' 
                               placeholder='ادخل الأسم الأول '
                               
                              
                               />
               </div>   
         </div>
         <div className="col-md-6">
                <div className="form-group mt-2">
                        <label>الأسم الثاني</label>
                        
                       <input type='text' 
                        className='form-control' 
                        placeholder='ادخل الاسم الثاني '
                      
                        />
                </div>
         </div>

         <div className="col-md-6">
                <div className="form-group mt-2">
                        <label>رقم الهاتف </label>
                        
                       <input type='text' 
                        className='form-control' 
                        placeholder='ادخل رقم الهاتف  '
                      
                        />
                </div>
         </div>
         <div className="col-md-6">
                <div className="form-group mt-2">
                        <label>تاريخ الولادة  </label>
                        
                        
                      <input type="date" class="form-control" value="//"/>
 
                </div>
         </div>

         <div className="col-md-6">
                <div className="form-group mt-2">
                        <label> الايميل  </label>
                        
                        
                        <input type="text" class="form-control" value="@"/>
 
                </div>
         </div>
         <div className="col-md-6">
                <div className="form-group mt-2">
                        <label> الفرع  </label>
                        
                        
                        <input type="text" class="form-control" value=""/>
 
                </div>
         </div>

       


 </div>
           
    








</div>
</div>
 					<div class="row">
 						<div class="col-sm-12">
 							
                         <div className="card" style={{   textAlign: 'right' ,height: '500px' ,fontSize: "10px",background: '#f8f9fa', marginTop:'15px'}}>
               <div className="card-header">
                <div className="row">
                
                <div className="col-md-4">

<div className="input-group mb-2">
  <input
    type="text"
    className="form-control"
    placeholder="إبحث عن اسم أو رقم"
    // value={searchTerm}
    // onChange={handleSearchChange}
    
  />
  <div className="input-group-append">
    <span className="input-group-text">
    {/* <AiIcons.AiOutlineSearch onClick={handleSearchClick} style={{ fontSize:'30px',alignItems:"center" }} /> */}

    </span>
  </div>
  
                
</div>
</div>
<div className="col-md-2">
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
            <th style={{ width: "50%" }}>الاسم</th>
            <th style={{ width: "30%" }}>الرقم</th>
          </tr>
        </thead>
        <tbody>
          {/* {data.length === 0 ? (
            <tr>
              <td colSpan={3} className="text-center">
                
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
                <td>{editing && editedItem.id === data.id ? <input type="text" name="name" value={editedItem.name} onChange={handleInputChange} /> : data.name}</td>
                <td>{editing && editedItem.id === data.id ? <input type="text" name="no" value={editedItem.No} onChange={handleInputChange} /> : data.No}</td>
    
              </tr>
            ))
          )} */}
        </tbody>
              </Table>
              </div>
    
 		
</div>
</div>
</div>
</div>
</div>
</div>
</div>
    </section>
    </Fragment>
 
 );
};

