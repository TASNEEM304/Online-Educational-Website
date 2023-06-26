import React from 'react';
import './Invoice.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from"../../assests/images/logo.jpg"

const GetPaymentCard = () => {
  const invoiceData = {
    invoiceNumber: '1234',
    billToName: ' تسنيم الشيخ محمد',
    billTobrice: '75000',
    billTosubject: 'برمجة1 ',
    billTophone: '09414457',
    
    shipToName: ' الاء العش',
    shipToAddress: '456 Elm St',
    shipToCity: 'أي بلدة',
    shipToState: 'كاليفورنيا',
    shipToZip: '12345',
    items: [
      { id: 1, name: 'العنصر 1', quantity: 2, price: 10 },
      { id: 2, name: 'العنصر 2', quantity: 1, price: 20 }
    ],
    footerMessage: 'المبلغ المدفوع يرد قبل بدء الدورة أو في حال الغاء الدورة من قبل المؤسسة',
     // شعار الشركة
  };

  return (
    <div className="invoice" dir="ltr">
      <div className="invoice-header">
        <img src={logo} width="200" alt="شعار الشركة" /> {/* عنصر الصورة */}
        <h1>الفاتورة #{invoiceData.invoiceNumber}</h1>
      </div>
      <div className="invoice-body">
        <div className="row">
        
          <div className="col-md-6">
            <h2> معلومات الاستلام:</h2>
            <p>المستلم:{invoiceData.shipToName}</p>
            <p>تاريخ التسليم:{invoiceData.shipToAddress}</p>
            <p>العنوان:{invoiceData.shipToCity}</p>
          </div>
          <div className="col-md-6">
            <h2>الفاتورة إلى:</h2>
            <p>السيد/ة{invoiceData.billToName}</p>
            <p>المبلغ المدفوع:{invoiceData.billTobrice}</p>
            <p>المادة:{invoiceData.billTosubject}</p>
            <p>رقم الهاتف:{invoiceData.billTophone}</p>
          </div>
        </div>
        <table className="table">
          <thead>
            <tr>
                
              <th>السعر</th>
              <th>المادة العلمية</th>
           
            
            </tr>
          </thead>
          <tbody>
            {invoiceData.items.map(item => (
              <tr key={item.id}>
                  <td>${item.price}</td>
                <td>{item.name}</td>
              
              
              
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="invoice-footer">
        <p>{invoiceData.footerMessage}</p>
      </div>
    </div>
  );
};

export default GetPaymentCard;