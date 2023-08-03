import React ,{Fragment,useRef,useEffect} from "react";
import { Container, Row, Col,Table,Button ,Form} from "reactstrap";
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import HeaderRecep from "../HeaderRecep";
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from"../../../assests/images/logo.jpg"

import AuthUser from "../../Auth/AuthUser";
const PaymentReceiptCard = () => {

  const location = useLocation();
  debugger
  const {getToken,getUser} = AuthUser();
  const data = location.state.data;
  const Wrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 100vh;
background-color: #f1f2f6;
`;

const Content = styled.div`
max-width: 400px;
`;

const CardContainer = styled.div`
width: 220.60mm;
height: 90.98mm;
border: 1px solid black;
border-radius: 10px;
background-color: linear-gradient(to right, #2980b9, #550505);
padding: 1cm;
display: flex;
flex-direction: row-reverse;
justify-content: space-between;
text-align: right;
`;

const CardDetailsContainer = styled.div`
display: flex;
flex-direction: column;
`;


const CardDetailsRow = styled.div`
display: flex;
flex-direction: row;
`;


  return (
    <Fragment>
    <HeaderRecep />
    <section>
      
  <div className="container">
 		<div className="main-body">
 			<div className="row" dir="rtl">
				
			    <div className="col-lg-2"></div>
 				<div className="col-lg-8">
 					<div className="card">
 						<div className="card-body">
            <div className="row mb-3" dir="rtl">
                              <div className="col-sm-5">
                              <pre>
                              <h4>
                              {`مؤسسة سوريين إيجابيين   
بالمطلق للتنمية والتدريب
                              `}
                              </h4>

                              </pre>
	                            </div>

								
                              <div className="col-sm-4">
                                  <h4>وصل استلام</h4>
                              </div>
                              <div className="col-sm-3" style={{ textAlign: 'center' }}>
                                  <img src={logo} className="logo" alt="Logo" style={{ height: 'auto', maxWidth: '60%', borderRadius: '50%' }} />
                              </div>
	           </div>
			   
			   <ul className="list-group list-group-flush">
 								<li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
 									<h4 className="mb-0">دفع السيد/ة :</h4>
 									<span className="text-secondary">{data.student_name}</span>
 								</li>
								 <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
								    <h4 className="mb-0"> مبلغا وقدره :</h4>
 									<span className="text-secondary">{data.total_credit}</span>
 								</li>
								 <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
 								    <h4 className="mb-0"> وذلك لقاء   :</h4>
								    <span className="text-secondary">{data.subject_name}</span>
 								</li>
								 <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
								 <h4 className="mb-0"> رقم الهاتف     :</h4>
								    <span className="text-secondary">{data.phone_number}</span>
 								</li>
								 <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
								    <div className="col-sm-3">
						               <h4 className="mb-0">  التاريخ  </h4>
					                </div>
									<div className="col-sm-3 text">
					                  <span className="text-secondary">{data.payment_date}</span>
 								
					                </div>
									<div className="col-sm-3 text">
									    <h4 className="mb-0">  المستلم </h4>
					                </div>
									<div className="col-sm-3 text">
					                  <span className="text-secondary">{getUser().first_name+' '+getUser().last_name}</span>
 								
					                </div>
 								</li>
								
								
								
								
 								
 							</ul>
							 


 						</div>
 					</div>
 					
 				</div>
				
				 <div className="col-lg-2"></div>
 			</div>
 		</div>
  </div> 

</section>
    </Fragment>
    
  );
};

export default PaymentReceiptCard;







// <Wrapper>
// <Content>
//   <CardContainer>
//     <CardDetailsContainer>
      
//       <pre dir="rtl">
//       <h4>
//         {`مؤسسة سوريين إيجابيين   
// بالمطلق للتنمية والتدريب
//         `}
        
//         </h4>
        
//       </pre>


//       دفع السيد:  {data.student_name}
//       {data.total_credit} :  مبلغا وقدره
//       وذلك لقاء:  {data.subject_name}
//       التاريخ:  {data.payment_date}
     
      
//     </CardDetailsContainer>
//     <CardDetailsContainer>
//           <h4>وصل استلام</h4>
//     </CardDetailsContainer>
//     <CardDetailsContainer>
//            <img src={logo} className="logo" alt="Logo" style={{maxWidth:'100px',height:'auto',borderRadius:'50%'}} />
       
//     </CardDetailsContainer>

//   </CardContainer>
  
// </Content>
// </Wrapper>
