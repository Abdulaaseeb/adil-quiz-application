import * as React from 'react';
import Switch from '@mui/material/Switch';
import { Check } from '@mui/icons-material';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

type switchprops ={
    Check : boolean,
    able : boolean
}

export default function MASwitches(props : switchprops) {
    const {Check , able} = props
  return (
    
      <Switch className='mt-5 mx-3' color='error'  defaultChecked = {Check} disabled = {able} {...label}/>

  );
}