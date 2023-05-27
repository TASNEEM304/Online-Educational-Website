// import React from 'react';
// import styled from 'styled-components';
// import Barcode from 'react-barcode';
// import { useLocation } from 'react-router-dom';

// const StyledCard = styled.div`
//   background-color: #ffffff;
//   border-radius: 10px;
//   box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
//   padding: 20px;
// `;

// const Name = styled.h2`
//   color: #2c3e50;
//   font-size: 24px;
//   margin-top: 0;
// `;

// const Info = styled.p`
//   color: #7f8c8d;
//   font-size: 16px;
//   margin: 5px 0;
// `;

// const BarcodeWrapper = styled.div`
//   display: flex;
//   justify-content: center;
// `;

// const RedBarcode = styled(Barcode)`
//   rect {
//     fill: #e74c3c;
//   }
// `;

// const BlueBarcode = styled(Barcode)`
//   rect {
//     fill: #3498db;
//   }
// `;

// export default function Card (){
    
//     const location = useLocation();
//     const data = location.state.data;
//     console.log(data)
  
//   return (
//     <StyledCard >

//       <Name>{data.user.name}</Name>
//       <Info>Email: {data.user.email}</Info>
//       <Info>Phone: {data.user.phone_number}</Info>
//       <BarcodeWrapper>
//         {data.barcodeColor === 'red' ? (
//           <RedBarcode value={data.card.original.data.barcode} />
//         ) : (
//           <BlueBarcode value={data.card.original.data.barcode} />
//         )}
//       </BarcodeWrapper>
//     </StyledCard>
//   )
// };

import React ,{Fragment,useEffect,useState} from "react";
import { Container, Row, Col,Table,Button ,Form} from "reactstrap";
import HeaderRecep from "../HeaderRecep";
import Barcode from 'react-barcode';
import { useLocation } from 'react-router-dom';

function BarcodeCard () {

        const location = useLocation();
    const data = location.state.data;

    return (
    <Fragment>
<HeaderRecep />
<section>
      <Container>

   
      
   <Row>
     <Col lg="12" md="6" lang="ar" style={{marginTop:"10px" ,   textAlign: 'right'}}>
     
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <div style={{ width: '10cm', height: '7cm', border: '1px solid black', borderRadius: '10px',backgroundColor:'rgba(226, 248, 248, 0.664)', padding: '1cm', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <p> {data.user.first_name} : الاسم </p>
          <p> {data.user.email} : الايميل</p>
          <p> {data.user.phone_number}  : رقم الهاتف</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Barcode value={data.card.original.data.barcode} width={1} height={30}/>
        </div>
      </div>
    </div>

     </Col>

     
   </Row>
      </Container>
    </section>
    </Fragment>
 
 );
};

export default BarcodeCard;