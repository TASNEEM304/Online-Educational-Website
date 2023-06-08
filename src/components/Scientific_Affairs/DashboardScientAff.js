import React ,{Fragment} from "react";
import { Container, Row, Col } from "reactstrap";
import HeaderSiectAff from "./HeaderSiectAff" ;
const DashboardScientAff = () => {
  return (
    <Fragment>
<HeaderSiectAff />
<section>
      <Container>

   
      
   <Row>
     <Col lg="6" md="6">
       
     </Col>

     <Col lg="6" md="6">
       <div>
         <h2> ادارة الشؤون العلمية</h2>
         <p>
          
         </p>

       </div>
     </Col>
   </Row>
      </Container>
    </section>
    </Fragment>
    
  );
};

export default DashboardScientAff;
