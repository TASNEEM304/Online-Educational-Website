
import React ,{Fragment,useRef,useEffect} from "react";
import { Container, Row, Col,Table,Button ,Form} from "reactstrap";
import HeaderRecep from "../HeaderRecep";
import Barcode from 'react-barcode';
import QRCode from 'qrcode.react';
import { useLocation } from 'react-router-dom';

import styled from 'styled-components';
import Card from './Card';
import JsBarcode from 'jsbarcode';
//import ReactToPrint from 'react-to-print';
function BarcodeCard () {

        const location = useLocation();
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
  width: 120.60mm;
  height: 70.98mm;
  border: 1px solid black;
  border-radius: 10px;
  background-color: rgba(226, 248, 248, 0.664);
  padding: 1cm;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  text-align: right;
`;

const CardDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const QRCodeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const QRCodeImage = styled(QRCode)`
  width: 40mm;
  height: 40mm;
`;

  // function BarcodeCard () {
  //   const location = useLocation();
  //   const data = location.state.data;
  
    // return (
    //   <Wrapper>
    //     <Content>
    //       <CardContainer>
    //         <div>
    //           <p>{data.user.first_name}: الاسم</p>
    //           <p>{data.user.email}: الايميل</p>
    //           <p>{data.user.phone_number}: رقم الهاتف</p>
    //         </div>
    //         <BarcodeContainer>
    //           <QRCode value={data.card.original.data.barcode.toString()} />
    //         </BarcodeContainer>
    //       </CardContainer>
    //     </Content>
    //   </Wrapper>
    // );
  //};
    return (
    <Fragment>
<HeaderRecep />

<Wrapper>
      <Content>
        <CardContainer>
          <CardDetailsContainer>
            <p>{data.user.phone_number}: رقم الهاتف</p>
            <p>{data.user.email}: الايميل</p>
            <p>{data.user.first_name}: الاسم</p>
          </CardDetailsContainer>
          <QRCodeContainer>
            <QRCodeImage value={data.card.original.data.barcode.toString()} />
          </QRCodeContainer>
        </CardContainer>
      </Content>
    </Wrapper>
      </Fragment>
 
 );
};

export default BarcodeCard;

{/* 
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
         
          <QRCode value={data.card.original.data.barcode.toString()}/>
          
          </div>
      </div>
    </div>

     </Col>

     
   </Row>
      </Container>
    </section> */}










// <Wrapper>
// <Content>
//   <Card
//     name={data.user.first_name}
//     email={data.user.email}
//     phone={data.user.phone_number}
//     barcodeValue={data.card.original.data.barcode}
//     barcodeColor="red"
//   />
//   <QRCode value="http://example.com" />
 
// </Content>
// </Wrapper>