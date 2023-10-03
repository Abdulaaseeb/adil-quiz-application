import { Box, Paper, Typography, TextField, Button, Avatar, Backdrop, CircularProgress } from "@mui/material";
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { FbSignup } from "../admin_config/firebaseMethods/firebasemethods";
export default function SignUpFunc() {
    const [pushData, setPushData] = useState<any>({})
    const [open, setOpen] = useState(false);
    const fillModel = (key: any, val: any) => {
        pushData[key] = val
        setPushData({ ...pushData })
    }
    const signUpBtn = () => {
        // console.log(pushData)
        pushData.role = 'user'
        setOpen(true)
        FbSignup(pushData)
            .then((res) => {
                if(res.role == 'user'){
                    console.log(res.role)
                    navigate('/user')
                }
                else{
                    navigate('/')
                }
                setOpen(false)
            })
            .catch((err) => {
                alert(err)
                setOpen(false)
            })
    }
    const navigate = useNavigate()
    let loginRout = () => {
        navigate(`/login`)
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
                        <TextField variant="filled" color="primary" focused onChange={(e) => fillModel('name', e.target.value)} label='Full Name' type="name" />
                    </Box>                   
                     <Box className='mt-3'>
                        <TextField variant="filled" color="primary" focused onChange={(e) => fillModel('username', e.target.value)} label='User Name' type="name" />
                    </Box>
                    <Box className='mt-3'>
                        <TextField variant="filled" color="primary" focused onChange={(e) => fillModel('email', e.target.value)} label='Email' type="email" />
                    </Box>
                    <Box className='mt-3'>
                        <TextField variant="filled" color="primary" focused onChange={(e) => fillModel('password', e.target.value)} label='Password' type="password" />
                    </Box>
                    <Box className='mt-3 '>
                        <Button onClick={signUpBtn} className="bg-gradient-to-r from-indigo-500 via-sky-500 to-indigo-500 w-100 transition-background ease-in-out hover:bg-gradient-to-r hover:from-sky-500 hover:via-indigo-500 hover:to-sky-500 hover:transiton-background hover:duration-1000" variant="contained">Sign Up</Button>
                    </Box>
                    <Box className='mt-2'>
                        <Typography className="text-primary">Already have an account <span className="linking" onClick={() => loginRout()}>Login</span></Typography>
                    </Box>
                </div>
            </div>
        </div>
    )
}