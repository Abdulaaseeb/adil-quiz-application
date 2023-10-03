import { Box, Button, Paper, TextField, Typography } from "@mui/material"
import axios from 'axios'
import { useState , useEffect } from "react"
import { useParams } from "react-router-dom"


export default function AddComments() {
    const [addComments, setAddComments] = useState<any>({})
    const PostComment = () => {
        addComments.postId = 101
       axios.post('https://jsonplaceholder.typicode.com/comments',addComments)
            .then((res) => {
                console.log(res.data)
                setAddComments({ ...res.data })
            })
            .catch((err) => {
                console.log(err.message)
            })
    }
    const getCommentById = () => {
        axios.get(`https://jsonplaceholder.typicode.com/comments/${params.id}`)
        .then((res) => {
            setAddComments({...res.data})
        })
        .catch((err) => {
            console.log(err.message)
        })
    }
    useEffect(() => {
        getCommentById()
    },[])
    const params = useParams()
    const updateComment = () => {
        axios.put(`https://jsonplaceholder.typicode.com/comments/${params.id}`,addComments)
        .then((res) => {
            setAddComments({...res.data})
        })
        .catch((err) => {
            console.log(err.message)
        })
    }
    return (
        <>
            <Box className=' d-flex justify-content-center align-items-center' sx={{ height: '100vh', backgroundColor: 'lightgray' }}>
                <Box className="p-5 bg-light border rounded shadow-lg border-primary">
                    <Box>
                        {params.id ? (<Typography variant="body1" className="text-center text-primary" >EDIT COMMENT</Typography>):(<Typography variant="body1" className="text-center text-primary" >ADD COMMENT</Typography>)} 
                    </Box>
                    <Box className='mt-3'>
                        <TextField variant="standard" color="primary" focused placeholder="Name" value={addComments.name} onChange={(e) => setAddComments({ ...addComments, name: e.target.value })} />
                    </Box>
                    <Box className='mt-3'>
                        <TextField variant="standard" color="primary" focused placeholder="Email" value={addComments.email}  onChange={(e) => setAddComments({ ...addComments, email: e.target.value })} />
                    </Box>
                    <Box className='mt-3'>
                    </Box>
                        <TextField variant="filled" color="primary" focused multiline rows={4} value={addComments.body}  placeholder="Description" onChange={(e) => setAddComments({ ...addComments, body: e.target.value })} />
                    <Box className='mt-3'>
                        {params.id ? ( <Button onClick={updateComment} className="w-100" variant="contained">Edit</Button>):(<Button onClick={PostComment} className="w-100" variant="contained">ADD</Button>)}    
                    </Box>
                </Box>
            </Box>
        </>
    )
}