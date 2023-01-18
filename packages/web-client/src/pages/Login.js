import React, { useState } from 'react'
import {
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { primary_color } from '../allStyles'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { alert_severity_constants, async_status } from '../utils/contants';
import { Alert_Message } from '../components/common.js/Alert_Message';
import { user_login_async } from '../services/auth_service';
import { Box_Container } from '../components/common.js/Box_Container';
import { Loading_Button } from '../components/common.js/Loading_Button';


export const Login = () => {
  const { login_status, login_error } = useSelector(state => state.user_auth)

  const [form_data, setForm_data] = useState({})

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const submit_handle = (e) => {
    e.preventDefault()

    dispatch(user_login_async(form_data))
    
  }


  const on_change_handle = (e) => {
    const { id, value } = e.target

    setForm_data({ ...form_data, [id]: value })
  }




  return (<>
    
    <Box_Container page_title='Login'>
      <>
        <Stack
          component='form'
          autoComplete='off'
          onSubmit={submit_handle}
          spacing={3}>
          <Stack spacing={2}>
            <TextField
              required={true}
              type='email'
              id='email'
              label='Email'
              variant='outlined'
              onChange={e => on_change_handle(e)}
            />
            <TextField
              required={true}
              type='password'
              id='password'
              label='Password'
              variant='outlined'
              onChange={e => on_change_handle(e)}
            />
          </Stack>
          <Stack>
            <Loading_Button
              type='submit'
              loading={login_status === async_status.LOADING}
              loadingIndicator="Please wait ..."
            >Login</Loading_Button>
          </Stack>

        </Stack>
        <Stack direction='row' justifyContent='center' alignItems='start'  >
          <Typography sx={{ marginRight: 0.7 }} >Don't have account </Typography>
          <button onClick={() => navigate('/signup')} style={{ marginLeft: '10px', all: 'unset', textTransform: 'none', textDecoration: 'underline', color: primary_color, pointerEvents: 'all', cursor: 'pointer' }}> Create account</button>
        </Stack>
      </>
    </Box_Container>

    {<Alert_Message status={login_status} severity={alert_severity_constants.ERROR}  message={login_error?.message} />}
  </>
  )
}
