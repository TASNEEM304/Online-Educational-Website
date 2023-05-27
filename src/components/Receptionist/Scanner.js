
//import "./styles.css";
import { useState } from "react";
import {QrReader} from "react-qr-reader";

const Scanner = () => {
  const [selected, setSelected] = useState("environment");
  const [startScan, setStartScan] = useState(false);
  const [loadingScan, setLoadingScan] = useState(false);
  const [data, setData] = useState("");

  const handleScan = async (scanData) => {
    setLoadingScan(true);
    console.log(`loaded data data`, scanData);
    if (scanData && scanData !== "") {
      console.log(`loaded >>>`, scanData);
      setData(scanData);
      setStartScan(false);
      setLoadingScan(false);
      // setPrecScan(scanData);
    }
  };
  const handleError = (err) => {
    console.error(err);
  };
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>
        Last Scan:
        {selected}
      </h2>

      <button
        onClick={() => {
          setStartScan(!startScan);
        }}
      >
        {startScan ? "Stop Scan" : "Start Scan"}
      </button>
      {startScan && (
        <>
          <select onChange={(e) => setSelected(e.target.value)}>
            <option value={"environment"}>Back Camera</option>
            <option value={"user"}>Front Camera</option>
          </select>
          <QrReader
            facingMode={selected}
            delay={1000}
            onError={handleError}
            onScan={handleScan}
            // chooseDeviceId={()=>selected}
            style={{ width: "300px" }}
          />
        </>
      )}
      {loadingScan && <p>Loading</p>}
      {data !== "" && <p>{data}</p>}
    </div>
  );
};

export default Scanner;

















// import React, { useState, useRef } from 'react';
// import Webcam from 'react-webcam';
// import {QrReader} from 'react-qr-reader';


// import React, {
//   useState
// } from "react";
// import QrReader from "react-web-qr-reader";

// const Scanner = () => {

//   const delay = 500;

//   const previewStyle = {
//     height: 240,
//     width: 320
//   };

//   const [result, setResult] = useState("No result");

//   const handleScan = (result) => {
//     if (result) {
//       setResult(result);
//     }
//   };

//   const handleError = (error) => {
//     console.log(error);
//   };

//   return (
//     <>
//       <QrReader
//         delay={delay}
//         style={previewStyle}
//         onError={handleError}
//         onScan={handleScan}
//       />
//       <p>{result}</p>
//     </>
//   );



  // const [scannedCode, setScannedCode] = useState('');
  // const webcamRef = useRef(null);

  // const handleScan = (data) => {
  //   if (data) {
  //     setScannedCode(data);
  //   }
  // }

  // const handleError = (err) => {
  //   console.error(err);
  // }

  // return (
  //   <div>
  //     <Webcam
  //       audio={false}
  //       height={360}
  //       ref={webcamRef}
  //       screenshotFormat="image/jpeg"
  //       width={640}
  //     />
  //     <QrReader
  //       delay={300}
  //       onError={handleError}
  //       onScan={handleScan}
  //       style={{ width: '100%' }}
  //     />
  //     <p>Scanned Code: {scannedCode}</p>
  //   </div>
  // );
//};

//export default Scanner;