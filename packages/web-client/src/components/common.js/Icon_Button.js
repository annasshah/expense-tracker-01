import React from 'react'
import { SvgIcon } from '@mui/material'
import { RiEditFill } from 'react-icons/ri';

export const Icon_Button = ({onClick , icon, disabled}) => {
  return (


    <button disabled={disabled ? disabled : false} onClick={onClick} style={{all:'unset', cursor:'pointer', pointerEvents:'all'}}>

        <SvgIcon>
            {icon}
        </SvgIcon>
    </button>
  )
}
