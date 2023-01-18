import React, { useState } from 'react'
import {Grid, MenuItem, OutlinedInput, Select, Stack, SvgIcon, Typography } from '@mui/material'
import { Paper_Container } from '../components/common.js/Paper_Container'
import { text_color } from '../allStyles'
import { asset_record_inputs } from '../utils/input_list';
import { currency_list } from '../utils/currency_list';
import { post_user_assets_async } from '../services/asset_service';
import { useDispatch, useSelector } from 'react-redux';
import { alert_severity_constants, async_status } from '../utils/contants';
import { Alert_Message } from '../components/common.js/Alert_Message';
import { Loading_Button } from '../components/common.js/Loading_Button';

export const Asset_Records = () => {
  const [form_data, setForm_data] = useState({})
  const { post_asset_status, user_assets, post_asset_error} = useSelector(state => state.user_asset)


  const dispatch = useDispatch()
  
  const submit_handle = (e) => {
    e.preventDefault()


    dispatch(post_user_assets_async(form_data))


  }
  
  
  const on_change_handle = (e) => {
    const {name, value} = e.target

    setForm_data({ ...form_data, [name]: value })
  }



  return (<>


    <Stack my={3}
      component='form'
      autoComplete='off'
      onSubmit={submit_handle}

    >

      <Paper_Container
      >
        <Stack

          spacing={4}>
          <Stack >
            <Typography color={text_color} fontWeight='bold'>
              Record your assets
            </Typography>
            <Typography fontSize={12} variant='body2' color={text_color}>
              Plese Provide your current asset details
            </Typography>
          </Stack>

          <Stack >
            <Grid container spacing={3}>
              {
              React.Children.toArray(asset_record_inputs.map((elem) => {

                  const { field_name, type, icon, place_holder, field_type, id } = elem

                  return <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
                    <Stack spacing={1}>
                      <Stack spacing={1} direction='row' alignItems='center'>
                        <SvgIcon>
                          {icon}
                        </SvgIcon>
                        <Typography color={text_color} fontWeight='bold'>{field_name}</Typography>
                      </Stack>


                     {field_type === 'input' ?  <OutlinedInput name={id} onChange={(e)=>on_change_handle(e)} required={true} type={type} placeholder={place_holder} /> :
                     field_type === 'select' ? <Select 
                     
                     name={id} onChange={(e)=>on_change_handle(e)} required={true} defaultValue='-' placeholder='Select Currency'>
                     <MenuItem value='-'>Select Currency</MenuItem>
   
                       {currency_list.map((item, ind)=>{
                         return  <MenuItem key={ind} value={item.code}>{item.code} - {item.name}</MenuItem>
                       })}
                     </Select> : null
                    }
                    </Stack>
                  </Grid>
                }))
              }
            </Grid>
          </Stack>

          <Stack justifyContent='start' my={3} direction='row'>
          <Loading_Button
          fullWidth={false}
              type='submit'
              loading={post_asset_status !== async_status.LOADING}
              variant="outlined"
              color='primary'
              loadingIndicator="Please wait..."
              sx={{ py: 1.5, textTransform: 'none', minWidth:'200px' }}
            >Submit Details</Loading_Button>
          </Stack>

        </Stack>
      </Paper_Container>





    </Stack>
    
    {<Alert_Message status={post_asset_status} severity={alert_severity_constants.ERROR}  message={post_asset_error?.message} />}
    </>
  )
}
