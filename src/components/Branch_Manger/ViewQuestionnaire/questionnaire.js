import React,{ useState,useEffect,Fragment } from "react";
import { Container, Row, Col,Table,Button ,Form} from "reactstrap";
import Header from "./../HeaderBrcMgr";
import AuthUser from  '../../Auth/AuthUser';
import {Pie,PieChart,BarChart,Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


export default function GetQuestionner () {

  const {http} = AuthUser();
  const NewDate=new Date();
  const [poll_date, setpolldate] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [dataRow, setData] = useState('');
  
  

///============================
/// loadData
///=============================
useEffect(() => {
  loadData();  
}, [poll_date]);
const loadData = async () => {

http.get(`branch_admin/polls_counting_byBranch&Date?branch=2&date=${poll_date}`).then((res)=>{
setData(res.data.data);


}).catch(function (error) {

});
};    

const handleSearchClick = (item) => {
  
setpolldate(item.slice(0, 7));
loadData();
};

  return (
<Fragment>
<Header />

{/* <div className="container-fluid"></div> */}
 
<Container>
    
   <Row>
    
     <Col lg="12" lang="ar">

      
<div className="row">
<div className="col-md-6">
                                <div className="form-group mt-2" dir="rtl">
                                       <label>تاريخ الميلاد</label>
                                       <input type="date" className="form-control" 
                                           onChange={e=>handleSearchClick(e.target.value)}
                                           value={poll_date}
                                       id="poll_date" />
                                </div>  
</div>
<div className="col-md-6">  
</div>
</div>
     <div className="row">
<div className="col-md-2">

</div>
     <div className="col-md-8" style={{marginTop :'5px'}}>
               
               <BarChart width={800} height={500} data={dataRow} >
                     <CartesianGrid strokeDasharray="3 3" />
                     <XAxis dataKey="subjectName" />
                     <YAxis />
                     <Tooltip />
                     <Legend />
                     <Bar dataKey="count" fill="#8884d8" />
                     {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
                   </BarChart>
               
                   </div>
                   
    
     </div>
<div className="col-md-2">
  
</div>
      
     </Col>

     
   </Row>

    
      </Container>

      <div>









</div>  
</Fragment>
    
  );
};





