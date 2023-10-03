import { Box, Button, IconButton, Paper, TextField, Modal, Typography } from "@mui/material";
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import { useState, useEffect } from "react";
import AddSharpIcon from '@mui/icons-material/AddSharp';
import LibraryAddCheckSharpIcon from '@mui/icons-material/LibraryAddCheckSharp';
import { FBAdd, FBGet, FBLogout} from "../admin_config/firebaseMethods/firebasemethods";
import { useNavigate } from "react-router-dom";
import MAModal from "../admin_components/components/MAModal";
import Avatar from '@mui/material/Avatar';
import AdminImg from '../img/IMG-20230116-WA0030-removebg-preview (4).png'
import KeyboardTabSharpIcon from '@mui/icons-material/KeyboardTabSharp';

export default function AdminPannel() {
 
  const [quiz, setQuiz] = useState<any>({})
  const [question, setQuestion] = useState<any>({})
  const [optionList, setOptionList] = useState<any>([])
  const [questionList, setQuestionList] = useState<any>([])
  const [option, setOption] = useState('')
  const [correctAns, setCorrectAns] = useState('')
  const [quizlist, setQuizList] = useState<any>([])
  const [islock, setIsLock] = useState<any>(false)
  const fillModel = (key: any, val: any) => {
    quiz[key] = val
    setQuiz({ ...quiz })
  }
  const fillQuestion = (key: any, val: any) => {
    question[key] = val
    setQuestion({ ...question })
  }
  const getQuiz = () => {
    FBGet('Quizz')
      .then(res => {
        console.log(res)
        setQuizList([...res])
      })
      .catch(err => {
        console.log(err)
      })
  }
  const addQuiz = () => {
    quiz.questions = ([...questionList])
    FBAdd('Quizz', quiz)
      .then(res => {
        console.log('Data Send Successfully')
        getQuiz()
      })
      .catch(err => {
        console.log(err)
      })
  }
  useEffect(() => {
    getQuiz()
  }, [])
  const navigate = useNavigate()
  const navUser = () => {
    navigate('/user')
  }

  const lockQuiz = () => {
    setIsLock(!islock)
  }
  const addOption = () => {
    optionList.push(option)
    setOptionList([...optionList])
  }
  const addQuestion = () => {
    question.question = ({ ...question })
    question.options = ([...optionList])
    question.correctAnswer = (correctAns)
    setQuestion({ ...question })
    questionList.push(question)
    setQuestionList([...questionList])
    console.log(questionList)
    setOption('')
    setOptionList([])
    setCorrectAns('')
    setQuestion({ 'question': '' })
    setQuestionList([...questionList])
  }
  const adminLogout = () => {
    FBLogout()
       .then(res => {
        console.log(res)
         navigate(`/login`)
       })
       .catch(err => {
        console.log(err)
       })
  }
  return (
    <div>
      <div>
        <div className="grid md:grid-cols-5 sm:grid-cols-3 ">
          <div>
            <div className="py-10 px-4 border rounded-sm shadow-md bg-slate-500 text-center flex flex-col items-center md:h-screen sm:h-screen h-sc md:overflow-auto sm:overflow-auto overflow-auto" >
              <div>
                <Avatar
                  className="bg-dark"
                  alt="Remy Sharp"
                  src={AdminImg}
                  sx={{ width: 120, height: 120 }}
                />
              </div> 
              <div className="mt-[60px]">
                {quizlist.map((x: any, i: any) => {
                  return (
                    <div key={i}>
                      <Button variant="contained" className="my-1"  >{x.quizName}</Button>
                    </div>
                  )
                })}
              </div>
              <div className="mt-[80px]">
                <Button color="error" variant="contained" onClick={adminLogout}>Log Out <DeleteForeverSharpIcon /></Button>
              </div>
              <div className="mt-5">
                <Button variant="contained"  onClick={navUser}>User Pannel <KeyboardTabSharpIcon /></Button>
              </div>
            </div>
          </div>
          <div className="md:col-span-4 sm:col-span-2">
            <div className="p-10 2xl:h-screen md:h-screen bg-slate-200 border overflow-auto">
              <div className="grid grid-cols-2">
                <div className="ms-3">
                  <h3>Create Quizz</h3>
                </div>
                <div className="me-3 text-end">
                  <Button variant="contained" onClick={addQuiz}>Save Quizz</Button>
                </div>
              </div>
              <div className="grid md:grid-cols-3 sm:grid-cols-2 ">
                <TextField disabled={islock} variant="filled" id='field1' onChange={(e) => fillModel('quizName', e.target.value)} className="m-3 sm:col-span-2 col-span-2 md:col-span-1" label='Quizz Name' placeholder="Quizz Name" />
                <TextField disabled={islock} variant="filled" id='field2' onChange={(e) => fillModel('quizDuration', e.target.value)} className="m-3 sm:col-span-2 col-span-2 md:col-span-1" label='Quizz Duration' type="number" placeholder="Quizz Duration " />
                <TextField disabled={islock} variant="filled" id='field2' onChange={(e) => fillModel('secretKey', e.target.value)} className="m-3 sm:col-span-2 col-span-2 md:col-span-1" label='Secret Key' type="" placeholder="Secret Key" />
                <TextField disabled={islock} variant="filled" id='field4' onChange={(e) => fillModel('description', e.target.value)} className="m-3 col-span-3" multiline rows={1} label='Description' placeholder="Description" />
              </div>
              <div>
                <Button className="ms-3" variant="contained" onClick={lockQuiz}>{islock ? 'unlock Quiz' : 'lock Quiz'}</Button>
              </div>
              <div className="grid grid-cols- 1">
                <div>
                  <TextField variant="filled" className="w-[97%]  m-3" label='Question' value={question.question} onChange={(e) => fillQuestion('question', e.target.value)} placeholder="Question" />
                </div>
              </div>
              <div className="grid md:grid-cols-6 sm:grid-cols-4">
                <TextField variant="filled" className="m-3 md:col-span-5 sm:col-span-3" value={option} onChange={(e) => setOption(e.target.value)} label='Options' placeholder="Options" />
                <Button variant="contained" className="my-3" onClick={addOption}><AddSharpIcon /></Button>
              </div>
              <div className="grid grid-cols-2">
                {optionList.map((x: any, i: any) => {
                  return (

                    <Button variant="contained" className="mx-3 my-1" onClick={() => { setCorrectAns(x) }}>{x}</Button>

                  )
                })}
              </div>
              <div className="text-center mt-10">
                {correctAns ? (<Button variant="contained" color="success" endIcon={<LibraryAddCheckSharpIcon />} className="w-50 ">{correctAns}</Button>) : ('')}
              </div>
              <div className=" mt-3 ">
                <Button variant="contained" endIcon={<AddSharpIcon />} className="ms-3 py-2" onClick={addQuestion}>Add Question</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  )
}



