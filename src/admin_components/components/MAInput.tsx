import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

type inpProps = {
    inpChange : any,
    inpLabel : string,
    inptype : string
}

export default function MATextFields(props:inpProps) {
    const {inpLabel , inptype , inpChange} = props
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField className='w-25' id="outlined-basic" color='error' focused label={inpLabel} onChange={inpChange} type={inptype} variant="standard" />
    </Box>
  );
}