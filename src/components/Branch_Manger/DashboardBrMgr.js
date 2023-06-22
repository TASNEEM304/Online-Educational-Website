import React ,{Fragment} from "react";
import { Container, Row, Col } from "reactstrap";
import {Pie,PieChart,BarChart,Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import HeaderBrcMgr from "./HeaderBrcMgr" ;
const DashboardBrMgr = () => {

  const data = [
    { name: 'Jan', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Feb', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Apr', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'May', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Jun', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Jul', uv: 3490, pv: 4300, amt: 2100 },
  ];
  
  const dataC = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 2000 },
    { name: 'Apr', value: 2780 },
    { name: 'May', value: 1890 },
    { name: 'Jun', value: 2390 },
    { name: 'Jul', value: 3490 },
  ];
  return (
    <Fragment>
<HeaderBrcMgr />
<section>
<Container>
  <div className="row">
    <div className="col-md-6">
               
<BarChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="pv" fill="#8884d8" />
      <Bar dataKey="uv" fill="#82ca9d" />
    </BarChart>

    </div>
    
  <div className="col-md-6">
      
      <LineChart
            width={600}
            height={300}
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
           
        </div>
  </div>
  <PieChart width={600} height={300}>
      <Pie
        dataKey="value"
        isAnimationActive={false}
        data={dataC}
        cx={300}
        cy={150}
        outerRadius={100}
        fill="#8884d8"
        label
      />
      <Tooltip />
      <Legend />
    </PieChart>
</Container>
     {/* <Container>

   
      
   <Row>
     <Col lg="6" md="6">
       
     </Col>

     <Col lg="6" md="6">
       <div>
         <h2> ادارة الفرع</h2>
         <p>
           Lorem ipsum dolor, sit amet consectetur adipisicing elit.
           Excepturi cupiditate animi deserunt libero nesciunt corporis
           explicabo nobis ex quo molestiae!
         </p>

       </div>
     </Col>
   </Row>
      </Container> */}
    </section>
    </Fragment>
    
  );
};

export default DashboardBrMgr;
