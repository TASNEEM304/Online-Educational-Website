import React ,{Fragment,useEffect,useState} from "react";
import { Container, Row, Col,Table,Button ,Form} from "reactstrap";
import HeaderRecep from "../../HeaderBrcMgr";

 export default function GetRecordRecptionsdetails () {


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
 								<img src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="Admin" class="rounded-circle p-1 bg-primary" width="110"/>
 								<div class="mt-3">
 									<h4> موظف الاستقبال</h4>
 									
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

         <input type="text" class="form-control" value="@"/>


 </div>
           
    








</div>
</div>

                           
 							
                              
 					
                
                	</div>
 							
 						</div>
 					</div>
 					<div class="row">
 						<div class="col-sm-12">
 						</div>
 					</div>
 				</div>
 			
 		
  

    </section>
    </Fragment>
 
 );
};

