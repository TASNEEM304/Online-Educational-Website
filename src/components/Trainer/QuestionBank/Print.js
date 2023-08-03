import html2pdf from 'html2pdf.js';
import { useLocation } from 'react-router-dom';
import React ,{Fragment,useEffect,useState,useRef } from "react";
import {
    Tabs,
    Tab,
    Typography,
    Button,
    Grid
  } from '@material-ui/core';
    import { makeStyles } from '@material-ui/core/styles';
  const useStyles = makeStyles((theme) => ({
    questionContainer: {
      marginBottom: theme.spacing(2),
      marginRight:'100px',
      marginTop:'100px'
    },
    questionText: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: theme.spacing(1),
    },
    generateFormButton: {
      marginTop: theme.spacing(2),
    },
    textField: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      minWidth: 200,
    },
  }));
export default function  Print  ()  {
    const pageRef = useRef();
    
const GeneratePDF = () => {
   
    const opt = {
        margin: 0,
        filename: 'mypdf.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
        // Add header to PDF
        // Note: You may need to adjust the positioning and styling to fit your needs
        beforePageContent: function (data) {
          const header = document.createElement('div');
          header.style = 'text-align: center; margin: 20px 0;';
          header.innerHTML = '<h1>My Page</h1>';
          return header;
        },
        // Add footer to PDF
        // Note: You may need to adjust the positioning and styling to fit your needs
        afterPageContent: function (data) {
          const pageCount = data.pageCount;
          const footer = document.createElement('div');
          footer.style = 'position: absolute; bottom: 0; width: 100%; text-align: center;';
          footer.innerHTML = '<div>Page ' + pageCount + ' of ' + data.numberOfPages + '</div>';
          return footer;
        }
      };
      html2pdf().set(opt).from(pageRef.current).save();
  };


    const [selectedQuestions, setSelectedQuestions] = useState([]);

    const classes = useStyles();
    const location = useLocation();
    useEffect(() => {
        
    setSelectedQuestions(location.state.data);
    console.log(selectedQuestions);
             }, []);
   // const data = location.state.data;
    
    
      return (

    <div ref={pageRef} dir='rtl' style={{marginRight:'80px',marginTop:'10px'}}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h2">الامتحان الاخير</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h3">لمادة الرياضيات</Typography>
          <Typography variant="body1">
            {selectedQuestions.map((q) => (
          <div key={q.id} className={classes.questionContainer}>
            <div className={classes.questionText}>
              <h3>{q.subject}                 :          {q.question}</h3>
              {/* <p></p> */}
            </div>
          </div>
        ))} 
        
          </Typography>
        </Grid>
        <Grid item xs={6}>
          
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={GeneratePDF}>
            Generate PDF
          </Button>
        </Grid>
      </Grid>
    </div>

        // <div dir='rtl'>
        //   <div id="pdf-content">
        //   {selectedQuestions.map((q) => (
        //   <div key={q.id} className={classes.questionContainer}>
        //     <div className={classes.questionText}>
        //       <h3>{q.subject}                 :          {q.question}</h3>
        //       {/* <p></p> */}
        //     </div>
        //   </div>
        // ))}          </div>
        // <Button
        //       variant="contained"
        //       color="primary"
        //       onClick={GeneratePDF}
        //     >
        //       طباعة
        //     </Button>
        // </div>
      );
};