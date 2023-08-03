
import React ,{Fragment,useRef,useEffect} from "react";
import { Container, Row, Col,Table,Button ,Form} from "reactstrap";
import HeaderRecep from "../HeaderRecep";
import Barcode from 'react-barcode';
import QRCode from 'qrcode.react';
import { useLocation } from 'react-router-dom';
import logo from"../../../assests/images/logo.jpg"

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

    return (
    <Fragment>
<HeaderRecep />

<Wrapper>
      <Content>
        <CardContainer>
          <CardDetailsContainer>
          <img src={logo} className="logo" alt="Logo" style={{maxWidth:'100px',height:'auto',borderRadius:'50%'}} />
  
            <p> الاسم:  {data.user.first_name}</p>
            <p>{data.user.phone_number} : رقم الهاتف</p>
            <p>{data.user.email} : الايميل</p>
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
