import React ,{Fragment} from "react";
import { Container, Row, Col } from "reactstrap";
import HeaderTrainer from "./HeaderTrainer" ;

const DashboardTrainers = () => {
  return (
    <Fragment>
<HeaderTrainer />
<section>
      <Container>

   
      
   <Row>
     <Col lg="6" md="6">
       
     </Col>

     <Col lg="6" md="6">
       <div>
         <h2> المدربين</h2>
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

export default DashboardTrainers;
