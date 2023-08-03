import React ,{Fragment,useEffect,useState} from "react";
import { Container, Row, Col } from "reactstrap";
import {Pie,PieChart,BarChart,Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import HeaderBrcMgr from "./HeaderBrcMgr" ;
import AuthUser from  '../Auth/AuthUser';

const DashboardBrMgr = () => {
  const {http} = AuthUser();
  const [dataRow, setData] = useState('');
  const [poll_date, setpolldate] = useState('2023-06');

///============================
/// loadData
///=============================
useEffect(() => {
  loadData();
         }, []);
const loadData = async () => {
debugger
http.get(`branch_admin/polls_counting_byBranch&Date?branch=2&date=${poll_date}`).then((res)=>{
setData(res.data.data);


}).catch(function (error) {

});
};    


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

  const days = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
  const hours = ['8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM'];

  return (
    <Fragment>
<HeaderBrcMgr />
<section>
<Container>
  <div className="row">
    <div className="col-md-6">
               
<BarChart width={600} height={300} data={dataRow}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="subjectName" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="count" fill="#8884d8" />
      {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
    </BarChart>

    </div>
    
  {/* <div className="col-md-6">
      
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
           
        </div> */}
  </div>
  <div className="row">
    <div className="col-md-6">
      
<div className="col-6-md">
<label>last_name:</label>
                        <input type="date" className="form-control" placeholder="Enter birth_day"
                            onChange={e=>setpolldate(e.target.value)}
                        id="birth_day" />
</div>
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

    <table>
      <thead>
        <tr>
          <th></th>
          {days.map(day => (
            <th key={day}>{day}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {hours.map(hour => (
          <tr key={hour}>
            <td>{hour}</td>
            {days.map(day => (
              <td key={`${day}-${hour}`}></td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
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
