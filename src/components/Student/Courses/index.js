import React,{ useState,useEffect,Fragment } from "react";
import { Container, Row, Col,Table,Button ,Form} from "reactstrap";
import Header from "../../Header/Header";
import AuthUser from  '../../Auth/AuthUser';
import Rating from 'react-rating-stars-component';
import {Pie,PieChart,BarChart,Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ReactTooltip from 'react-tooltip';
import "./Card.css";
import Course from "../../Branch_Manger/Course";
import logo from"../../../assests/images/seo.png"
export default function GetStdCorses () {

  const {http,getUser} = AuthUser();
  const [dataRow, setData] = useState([]);
  const [color, setColor] = useState([]);
   
///============================
/// loadData
///=============================
useEffect(() => {
    loadData();

         }, []);
    const loadData = async () => {
    debugger
    http.get(`branch_admin/student_subscribes/${getUser().id}`).then((res)=>{
    setData(res.data.data.data);
    setColor(['blue','green','yellow']);

    }).catch(function (error) {
    
    });
    };    
  

    const [rating, setRating] = useState(0);
    const [showRating, setShowRating] = useState(false);
  
    const handleRatingChange = (newRating) => {
      setRating(newRating);
      setShowRating(true);
    }


    const storeRating = (subscribe_id) => {
        debugger
        http.post('student/rating/store',{subscribe_id:subscribe_id,rating:rating}).then((res)=>{
            // setData(res.data.data);
        
            toast.success(res.data.message);
            }).catch(function (error) {
            
            });
            
    }
    
      const handleCardLeave = () => {
        Tooltip.hide();
      }
return (
<Fragment>
<Header />

<div className="container-fluid">
<div class="container bootstrap snippets bootdeys">

<div class="row" style={{marginTop:'30px'}}>
{dataRow.map(Course => (
        <div class="col-md-4 col-sm-6 content-card">
        <div class="card-big-shadow">
            <div class="card card-just-text" data-background="color" data-color= "purple" data-radius="none">
                <div class="content">
                <img src={logo} alt={logo} style={{maxWidth:'200px',height:'auto',marginTop:'0px'}}/>
                    <h6 class="category"> {Course.name}</h6>
                    <h4 class="title">{Course.subjectName}</h4>
                    <p class="description">{Course.first_name + " " + Course.last_name} </p>
                    <p class="description">{Course.start+ "/" +Course.end}</p>
                    <div data-tip={rating === 0 ?"قييم المدرب من فضلك" : "شكرا على التقييم"}>
                    <Rating
                       value={rating}
                       onChange={handleRatingChange}
                       size={30}
                       activeColor="#ffd700"
                    />
                    <button class="btn btn-secondary" onClick={() => storeRating(Course.id)}>قيمني</button>
                    </div>                   
                </div>
            </div> 
        </div>
        <ReactTooltip />
</div>

    ))}
    {/* <div class="col-md-4 col-sm-6 content-card">
        <div class="card-big-shadow">
            <div class="card card-just-text" data-background="color" data-color="blue" data-radius="none">
                <div class="content">
                <img src={logo} alt={logo} style={{maxWidth:'200px',height:'auto',marginTop:'0px'}}/>
                    <h6 class="category">Best cards</h6>
                    <h4 class="title"><a href="#">Blue Card</a></h4>
                    <p class="description">What all of these have in common is that they're pulling information out of the app or the service and making it relevant to the moment. </p>
                    <div data-tip={rating === 0 ?"قييم المدرب من فضلك" : "شكرا على التقييم"}>
                    <Rating
                       value={rating}
                       onChange={handleRatingChange}
                       size={30}
                       activeColor="#ffd700"
                    />

                    </div>
                   
                    {showRating && <p>Your rating: {rating}</p>}
                </div>
            </div> 
        </div>
        <ReactTooltip />
    </div>
    
    <div class="col-md-4 col-sm-6 content-card">
        <div class="card-big-shadow">
            <div class="card card-just-text" data-background="color" data-color="green" data-radius="none">
                <div class="content">
                    <h6 class="category">Best cards</h6>
                    <h4 class="title"><a href="#">Green Card</a></h4>
                    <p class="description">What all of these have in common is that they're pulling information out of the app or the service and making it relevant to the moment. </p>
                </div>
            </div> 
        </div>
    </div>
    
    <div class="col-md-4 col-sm-6 content-card">
        <div class="card-big-shadow">
            <div class="card card-just-text" data-background="color" data-color="yellow" data-radius="none">
                <div class="content">
                    <h6 class="category">Best cards</h6>
                    <h4 class="title"><a href="#">Yellow Card</a></h4>
                    <p class="description">What all of these have in common is that they're pulling information out of the app or the service and making it relevant to the moment. </p>
                </div>
            </div> 
        </div>
    </div>
    
    <div class="col-md-4 col-sm-6 content-card">
        <div class="card-big-shadow">
            <div class="card card-just-text" data-background="color" data-color="brown" data-radius="none">
                <div class="content">
                    <h6 class="category">Best cards</h6>
                    <h4 class="title"><a href="#">Brown Card</a></h4>
                    <p class="description">What all of these have in common is that they're pulling information out of the app or the service and making it relevant to the moment. </p>
                </div>
            </div> 
        </div>
    </div>
    
    <div class="col-md-4 col-sm-6 content-card">
        <div class="card-big-shadow">
            <div class="card card-just-text" data-background="color" data-color="purple" data-radius="none">
                <div class="content">
                    <h6 class="category">Best cards</h6>
                    <h4 class="title"><a href="#">Purple Card</a></h4>
                    <p class="description">What all of these have in common is that they're pulling information out of the app or the service and making it relevant to the moment. </p>
                </div>
            </div> 
        </div>
    </div>
    
    <div class="col-md-4 col-sm-6 content-card">
        <div class="card-big-shadow">
            <div class="card card-just-text" data-background="color" data-color="orange" data-radius="none">
                <div class="content">
                    <h6 class="category">Best cards</h6>
                    <h4 class="title"><a href="#">Orange Card</a></h4>
                    <p class="description">What all of these have in common is that they're pulling information out of the app or the service and making it relevant to the moment. </p>
                </div>
            </div> 
        </div>
    </div> */}
</div>
</div>
<ToastContainer />

</div>
 
</Fragment>
    
  );

  
};





