import DeleteForeverSharpIcon from "@mui/icons-material/DeleteForeverSharp"
import { useState, useEffect } from 'react'
import { useNavigate, Routes, Route } from "react-router-dom";
import { Box, Button, IconButton, Paper, TextField, Modal, Typography, Avatar } from "@mui/material";
import userImg from '../img/download-removebg-preview (1).png'
import { FBLogout, FBGet } from "../admin_config/firebaseMethods/firebasemethods";
import { Navigate, useParams } from "react-router-dom";
import MainQuiz from "./mainQuiz";
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
export default function UserPannel() {
    const [quizlist, setQuizList] = useState<any>([])
    const [secretId, setSecretId] = useState<any>('')
    const [invalidKey , setInvalidKey] = useState(false)
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const navigate = useNavigate()
    const userLogout = () => {
        FBLogout()
            .then(res => {
                console.log(res)
                navigate(`/login`)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const getQuiz = () => {
        FBGet('Quizz',)
            .then(res => {
                console.log(res)
                setQuizList([...res])
            })
            .catch(err => {
                console.log(err)
            })
    }
    useEffect(() => {
        getQuiz()
    }, [])
    const navQuiz = () => {
        navigate(`/mainQuiz`)
    }
    return (
        <div>
            <div>
                <div className="grid md:grid-cols-5 sm:grid-cols-3 ">
                    <div>
                        <div className="py-10 px-4 border rounded-sm shadow-md bg-black text-center flex flex-col items-center md:h-screen sm:h-screen h-sc md:overflow-auto sm:overflow-auto overflow-auto" >
                            <div>
                                <Avatar
                                    className="bg-slate-200 pt-[29px] border-2 border-black"
                                    alt="Remy Sharp"
                                    src={userImg}
                                    sx={{ width: 120, height: 120 }}
                                />
                            </div>
                            <div className="mt-[60px]">
                                {quizlist.map((x: any, i: any) => {
                                    const checkKey = () => {

                                        if (x.secretKey == secretId) {
                                            navigate('/mainQuiz')
                                        }
                                        else {
                                            // alert('Secret Key is Invalid')
                                            setInvalidKey(true)
                                        }
                                    }
                                    return (
                                        <div key={i}>
                                            <div>
                                                <Button variant="contained" className="my-1 w-100" onClick={handleOpen}>{x.quizName}</Button>
                                            </div>
                                            <Modal
                                                open={open}
                                                onClose={handleClose}
                                                aria-labelledby="modal-modal-title"
                                                aria-describedby="modal-modal-description"
                                            >
                                                <Box sx={style}>
                                                    {invalidKey ? (<TextField
                            error
                            id="standard-error-helper-text"
                            helperText="Your Key is Invalid"
                            variant="filled"
                            onClick={() => setInvalidKey(false)}
                        />):( <TextField variant="filled" type="password" className="w-100" onChange={(e) => setSecretId(e.target.value)} label='Secret Key' />)}
                                                   
                                                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                                        <span>Secret Key : </span><span className='text-primary'>{x.secretKey}</span>
                                                    </Typography>
                                                    <Button onClick={checkKey} variant="contained" className="mt-3">Next</Button>
                                                </Box>
                                            </Modal>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="mt-[80px]">
                            <Button color="error" variant="contained" onClick={userLogout}>Log Out <DeleteForeverSharpIcon /></Button>
                            </div>
                        </div>
                    </div>
                    <div className="md:col-span-4 sm:col-span-2">
                        <div className="p-10 2xl:h-screen md:h-screen bg-slate-200 border overflow-auto bg-image">
                            <div className="">
                                <div className="grid grid-cols-2">
                                    <p className="border-0 rounded-md bg-[rgba(27,136,185,0.2)] p-5 mx-2 text-white">🧠 Are you ready to put your wits to the test and explore the vast depths of your intellect? Prepare to be captivated, challenged, and amazed as you dive into our quiz, where the realm of fascinating facts and intriguing questions awaits.
                                        🚀 Buckle up for an adventure that will ignite your curiosity and spark your competitive spirit. Whether you're a trivia virtuoso or a first-time quizzer, there's something here for everyone.
                                    </p>
                                    <p className="border-0 rounded-md bg-[rgba(27,136,185,0.2)] p-5 mx-2 text-white">🌎 Journey across continents, traverse through history, and explore the mysteries of science. With every question, you'll uncover hidden gems of information, expand your horizons, and sharpen your mind.🏆 Challenge your friends, family, or colleagues and see who emerges as the ultimate quiz champion. Will it be you, the master of trivia, or will someone else claim the crown? Only time will tell!
                                    </p>
                                </div>
                                <div className="grid-cols-1">
                                    <h5 className="border-0 rounded-md bg-[rgba(27,136,185,0.4)] p-5 mx-5 text-white">💡 So, why wait? Join us on this thrilling intellectual expedition, where every question is a chance to shine and every answer brings you one step closer to becoming a quiz legend. Let's get started and uncover the brilliance within you! 🌟</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}