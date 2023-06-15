import React ,{Fragment,useEffect,useState} from "react";
import { Container, Row, Col,Table,Button ,Form} from "reactstrap";
import HeaderRecep from "../../../components/Branch_Manger/HeaderBrcMgr";

export default function GetQuestionner () {


    return (
    <Fragment>
<HeaderRecep />
<section>






<div class="row">
 						<div class="col-sm-12">
 							
                         <div className="card" style={{   textAlign: 'right' ,height: '500px' ,fontSize: "10px",background: '#f8f9fa', marginTop:'15px'}}>
               <div className="card-header">
                <div className="row">
                
                <div className="col-md-4">

<div className="input-group mb-2">
  <input
    type="text"
    className="form-control"
    placeholder="إبحث عن اسم أو رقم"
    // value={searchTerm}
    // onChange={handleSearchChange}
    
  />
  <div className="input-group-append">
    <span className="input-group-text">
    {/* <AiIcons.AiOutlineSearch onClick={handleSearchClick} style={{ fontSize:'30px',alignItems:"center" }} /> */}

    </span>
  </div>
  
                
</div>
</div>
<div className="col-md-2">
                </div>


                </div>
             

              </div>
              <div className="card-body"style={{ textAlign: 'center' ,fontSize: "16px", 
                         width: "100%",
                         height : "100%",
                         padding: "0"
                         }}>
                   
                   
              <Table style={{fontSize: "16px", 
                         width: "100%"
                         }}>
        <thead style={{background: " linear-gradient(to left, #2980b9, #2c3e50)" , 
        }}>
          <tr >
            <th style={{ width: "20%" }}></th>
            <th style={{ width: "50%" }}>الاسم</th>
            <th style={{ width: "30%" }}>الرقم</th>
          </tr>
        </thead>
        <tbody>
          {/* {data.length === 0 ? (
            <tr>
              <td colSpan={3} className="text-center">
                
              </td>
            </tr>
          ) : (
            data.map((data) => (
              <tr key={data.id}>
  
                          
                <td>

                {!editing || editedItem.id !== data.id ? (
                <AiIcons.AiOutlineEdit onClick={() => handleEditClick(data)} style={{ color: 'green' , width : '10%' , height: '10%' ,alignItems:"center" }} />
                
                ) : (
                  <>
                    <button onClick={handleSaveClick}>Save</button>
                    <button onClick={handleCancelClick}>Cancel</button> 
                  </>
                )}
                <AiIcons.AiFillDelete onClick={() => Delete(data.id)} style={{ color: 'red' , width : '10%' , height: '10%' ,alignItems:"center" }} />
                   
              </td>
                <td>{editing && editedItem.id === data.id ? <input type="text" name="name" value={editedItem.name} onChange={handleInputChange} /> : data.name}</td>
                <td>{editing && editedItem.id === data.id ? <input type="text" name="no" value={editedItem.No} onChange={handleInputChange} /> : data.No}</td>
    
              </tr>
            ))
          )} */}
        </tbody>
              </Table>
              </div>
    
 		
</div>
</div>
</div>

    </section>
    </Fragment>
    );
};