import { Paper, Stack, SvgIcon, Typography } from '@mui/material'
import React from 'react'
import { FiEdit3 } from 'react-icons/fi'
import { RiCloseFill, RiEditFill } from 'react-icons/ri'
import { useSelector } from 'react-redux'
import { currency_format, date_formater } from '../../utils/common_functions'
import { render_cards_data, assets_icon } from '../../utils/input_list'
import { Icon_Button } from '../common.js/Icon_Button'

// const data2 = {
//   icon: assets_icon.saving,
//   theme: render_cards_data.saving.theme,
//   paid_from: 'saving',
//   description: 'Description Description ',
//   amount:'58.22', 
//   createdAt:'2023-01-01T19:15:55.144+00:00',
//   currency:'USD'
// }

export const Transaction_Card = ({ data, edit_handle, delete_handle }) => {

  const { user_assets } = useSelector(state => state.user_asset)
  const currency = user_assets ? user_assets.currency : 'USD'

  const {amount, category_data, createdAt, paid_from , _id , description} = data

  const {icon,theme} = render_cards_data[paid_from]



  // const { theme, icon } = data2




  return (
    <Stack>
      <Paper sx={{ borderRadius: 3, backgroundColor: theme.background }}
        elevation={0}
      >
        <Stack spacing={1} direction='row' alignItems='center' py={1.5} px={2} >
          <Stack py={0.5} pr={0.5} alignItems='flex-start'  >
            <Stack spacing={0.5} width='50px' alignItems='center'>
              <SvgIcon sx={{ fontSize: 27, color: theme.main_text }}>
                {icon}
              </SvgIcon>
              <Typography color={theme.caption} textTransform='capitalize' fontSize={13} fontWeight='bold' >
                {paid_from}
              </Typography>
            </Stack>
          </Stack>
          <Stack flex={1} >
            <Typography fontSize={20} fontWeight='bold' >
              -{currency_format(amount,currency)}
            </Typography>
            <Typography color='gray' fontSize={13} >
              {description}
            </Typography>
            <Typography fontSize={11} color={theme.caption}>
              {category_data[0].category}
            </Typography>
          </Stack>
          <Stack spacing={2} direction='row'>
            <Stack>
              <Icon_Button onClick={edit_handle} icon={<FiEdit3 size={20} color='green' />} />
            </Stack>
            <Stack>
            <Icon_Button onClick={delete_handle} icon={<RiCloseFill size={22} color='gray' />} />
            </Stack>
          </Stack>
        </Stack>
      </Paper>

    </Stack>
  )
}
