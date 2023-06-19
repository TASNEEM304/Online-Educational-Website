import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import QrReader from "react-web-qr-reader";

import QRCode from 'qrcode.react';

const Scanner = () => {
  
  

  const delay = 500;

  const previewStyle = {
    height: 240,
    width: 320
  };
  const [startScan, setStartScan] = useState(false);

  const [result, setResult] = useState("No result");

  const handleScan = (data) => {
    console.log(data);
    setResult(data.data)
  };

  const handleError = (err) => {
    console.error(err);
  };
  return (


<div className="App"> 
    <button
      onClick={() => {
        setStartScan(!startScan);
      }}
    >
      {startScan ? "Stop Scan" : "Start Scan"}
    </button>
    {startScan && (
      
<>
<QrReader
  delay={delay}
  facingMode={"user"}
  style={previewStyle}
  onError={handleError}
  onScan={handleScan}
/>
</>
      
    )}
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    {result !== "" && <p>{result}</p>}
    

    <div>
      <QRCode value="https://www.example.com" />
    </div>

</div>
  );



};

export default Scanner;



