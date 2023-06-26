import React from 'react';
import { Card, Button } from 'react-bootstrap';
import QRCode from 'qrcode.react';
import studentAvatar from './../../../assests/images/logo.jpg';

const Cardexample = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f2f2f2',
      }}
    >
      <Card style={{ width: '20rem' }} dir="rtl">
        <Card.Img variant="top" src={studentAvatar} />
        <Card.Body>
          <Card.Title dir="rtl">بطاقة الطالب</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">فرع صحنايا</Card.Subtitle>
          <Card.Text>اسم الطالب:تسنيم الشيخ محمد</Card.Text>
          <Card.Text>رقم الهاتف:092345678</Card.Text>
          <Card.Text>الايميل:tasneem@gmail.com</Card.Text>
          <QRCode value="https://www.example.com" style={{ float: 'left' }} />
          {/* <Button variant="primary">طباعة</Button> */}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Cardexample;