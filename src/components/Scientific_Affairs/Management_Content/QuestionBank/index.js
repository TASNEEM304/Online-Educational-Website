import React ,{Fragment,useEffect,useState} from "react";
//import { Container, Row, Col,Table,Button ,Form} from "reactstrap";
import Header from "../../HeaderSiectAff";
import ReactPaginate from 'react-paginate';
import axios from 'axios'
import ReactModal from 'react-modal';
import * as AiIcons from "react-icons/ai";
import AuthUser from  '../../../Auth/AuthUser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Tabs,
  Tab,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import HeaderSiectAff from "../../HeaderSiectAff";


const useStyles = makeStyles((theme) => ({
  questionContainer: {
    marginBottom: theme.spacing(2),
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


const questions = [
  {
    id: 1,
    question: 'What is your name?',
    subject: 'Personal Information',
  },
  {
    id: 2,
    question: 'What is your favorite color?',
    subject: 'Personal Preferences',
  },
  {
    id: 3,
    question: 'What is your favorite food?',
    subject: 'Personal Preferences',
  },
];
export const GetQuestionBank = () => {
const {http} = AuthUser();
const classes = useStyles();

const [selectedTab, setSelectedTab] = useState(0);
const [selectedQuestions, setSelectedQuestions] = useState([]);
const [generateFormVisible, setGenerateFormVisible] = useState(false);
const [formTitle, setFormTitle] = useState('');
const [formDescription, setFormDescription] = useState('');
const [subject, setSubject] = useState('');
const [question, setQuestion] = useState('');
const [questionSubject, setQuestionSubject] = useState('');
const [questions, setQuestions] = useState([]);

useEffect(() => {
  axios
    .get('https://example.com/api/questions')
    .then((response) => setQuestions(response.data))
    .catch((error) => console.log(error));
}, []);

const handleTabChange = (event, newValue) => {
  setSelectedTab(newValue);
};

const handleQuestionSelect = (question) => {
  if (!selectedQuestions.includes(question)) {
    setSelectedQuestions([...selectedQuestions, question]);
  }
};

const handleQuestionDeselect = (question) => {
  const newSelectedQuestions = selectedQuestions.filter(
    (q) => q.id !== question.id
  );
  setSelectedQuestions(newSelectedQuestions);
};

const handleGenerateFormClick = () => {
  setGenerateFormVisible(true);
};

const handleGenerateFormClose = () => {
  setGenerateFormVisible(false);
};

const handleFormTitleChange = (event) => {
  setFormTitle(event.target.value);
};

const handleFormDescriptionChange = (event) => {
  setFormDescription(event.target.value);
};

const handleSubjectChange = (event) => {
  setSubject(event.target.value);
};

const handleQuestionChange = (event) => {
  setQuestion(event.target.value);
};

const handleQuestionSubjectChange = (event) => {
  setQuestionSubject(event.target.value);
};

const handleQuestionSubmit = (event) => {
  event.preventDefault();
  const newQuestion = {
    id: selectedQuestions.length + 1,
    question: question,
    subject: questionSubject,
  };
  setSelectedQuestions([...selectedQuestions, newQuestion]);
  setQuestion('');
  setQuestionSubject('');
};

const handleGenerateFormSubmit = (event) => {
  event.preventDefault();
  const selectedQuestionIds = selectedQuestions.map((q) => q.id);
  const formData = {
    title: formTitle,
    description: formDescription,
    subject: subject,
    questionIds: selectedQuestionIds,
  };
  axios
    .post('https://example.com/api/form', formData)
    .then((response) => console.log(response.data))
    .catch((error) => console.log(error));
  setGenerateFormVisible(false);
};

return (
  <div dir="rtl">
    <HeaderSiectAff/>
    <Tabs value={selectedTab} onChange={handleTabChange}>
      <Tab label=" كل الأسئلة" />
      <Tab label=" الأسئلة المختارة" />
    </Tabs>
    {selectedTab === 0 && (
      <div>
        {questions.map((q) => (
          <div key={q.id} className={classes.questionContainer}>
            <div className={classes.questionText}>
              <p>{q.question}</p>
              <p>{q.subject}</p>
            </div>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleQuestionSelect(q)}
            >
              Select
            </Button>
          </div>
        ))}
        <form onSubmit={handleQuestionSubmit}>
          <TextField
            className={classes.textField}
            label="السؤال"
            value={question}
            onChange={handleQuestionChange}
          />
           <TextField
            className={classes.textField}
           label="الجواب"
            value={questionSubject}
            onChange={handleQuestionSubjectChange}
          />
          <TextField
            className={classes.textField}
           label="المادة"
            value={questionSubject}
            onChange={handleQuestionSubjectChange}
          />
          <Button type="submit" variant="contained" color="primary">
            اضافة 
          </Button>
        </form>
      </div>
    )}
    {selectedTab === 1 && (
      <div>
        {selectedQuestions.map((q) => (
          <div key={q.id} className={classes.questionContainer}>
            <div className={classes.questionText}>
              <p>{q.question}</p>
              <p>{q.subject}</p>
            </div>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleQuestionDeselect(q)}
            >
              الغاء الاختيار
            </Button>
          </div>
        ))}
        <Button
          className={classes.generateFormButton}
          variant="contained"
          color="primary"
          onClick={handleGenerateFormClick}
          disabled={selectedQuestions.length === 0}
        >
           توليد النموذج
        </Button>
      </div>
    )}
    <Dialog open={generateFormVisible} onClose={handleGenerateFormClose}>
      <DialogTitle> انشاء نموذج</DialogTitle>
      <form onSubmit={handleGenerateFormSubmit}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="formTitle"
            label="Title"
            type="text"
            fullWidth
            value={formTitle}
            onChange={handleFormTitleChange}
          />
          <TextField
            margin="dense"
            id="formDescription"
            label="Description"
            type="text"
            fullWidth
            value={formDescription}
            onChange={handleFormDescriptionChange}
          />
          <FormControl className={classes.textField}>
            <InputLabel id="subject-label">المادة</InputLabel>
            <Select
              labelId="subject-label"
              id="subject-select"
              value={subject}
              onChange={handleSubjectChange}
            >
              <MenuItem value="math">Math</MenuItem>
              <MenuItem value="science">Science</MenuItem>
              <MenuItem value="english">English</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleGenerateFormClose} color="primary">
            عودة
          </Button>
          <Button type="submit" color="primary">
            انشاء
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  </div>
);
}
