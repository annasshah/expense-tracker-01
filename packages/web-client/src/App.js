import { LinearProgress, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RouterApp } from './config/router/RouterApp'
import './App.css'

import { check_user_auth_async } from './services/auth_service'
import {set_initial_auth_false } from './store/slices/user_auth_slice'
import { async_status, save_token_constant } from './utils/contants'

const App = () => {

  const { initial_auth_check_status, initial_auth_check_error, logout_status } = useSelector(state => state.user_auth)


  const dispatch = useDispatch()


  useEffect(() => {

    if (localStorage.getItem(save_token_constant)) {
      if (initial_auth_check_status === async_status.IDLE) {
        dispatch(check_user_auth_async())
      }
    }
    else {
      dispatch(set_initial_auth_false())
    }


  }, [,initial_auth_check_status])




  if (initial_auth_check_status === async_status.LOADING || initial_auth_check_status === async_status.IDLE || logout_status === async_status.LOADING) {

    return <Stack>

      <LinearProgress />
    </Stack>

  }



  if (initial_auth_check_status === async_status.SUCCEEDED) {

    return <RouterApp />
  }



  if (initial_auth_check_status === async_status.ERROR) {

    return <Stack>
      <Typography align='center' color='red'>
        {initial_auth_check_error?.message}
      </Typography>
    </Stack>
  }




}

export default App