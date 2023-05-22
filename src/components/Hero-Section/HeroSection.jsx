import React from "react";
import { Container, Row, Col } from "reactstrap";
import heroImg from "../../assests/images/hero-img1.png";
import "./hero-section.css";

const HeroSection = () => {
  return (
    <section>
      <Container>
        <Row>
          <Col lg="6" md="6">
            <div className="hero__content">
              <h2 className="mb-4 hero__title">
              مؤسسة سوريين إيجابيين بالمطلق للتنمية والتدريب
              </h2>
              <p className="mb-5">
              بدأت حملتنا نهاية عام 2017، وفكرة المؤسسة تكمن في التركيز على السعي للنهوض بجيل واعٍ ومثقف يسعى إلى تطوير بلده. فنحن مؤسسة غير ربحية، وهدفنا التأهيل وتنمية قدرات الشباب، فابتكرنا عدة دورات وبرامج تدريبية الهدف منها مساندة الفروع الجامعية الجافة التي تفتقد إلى الجانب العملي، حيث ركزنا على مساندة الطلاب وتأهيلهم لدخول سوق العمل، وفي نهاية عام 2022 استطعنا أن نصل إلى  آلاف الطلاب
              </p>
            </div>
          
          </Col>

          <Col lg="6" md="6">
            <img src={heroImg} alt="" className="w-100 hero__img" />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;
