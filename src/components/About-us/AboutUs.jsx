
import React ,{Fragment,useEffect,useState} from "react";
import "./about.css";
import { Container, Row, Col,Form, Button} from "reactstrap";

import aboutImg from "../../assests/images/about-us.png";
import CountUp from "react-countup";
import "./about.css";


import Header from "../Header/Header";
const AboutUs = () => {
  return (
    <Fragment>
<Header />
<section>
      <Container>
    
        <Row>
          <Col lg="6" md="6">
            <div className="about__img">
              <img src={aboutImg} alt="" className="w-100" />
            </div>
          </Col>

          <Col lg="6" md="6">
            <div className="about__content">
              <h2>هل ترغب في الاشتراك بدوراتنا التدريبية
              <br/>
                <div className="about__conten">

                
                 <br/>  املأ الاستبيان من فضلك
                </div>
                </h2>
             
           
              
</div>
<br/>

<div lang="ar" className="row">
                  
                  <div className="col-md-6">
                        <div className="form-group mt-2">
                                 <label>الاسم الثلاثي بالعربية</label>
                                 <input type='text' 
                                        className='form-control' 
                                        placeholder='ادخل الاسم الثلاثي باللغة العربية '
                                      
                                        />
                        </div>   
                  </div>
                  <div className="col-md-6">
                         <div className="form-group">
                                 <label>الاسم الثلاثي باللغة الانكليزية</label>
                                 
                                <input type='text' 
                                 className='form-control' 
                                 placeholder='ادخل الاسم الثلاثي باللغة الانكليزية '
                               
                                 />
                         </div>
                  </div>


                  <div className="col-md-6">
                         <div className="form-group">
                                 <label>اسم الأم   </label>
                                 
                                <input type='text' 
                                 className='form-control' 
                                 placeholder='اسم الأم     '
                               
                                 />
                         </div>
                  </div>
                  <div className="col-md-6">
                         <div className="form-group">
                                 <label>المحافظة    </label>
                                 
                                <input type='text' 
                                 className='form-control' 
                                 placeholder='ادخل المحافظة      '
                               
                                 />
                         </div>
                  </div>



                  <div className="col-md-6">
                         <div className="form-group">
                                
                                 <label>الفرع الذي يرغب الطالب الحضور به    </label>
                                 
                                <input type='text' 
                                 className='form-control' 
                                 placeholder='ادخل الفرع      '
                               
                                 />
                                          
                                
                         </div>
                  </div>
                  <div className="col-md-6">
                         <div className="form-group">
                                 <label>رقم الجوال    </label>
                                 
                                <input type='number' 
                                 className='form-control' 
                                 placeholder='ادخل رقم الجوال      '
                               
                                 />
                         </div>
                  </div>

                  <div className="col-md-6">
                         <div className="form-group">
                                 <label>الوقت المناسب للطالب      </label>
                                 
                                 <input type="time" className="form-control" 
                                       
                                           id="StartDate"   />
                                
                         </div>
                  </div>


                  <div className="col-md-6">
                         <div className="form-group">
                                 <label>الدورة التي يرغب الطالب بحضورها     </label>
                                 
                                <input type='number' 
                                 className='form-control' 
                                 placeholder='ادخل الدورة التي ترغب بحضورها        '
                               
                                 />
                         </div>
                  </div>

          </div>
              <button type="button"  className="btn btn-primary mt-4">حفظ</button>
          </Col>
        </Row>
      </Container>
    </section>
    </Fragment>
  );
};

export default AboutUs;
