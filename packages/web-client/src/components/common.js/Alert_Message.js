import { Alert, Stack } from '@mui/material'
import React from 'react'
import { alert_severity_constants, async_status } from '../../utils/contants'


export const Render_Alert_Compoenent = ({ severity, message }) => {

    return <Stack sx={{ position: 'fixed', center: 0, right: 0, left: 0, top: 0 , zIndex:10001}}>
        <Alert severity={severity} >{message}</Alert>
    </Stack>

}

export const Alert_Message = ({status, severity, message }) => {

    const render_component = severity === alert_severity_constants.ERROR && status === async_status.ERROR ? alert_severity_constants.ERROR : severity === alert_severity_constants.SUCCESS &&  status === async_status.SUCCEEDED ? alert_severity_constants.SUCCESS : null
    return (<>

       { render_component &&  <Render_Alert_Compoenent severity={render_component} message={message} /> }
    </>
    )
}
