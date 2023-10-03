import { Box, Paper, Typography, TextField, Button, Avatar } from "@mui/material";
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { FbLogin, FbSignup } from "../admin_config/firebaseMethods/firebasemethods";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import * as React from 'react';
import MALoader from "../admin_assets/MALoader";
export default function LoginFunc() {
    const [pushData, setPushData] = useState<any>({})
    const [correct, inCorrect] = useState(false)
    const [open, setOpen] = useState(false);

    const fillModel = (key: any, val: any) => {
        pushData[key] = val
        setPushData({ ...pushData })
    }
    const logInBtn = () => {
        console.log(pushData)
        setOpen(true)
        inCorrect(false)
        FbLogin(pushData)
            .then((res) => {
                if(res.role == 'admin'){
                    console.log(res.role)
                    setOpen(false)
                    navigate('/')
                }
                else{
                    setOpen(false)
                    navigate('/user')
                }
            })
            .catch((err) => {
                setOpen(true)
                inCorrect(true)
                setOpen(false)
                // alert(err)
            })

    }
    const navigate = useNavigate()
    let loginRout = () => {
        navigate(`/signup`)
    }
    return (
        <div>
            <div className="bg-gradient-to-r from-indigo-500 via-sky-500 to-indigo-500  flex justify-center h-screen items-center">
                <div className="bg-light transition-border ease-in-out p-10 border-y-4 border-indigo-700  rounded-md hover:border-t-0 hover:duration-1000 hover:border-y-0 hover:border-x-4 hover:transition-all">
                    <div>
                        <Backdrop
                            sx={{ color: 'WindowText', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={open}
                        >
                            <CircularProgress />
                        </Backdrop>
                    </div>
                    <div className="flex justify-center">
                        <Avatar className="bg-gradient-to-r from-indigo-500 via-sky-500 to-indigo-500 " src="/broken-image.jpg" />
                    </div>
                    <Box className='mt-3'>
                        {correct ? (<TextField
                            error
                            id="standard-error-helper-text"
                            label="Email"
                            helperText="Your email is not exist."
                            variant="filled"
                            onClick={() => inCorrect(false)}
                        />) : (
                            <TextField variant="filled" color="primary" focused onChange={(e) => fillModel('email', e.target.value)} label='Email' type="email" />
                        )}
                    </Box>
                    <Box className='mt-3'>
                        {correct ? (<TextField
                            error
                            id="standard-error-helper-text"
                            label="Password"
                            helperText="Your password is invalid."
                            variant="filled"
                            onClick={() => inCorrect(false)}
                        />) : (
                            <TextField variant="filled" color="primary" focused onChange={(e) => fillModel('password', e.target.value)} label='Password' type="password" />
                        )}
                    </Box>
                    <Box className='mt-3 '>
                        <Button onClick={logInBtn} className="bg-gradient-to-r from-indigo-500 via-sky-500 to-indigo-500 w-100 transition-all ease-in-out hover:bg-gradient-to-r hover:from-sky-500 hover:via-indigo-500 hover:to-sky-500 hover:transition-all hover:duration-1000" variant="contained">Login</Button>
                    </Box>
                    <Box className='mt-2'>
                        <Typography className="text-primary">Already have an account <span className="linking" onClick={() => loginRout()}>Sign Up</span></Typography>
                    </Box>
                </div>
            </div>
        </div>
    )
}