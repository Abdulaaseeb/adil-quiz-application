import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

type DateProps = {
    dateChange : any,
    datetype : string
}

export default function MADatepicker(props:DateProps) {
    const { datetype , dateChange} = props
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField className='w-25 date-picker'  id="outlined-basic" color='error' focused onChange={dateChange} type={datetype} variant="outlined" />
    </Box>
  );
}