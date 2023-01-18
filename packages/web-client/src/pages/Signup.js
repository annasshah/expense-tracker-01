import React, { useState } from 'react'
import {
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { primary_color } from '../allStyles'
import { useNavigate } from 'react-router-dom';
import { alert_severity_constants, async_status } from '../utils/contants';
import { useDispatch, useSelector } from 'react-redux'
import { Alert_Message } from '../components/common.js/Alert_Message';
import { user_signup_async } from '../services/auth_service';
import { Box_Container } from '../components/common.js/Box_Container';
import { Loading_Button } from '../components/common.js/Loading_Button';

// NewsСardMedium
// NewsCardMedium
export const Signup = () => {
  const [form_data, setForm_data] = useState({})
  const { signup_status, signup_error } = useSelector(state => state.user_auth)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const submit_handle = (e) => {
    e.preventDefault()
    console.log('working');
    dispatch(user_signup_async(form_data))
  }


  const on_change_handle = (e) => {
    const { id, value } = e.target

    setForm_data({ ...form_data, [id]: value })
  }





  return (<>
    <Box_Container page_title='Signup'>
      <Stack spacing={3}
      component='form'
      autoComplete='off'
      onSubmit={submit_handle}
      >
        <Stack spacing={2}>

          <Stack
            
            direction='row' spacing={2}>
            <TextField
              required={true}
              type='text'
              id='first_name'
              label='First Name'
              variant='outlined'
              onChange={e => on_change_handle(e)}
            />
            <TextField
              required={true}
              type='text'
              id='last_name'
              label='Last Name'
              variant='outlined'
              onChange={e => on_change_handle(e)}
            />
          </Stack>
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
            loading={signup_status === async_status.LOADING}
            variant="outlined"
            color='primary'
            loadingIndicator="Please wait ..."
          >Signup</Loading_Button>
        </Stack>

      </Stack>

      <Stack direction='row' justifyContent='center' alignItems='start' >
        <Typography sx={{ marginRight: 0.7 }} >Already have account </Typography>
        <button onClick={() => navigate('/login')} style={{ marginLeft: '10px', all: 'unset', textTransform: 'none', textDecoration: 'underline', color: primary_color, pointerEvents: 'all', cursor: 'pointer' }}> Login now</button>
      </Stack>
    </Box_Container>
    {<Alert_Message status={signup_status} severity={alert_severity_constants.ERROR} message={signup_error?.message} />}
  </>

  )
}
