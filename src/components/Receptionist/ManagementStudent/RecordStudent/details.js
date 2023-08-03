import React ,{Fragment,useEffect,useState} from "react";
import { Container, Row, Col,Table,Button ,Form} from "reactstrap";
import {useNavigate,useLocation,Link,useHistory}  from 'react-router-dom';
import HeaderRecep from "../../HeaderRecep";
import AuthUser from  '../../../Auth/AuthUser';
import QRCode from 'qrcode.react';

function GetRecordStudentdetails () {

    const location = useLocation();
    const dataRow = location.state.data;
	const {http} = AuthUser();

	const [Data, setData] = useState([]); 

///============================
/// loadData
///=============================
useEffect(() => {
  loadData();
       }, []);
  const loadData = async () => {
  debugger
  http.get(`branch_admin/student_subscribes/${dataRow.id}`).then((res)=>{
  setData(res.data.data.data);
  }).catch(function (error) {
  
  });
  };    
  
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
 									<h4>{dataRow.first_name+" "+dataRow.last_name}</h4>
 									<p class="text-secondary mb-1">طالب لدى مؤسسة سورييين ايجابيين بالمطلق</p>
 									<p class="text-muted font-size-sm">{dataRow.name}</p>
 									
 							</div>

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
 						</div>
 					</div>
 					
 				</div>
 			</div>
			 <div class="row">
				
			 <div class="col-lg-4">
				
			 <div class="card">
 								<div class="card-body">
									<div className="row">

									<div className="col-lg-6" dir="rtl">
										<div className="row">
											<div className="col-lg-6">
												<div className="row">
			
			

												</div>
			
											</div>
											<div className="col-lg-6">
											<QRCode value={dataRow.barcode.toString()} style={{width: '20mm',height: '20mm'}}/>
			
											</div>

										</div>
									

									</div>
									<div className="col-lg-6" dir="rtl">
										<div className="row">
										<div className="col-lg-6">
		                                    <h6 className="mb-0">  الأسم  </h6>
	                                    </div>
	                                    <div className="col-lg-6 text">
		                                    <h6 className="text-secondary">{dataRow.first_name+" "+dataRow.last_name}</h6>
	
	                                    </div>

										</div>
										<div className="row">
											
										<div className="col-lg-6">
		                                    <h6 className="mb-0">  البريدالإلكتروني  </h6>
	                                    </div>
	                                    <div className="col-lg-6 text">
		                                    <h6 className="text-secondary">{dataRow.first_name+" "+dataRow.last_name}</h6>
	
	                                    </div>

										</div>

								    </div>

									</div>
									
										
								</div>
				
             </div>
			



			 </div>
			 <div class="col-lg-8">
			 <div class="card">
 								<div class="card-body">
									
                                       <Table dir='rtl' style={{fontSize: "16px",width: "100%"}}>
                                                        <thead style={{background: " linear-gradient(to left, #2980b9, #2c3e50)"}}>
                                                          <tr >
                                                            <th style={{ width: "20%" }}>البدأ</th>
                                                            <th style={{ width: "20%" }}>الإنتهاء</th>
                                                            <th style={{ width: "20%" }}> الدورة</th>
                                                            <th style={{ width: "20%" }}> المدرب</th>
                                                            <th style={{ width: "20%" }}> الفرع</th>
                                                            <th></th>
                                                          </tr>
                                                        </thead>
                                                        <tbody>
                                                          {Data.length === 0 ? (
                                                            <tr>
                                                              <td colSpan={4} className="text-center">
                                                                لا يوجد بيانات
                                                              </td>
                                                            </tr>
                                                          ) : (
                                                            Data.map((data) => (
                                                              <tr key={data.id}>
                                                  
                                                                   
                                                                <td>{data.start}</td>
                                                                <td>{data.end}</td>
                                                              
                                                                <td>{data.subjectName}</td>
                                                
                                                                <td>{data.first_name+" "+data.last_name}</td>
                                                                
                                                                <td>{data.name}</td>
                                                                </tr>
                                                            ))
                                                          )}
                                                        </tbody>
                                       </Table> 
									
									

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

export default GetRecordStudentdetails;



{/* <hr class="my-4"/> */}

{/* <div class="row">
<div class="col-sm-3"></div>
<div class="col-sm-9 text-secondary">
	<input type="button" class="btn btn-primary px-4" value="Save Changes"/>
</div>
</div> */}