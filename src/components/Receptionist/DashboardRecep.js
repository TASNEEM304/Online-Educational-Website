import React ,{Fragment} from "react";
import { Container, Row, Col } from "reactstrap";
import HeaderRecep from "./HeaderRecep" ;
const DashboardRecep = () => {
  return (
    <Fragment>
<HeaderRecep />
<section>
      <Container>

   
      
   <Row>
     <Col lg="6" md="6">
       
     </Col>

     <Col lg="6" md="6">
       <div>
         <h2>About Us</h2>
         <p>
           Lorem ipsum dolor, sit amet consectetur adipisicing elit.
           Excepturi cupiditate animi deserunt libero nesciunt corporis
           explicabo nobis ex quo molestiae!
         </p>

       </div>
     </Col>
   </Row>
      </Container>
    </section>
    </Fragment>
    
  );
};

export default DashboardRecep;
