import React ,{Fragment,useEffect,useState} from "react";
import { Container, Row, Col,Table,Button ,Form} from "reactstrap";
import {useNavigate,useLocation,Link,useHistory}  from 'react-router-dom';

import HeaderRecep from "../../HeaderBrcMgr";

 export default function GetRecordRecptionsdetails () {


       const location = useLocation();
       const dataRow = location.state.data;
          
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
 									<h4>{dataRow.first_name+" "+dataRow.last_name}</h4>
 									<p class="text-secondary mb-1">موظف لدى مؤسسة سورييين ايجابيين بالمطلق</p>
 									<p class="text-muted font-size-sm">{dataRow.name}</p>
 									
 								</div>
 							</div>


                             <hr class="my-4"/>

 						</div>
 					</div>
 				</div>
 				<div class="col-lg-8">
 					<div class="card">
 						<div class="card-body">
						 <div class="row mb-3" dir="rtl">
	                            <div class="col-sm-3">
	                            	<h6 class="mb-0">الاسم الكامل</h6>
	                            </div>
	                            <div class="col-sm-9 text-secondary">
	                            	<input type="text"
									 class="form-control"
									 readOnly={false}
									 value={dataRow.first_name+" "+dataRow.last_name}/>
	                            </div>
                        </div>
						<div class="row mb-3" dir="rtl">
	                            <div class="col-sm-3">
	                            	<h6 class="mb-0">تاريخ الميلاد</h6>
	                            </div>
	                            <div class="col-sm-9 text-secondary">
	                            	<input type="text" class="form-control" value={dataRow.birth_day}/>
	                            </div>
                        </div>
						<div class="row mb-3" dir="rtl">
	                            <div class="col-sm-3">
	                            	<h6 class="mb-0">البريد الإلكتروني</h6>
	                            </div>
	                            <div class="col-sm-9 text-secondary">
	                            	<input type="text" class="form-control" value={dataRow.email}/>
	                            </div>
                        </div>
						<div class="row mb-3" dir="rtl">
	                            <div class="col-sm-3">
	                            	<h6 class="mb-0">رقم الهاتف </h6>
	                            </div>
	                            <div class="col-sm-9 text-secondary">
	                            	<input type="text" class="form-control" value={dataRow.phone_number}/>
	                            </div>
                        </div>
 							<div class="row">
 								<div class="col-sm-3"></div>
 								
 							</div>
                                                 
 							<div class="row">
 								<div class="col-sm-3"></div>
 								
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

