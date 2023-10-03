import { Box, Button, IconButton, Paper, TextField, Modal, Typography, Avatar, Backdrop, CircularProgress } from "@mui/material";
import { FBLogout, FBGet } from "../admin_config/firebaseMethods/firebasemethods";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReplaySharpIcon from '@mui/icons-material/ReplaySharp';
import KeyboardBackspaceSharpIcon from '@mui/icons-material/KeyboardBackspaceSharp';
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'rgba(27,136,185,0.2)',
    border: '2px solid rgba(27,136,185,0.2)',
    boxShadow: 24,
    py: 10,
    px: 5
};
export default function MainQuiz() {
    const [quizlist, setQuizList] = useState<any>([])
    const [loader, setLoader] = useState(false)
    const [currentQue, setCurrentQue] = useState<number>(0)
    const [clickedOption, setClickedOption] = useState(0)
    const [score, setScore] = useState(0)
    const [showScore, setShowScore] = useState(false)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const navigate = useNavigate()
    const getQuiz = () => {
        setLoader(true)
        FBGet(`Quizz/`)
            .then(res => {
                setQuizList([...res])
                setLoader(false)
                console.log(res)
            })
            .catch(err => {
                console.log(err)
                setLoader(false)
            })
    }
    useEffect(() => {
        getQuiz()
    }, [])

    return (
        <div className="bg-image">
            <div className="flex justify-center mx-auto items-center h-screen">
                <div className="">
                    <Backdrop
                        sx={{ color: 'WindowText', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={loader}
                    >
                        <CircularProgress /></Backdrop>
                    {quizlist.map((x: any, i: any) => {
                        const nextQuestion = () => {
                            updateScore()
                            if (currentQue < x.questions.length - 1) {
                                setCurrentQue(currentQue + 1)
                                setClickedOption(0)
                            }
                            else {
                                handleOpen()
                                setShowScore(true)
                            }

                        }
                        const updateScore = () => {
                            if (clickedOption == x.questions[currentQue].correctAns) {
                                setScore(score + 1)
                                console.log(score)
                            }
                            else {
                                setScore(score + 1)
                            }
                        }
                        const reRender = () => {
                            setShowScore(false)
                            setCurrentQue(0)
                        }
                        return (
                            <div key={i}>
                                <div className="grid grid-cols-1">
                                    {showScore ? (
                                        <Modal
                                            open={open}
                                            onClose={handleClose}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                        >
                                            <Box sx={style} className='mx-2 rounded-md'>
                                                <h4 className="text-primary text-center mb-3">Congragulate !</h4>
                                                <h6 className="text-center text-white">Your Quiz has Completed</h6>
                                                <div className="grid grid-cols-2">
                                                    <div className="text-start mt-3">
                                                        <Button variant="contained" color="error" startIcon={<KeyboardBackspaceSharpIcon />} onClick={() => navigate('/user')}>go back</Button>
                                                    </div>
                                                    <div className="text-end mt-3">
                                                        <Button variant="contained" color="error" endIcon={<ReplaySharpIcon />} onClick={reRender}>Try Again</Button>
                                                    </div>
                                                </div>
                                            </Box>
                                        </Modal>) : (
                                        <div className="p-5 bg-[rgba(27,136,185,0.5)] rounded-md">
                                            <h4 className="text-primary text-center"> {x.quizName}</h4>
                                            <hr className="text-white" />
                                            <h6 className="mx-2 text-white">
                                                <span>{currentQue + 1}.</span>
                                                <span> {x.questions[currentQue].question.question}</span>
                                            </h6>
                                            {x.questions[currentQue].options.map((x: any, i: any) => {
                                                return (
                                                    <div key={i}>
                                                        <button className={`mx-2 w-100 my-2 p-2 option-Btn ${clickedOption == i + 1 ? 'correct' : null}`} onClick={() => setClickedOption(i + 1)}>{x}</button>
                                                    </div>
                                                )
                                            })}
                                            <div className="text-end">
                                                <Button variant="contained" className=" mt-2" onClick={nextQuestion}>Next</Button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div >
    )
}