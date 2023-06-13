import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import jsQR from 'jsqr';

function QRScanner() {
  const webcamRef = useRef(null);
  const [scanned, setScanned] = useState(false);
  const [result, setResult] = useState('');

  const handleScan = () => {
    const canvas = webcamRef.current.getCanvas();
    const imageData = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imageData.data, imageData.width, imageData.height);
    if (code) {
      setResult(code.data);
      setScanned(true);
    }
  };

  return (
    <div>
      <h1>QR Scanner</h1>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={{
          width: 600,
          height: 400,
          facingMode: 'user',
        }}
      />
      {!scanned && <button onClick={handleScan}>Scan QR Code</button>}
      {scanned && <p>Scanned Result: {result}</p>}
    </div>
  );
}
export default QRScanner;