import { Box, Button, Paper, Typography } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import MANavbar from "../../admin_components/components/MANavbar";

export default function Comments() {
    const [comments, setComments] = useState<any>([])
    const getComments = () => {
        axios.get('https://jsonplaceholder.typicode.com/comments')
            .then((res) => {
                console.log(res.data)
                setComments([...res.data])
            })
            .catch((err) => {
                console.log(err.message)
            })
    }

    useEffect(() => {
        getComments()
    }, [])
    const navigate = useNavigate()
    const addCommentsNavigate = () => {
        navigate('/addComments')
    }
    const putComment = (id:any) => {
        navigate(`/addComments/${id}`)
    }
    const params = useParams()
    const deleteComment = () => {
        axios.delete(`https://jsonplaceholder.typicode.com/comments/${params.id}`)
        .then((res) => {
            console.log(res.data)
        })
        .catch((err) => {
            console.log(err.message)
        })
    }
    return (
        <>
        <MANavbar/>
            <Box className="mx-5">

                <div className="d-flex justify-content-between  " style={{marginTop:100}}>
                    <Typography variant="h3">Comments</Typography>
                    <Button onClick={addCommentsNavigate} variant="contained">ADD COMMENTS</Button>
                </div>

            </Box>
            {comments.map((x: any, i: any) => {
                return (
                    <Box>
                        <Paper className="my-3 p-3 mx-5" sx={{ backgroundColor: 'lightgray' }}>
                            <Typography variant="h6">{x.name}</Typography>
                            <Typography variant="body1">{x.email}</Typography>
                            <Typography variant="body2">{x.body}</Typography>
                            <Button className='me-2 mt-2' variant='contained' onClick={deleteComment} color='error' endIcon={<DeleteSharpIcon/>}>Delete</Button>
                            <Button variant='contained' className="mt-2" onClick={() => putComment(x.id)} color='primary' endIcon={<EditSharpIcon/>}>Edit</Button>

                        </Paper>
                    </Box>
                )
            })}
        </>
    )
}