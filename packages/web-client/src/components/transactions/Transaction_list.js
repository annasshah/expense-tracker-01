import { Button, CircularProgress, Divider, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { TfiReload } from 'react-icons/tfi'
import { AiOutlinePlus } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { text_color, title_color } from '../../allStyles'
import { delete_user_transaction_async, get_user_transaction_async } from '../../services/transaction_service'
import { async_status } from '../../utils/contants'
import { Icon_Button } from '../common.js/Icon_Button'
import { Transaction_Card } from './Transaction_Card'
import { Add_Edit_Modal } from './Add_Edit_Modal'
import { set_edit_transaction_state, set_idle_add_update_transaction_status } from '../../store/slices/user_transactions_slice'



const Render_List = ({open_modal_handle}) => {

  const { getting_user_transactions_status, user_transaction, getting_user_transactions_error } = useSelector(state => state.user_transaction)
  
  const dispatch = useDispatch()


  const edit_handle = (e) => {
    dispatch(set_edit_transaction_state({state:true,data:e}))
    open_modal_handle()
    
    
  }
  
  const delete_handle = (e) => {
    dispatch(delete_user_transaction_async(e._id))

  }


  if (getting_user_transactions_status === async_status.IDLE || getting_user_transactions_status === async_status.LOADING) {

    return <Loading_Data />
  }


  if (getting_user_transactions_status === async_status.ERROR) {

    return <Display_Message message={getting_user_transactions_error?.message} color='red' />
  }


  if (getting_user_transactions_status === async_status.SUCCEEDED) {

    return <Stack sx={{ overflowY: 'auto' }} >
      {user_transaction?.length ?
        <Stack spacing={2} px={3}>
          {user_transaction.map((parent_elem,ind) => {
            const { data, date_range } = parent_elem
            return <Stack key={ind} spacing={1}>
              <Typography fontWeight='bold' color={title_color}>{date_range}</Typography>
              {React.Children.toArray(data.map((child_elem,index) => {
                const { } = child_elem
                return <Transaction_Card edit_handle={() => edit_handle(child_elem)} delete_handle={() => delete_handle(child_elem)} data={child_elem} />
              }))
              }
            </Stack>
          })}

        </Stack>


        : <Display_Message message='No transaction found!' color='lightgray' />
      }

    </Stack>

  }
}


const Loading_Data = () => {

  return <Stack alignItems='center' px={3}>
    <CircularProgress />
  </Stack>
}



const Display_Message = ({ color, message }) => {

  return <Stack justifyContent='center' px={3}>
    <Typography color={color}>
      {message}
    </Typography>
  </Stack>

}

export const Transaction_list = () => {

  const { getting_user_transactions_status, user_transaction, getting_user_transactions_error } = useSelector(state => state.user_transaction)
  const { post_transaction_status, edit_transaction_status, post_transaction_error, edit_transaction_error } = useSelector(state => state.user_transaction)
  const [is_open, setIs_open] = useState(false)

  const dispatch = useDispatch()

  const close_modal_handle = () => {
    dispatch(set_edit_transaction_state({state:false,data:null}))
    setIs_open(false)
  }

  const open_modal_handle = () => {
    setIs_open(true)
  }




  const refresh_handle = () => {
    dispatch(get_user_transaction_async())
  }


  useEffect(() => {

    if (getting_user_transactions_status === async_status.IDLE) {
      dispatch(get_user_transaction_async())
    }

  }, [])


  const add_new_transaction = () => {
    setIs_open(true)
  }






  useEffect(() => {

    if ([post_transaction_status, edit_transaction_status].includes(async_status.LOADING)) {
      dispatch(set_idle_add_update_transaction_status())
      close_modal_handle()
    }

    


  }, [post_transaction_status,edit_transaction_status])
  




  return (<>


    <Stack direction='row' px={3} mb={2}>
      <Stack flex={1}>
        <Typography color={text_color} fontWeight='bold'>Transactions</Typography>
      </Stack>
      <Stack alignItems='flex-end' spacing={2} direction='row'>
        <Stack mt={0.5}>
        <Icon_Button onClick={refresh_handle} icon={<TfiReload size={18} color='lightgray' />} />
        </Stack>
        <Button onClick={add_new_transaction} size='small' variant='outlined' color='success' >Add New</Button>
      </Stack>
    </Stack>



    <Render_List open_modal_handle={open_modal_handle} />






    <Add_Edit_Modal  is_open={is_open} close_modal_handle={close_modal_handle} />





  </>
  )

}
