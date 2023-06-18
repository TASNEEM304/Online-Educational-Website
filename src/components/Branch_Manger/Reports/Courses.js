// import React, { useEffect, useRef } from 'react';
// import Chart from '../../../../public/package/dist/chart';

// export default function GetReports() {
//   const chartRef = useRef(null);

//   useEffect(() => {
//     const myChartRef = chartRef.current.getContext("2d");
//     new Chart(myChartRef, {
//       type: 'bar',
//       data: {
//         labels: ["January", "February", "March", "April", "May", "June", "July"],
//         datasets: [
//           {
//             label: "Rainfall",
//             backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850","#ff6384","#ffcd56"],
//             data: [65, 59, 80, 81, 56, 55, 40]
//           }
//         ]
//       },
//       options: {
//         legend: { display: false },
//         title: {
//           display: true,
//           text: 'Rainfall in mm'
//         }
//       }
//     });
//   }, []);

//   return (
//     <canvas ref={chartRef}/>
//   );
// }