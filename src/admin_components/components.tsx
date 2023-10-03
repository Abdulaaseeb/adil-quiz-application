import React from 'react';
import MAButtons from './components/MAButton';
import MADatepicker from './components/MADatepicker';
import MASelect from './components/MASelect';
import MASwitches from './components/MASwitch';
import MATextFields from './components/MAInput';
import MAIconsButtons from './components/MAIconbutton';
import MATable from './components/MATable';
import AbcSharpIcon from '@mui/icons-material/AbcSharp';
import AccessAlarmSharpIcon from '@mui/icons-material/AccessAlarmSharp';
import AccountBalanceSharpIcon from '@mui/icons-material/AccountBalanceSharp';
import AdUnitsSharpIcon from '@mui/icons-material/AdUnitsSharp';
import AddBoxSharpIcon from '@mui/icons-material/AddBoxSharp';
import MANavbar from './components/MANavbar';

function AppComponents() {
  let arrOfTable = [
    {
      name: "Adil",
      id: 1,
      age: 17,
      isActive: "Yes",
      category: "ABC",
      fieldSet: <input className='rounded p-2' placeholder='Enter Your Message ' />,
    },
    {
      name: "Haseeb",
      id: 2,
      age: 16,
      isActive: "No",
      category: "DEF",
      fieldSet: <input className='rounded p-2' placeholder='Enter Your Message ' />,
    },
    {
      name: "Raheem",
      id: 3,
      age: 13,
      isActive: "No",
      category: "GHI",
      fieldSet: <input className='rounded p-2' placeholder='Enter Your Message ' />,
    },
    {
      name: "Shakoor",
      id: 4,
      age: 12,
      isActive: "No",
      category: "JKL",
      fieldSet: <input className='rounded p-2' placeholder='Enter Your Message ' />,
    },
    {
      name: "Mannan",
      id: 5,
      age: 5,
      isActive: "Yes",
      category: "mno",
      fieldSet: <input className='rounded p-2' placeholder='Enter Your Message ' />,
    },
    {
      name: "Ali",
      id: 6,
      age: 17,
      isActive: "No",
      category: "XYZ",
      fieldSet: <input className='rounded p-2' placeholder='Enter Your Message ' />,
    },
  ]
  return (
    <div className="App" >
       
      <MANavbar/>   
      <h1 className=' mb-2 text-danger' style={{marginTop:80}}>COMPONENTS</h1>
        <MAButtons btnvalue='Adil' btnclick={() => alert("Adil")}/>
        <MAButtons btnvalue='Haseeb' btnclick={() => alert("Haseeb")}/>
        <MAButtons btnvalue='Raheem' btnclick={() => alert('Raheem')}/>
        <MAButtons btnvalue='Shakoor' btnclick={() => alert('Shakoor')}/>
        <MAButtons btnvalue='Mannan' btnclick={() => alert('Mannan')}/>
        <div>
        <MAIconsButtons iconposition={<AbcSharpIcon/>} iconvalue='ABC' iconclick={() => alert("ABC ICON")}/>
        <MAIconsButtons iconposition={<AccessAlarmSharpIcon/>} iconvalue='Alaram' iconclick={() => alert("ALARAM ICON")}/>
        <MAIconsButtons iconposition={<AccountBalanceSharpIcon/>} iconvalue='Account' iconclick={() => alert("ACCOUNT ICON")}/>
        <MAIconsButtons iconposition={<AdUnitsSharpIcon/>} iconvalue='Units' iconclick={() => alert("UNITS ICON")}/>
        <MAIconsButtons iconposition={<AddBoxSharpIcon/>} iconvalue='AddBox' iconclick={() => alert("ADDBOX ICON")}/>
        </div>
        <div>
         <MASwitches Check = {false} able = {false}/>
         <MASwitches Check  able = {false}/>
         <MASwitches Check = {false} able />
         <MASwitches Check able />
        </div>
        <div className='mt-5'>
          <MATextFields inpChange={() => alert("It's type is text ")} inptype='text' inpLabel='TEXT'/>
          <MATextFields inpChange={() => alert("It's type is number '123'")} inptype='number' inpLabel='NUMBER'/>
          <MATextFields inpChange={() => alert("It's type is password ")} inptype='password' inpLabel='PASSWORD'/>
          <MATextFields inpChange={() => alert("It's type is email ")} inptype='email' inpLabel='EMAIL'/>
          <MATextFields inpChange={() => alert("It's type is name ")} inptype='name' inpLabel='NAME'/>
          <MADatepicker dateChange={() => alert("It's type is date")} datetype='date'/>
        </div>
        <MASelect options={[

{
  value: "Samsung",
  displayName: "Samsung"
},
{
  value: "Vivo",
  displayName: "Vivo"
},
{
  value: "Infinix",
  displayName: "Infinix"
},
{
  value: "IPhone",
  displayName: "IPhone"
},
{
  value: "Oppo",
  displayName: "Oppo"
},
]}
getValue={(e: any) => { alert(e) }} />

        <MATable dataSource={arrOfTable} cols={[
        {
          heading: "NAME",
          key: "name"
        },
        {
          heading: "ID",
          key: "id"
        },
        {
          heading: "AGE",
          key: "age"
        },
        {
          heading: "ISACTIVE",
          key: "isActive"
        },
        {
          heading: "CATEGORY",
          key: "category"
        },
        {
          heading: "FIELD SET",
          key: "fieldSet"
        },
      ]} />
    </div>
  );
}

export default AppComponents;
