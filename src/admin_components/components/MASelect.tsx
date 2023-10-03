import  InputLabel  from "@mui/material"

type selectType = {
  options:any[],
  getValue : any,
}

export default function MASelect(selectProps:selectType){
  const {options,getValue,} = selectProps
let changeVal = (val:any)=>{
    getValue(val)
  }
  return(
    <div>
      <select className='w-25  p-3 mt-5 border-3 border-danger rounded' onChange={(e) => changeVal(e.target.value)}>
        {options.map((x,i) => {
          return(
            <option className="" key={i} value={x.value}>{x.displayName}</option>
          )
        })}
      </select>
    </div>
  )
}
