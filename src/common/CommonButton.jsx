import React from 'react'
import {  Button } from "@mui/material";
const CommonButton = (props) => {
  const{buttonName,variant,color,type,onClick,fullWidth}=props
  return (
    <>
     <Button
          type={type}
          fullWidth={fullWidth}
          variant={variant}
          color={color}
          onClick={onClick}
          
        >{buttonName}</Button>
    </>
   
  )
}

export default CommonButton