import { Box, Paper, Typography , TextField, Button} from "@mui/material";
import {Link , useNavigate} from 'react-router-dom'
export default function PageNFound(){
    return(
        <Box>
            <div className="bg-gradient-to-r from-indigo-500 via-sky-500 to-indigo-500  flex justify-center h-screen items-center">
                <div className="p-5 bg-light border border-primary shadow-lg rounded">
                    <Box>
                    <Typography className="text-center text-primary" variant="h5">PAGE NOT FOUND</Typography>
                    </Box>

                </div>
            </div>
        </Box>
    )
}