import { TextField } from '@mui/material'
import React from 'react'

const CommonTextField = (props) => {
    const {labelName,variant,value,handleChange,name}=props
  return (
   <>
    <TextField
             name={name}
             label={labelName}
             variant={variant}
             fullWidth
             required
             value={value}
             onChange={handleChange}
             style={{ marginBottom: "1rem" }}
           />
   </>
  )
}

export default CommonTextField