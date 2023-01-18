import { CircularProgress, Grid, Paper, SvgIcon, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { edit_user_assets_async, get_user_assets_async } from '../services/asset_service'
import { async_status } from '../utils/contants'
import { render_cards_data } from '../utils/input_list'
import { Icon_Button } from './common.js/Icon_Button'
import { Paper_Container } from './common.js/Paper_Container'
import { BiCheck } from 'react-icons/bi';
import { RiCloseFill, RiEditFill } from 'react-icons/ri'
import { set_edit_field } from '../store/slices/user_assets_slice'
import { currency_format } from '../utils/common_functions'


const Asset_Loading = ({ color }) => {

    return <Stack pt={1.5} px={3}>
        <CircularProgress size={25} sx={{ color: color }} >loading...</CircularProgress>
    </Stack>
}






const render_total_assets = (assets) => {
    const { cash, bank, saving, currency } = assets
    const total = cash + bank + saving
    return currency_format(total, currency)
}



const Asset_Edit_State = ({ defaultValue, on_submit_handle, color, close_edit_handle }) => {

    const [input_value, setInput_value] = useState(defaultValue)


    const on_change_handle = (e) => {
        const value = e.target.value

        setInput_value(value)

    }


    return <Stack spacing={2} flex={1} pl={2} pb={0.5} direction='row'  alignItems='center' sx={{width:'100$%'}}>
        <Stack  flex={2}>
            <input className='edit_input' style={{
                fontSize: 25, color: color, fontWeight: 'bold', width:'100%', borderBottom: `2px solid ${color}` }} value={input_value} defaultValue={defaultValue} onChange={(e) => on_change_handle(e)} />
        </Stack>


        <Stack direction='row' alignItems='center' spacing={5}>
            <Icon_Button onClick={()=>on_submit_handle(input_value)} icon={<BiCheck color='green' />} />
            <Icon_Button onClick={close_edit_handle}  icon={<RiCloseFill color='red' />} />
        </Stack>
    </Stack>

}






const Asset_Card = ({ data }) => {

    const { user_assets, getting_asset_status, edit_asset_status, edit_asset_field } = useSelector(state => state.user_asset)

    const { theme, caption, id, icon } = data

    const [edit_state, setEdit_state] = useState(false)

    const dispatch = useDispatch()




    const on_submit_handle = (e) => {
        setEdit_state(false)
        dispatch(set_edit_field(id))
        dispatch(edit_user_assets_async({[id]:e}))

    }


    return <Stack>
        <Stack >
            <Paper
                sx={{ borderRadius: 3, backgroundColor: theme.background }}
                elevation={0}
            >
                <Stack
                    spacing={1}
                    px={3}
                    py={2}
                >
                    <Stack
                        spacing={1} direction='row' alignItems='center'>
                        <SvgIcon>
                            {icon}
                        </SvgIcon>
                        <Typography color={theme.caption} fontWeight='bold'>{caption}</Typography>

                    </Stack>

                    {getting_asset_status === async_status.LOADING ?
                        <Stack>
                            <Asset_Loading color={theme.main_text} />
                        </Stack> : getting_asset_status === async_status.SUCCEEDED ?

                            <> {edit_state ? <Stack>

                                <Asset_Edit_State close_edit_handle={() => setEdit_state(false)} defaultValue={user_assets[id]} on_submit_handle={on_submit_handle} color={theme.main_text} />

                            </Stack> :
                                <Stack direction='row' justifyContent='space-between'>{
                                    edit_asset_status === async_status.LOADING && edit_asset_field === id || edit_asset_status === async_status.LOADING && id === 'total_assets' ? <Asset_Loading color={theme.main_text} /> :
                                        <Typography color={theme?.main_text} fontWeight='bold' fontSize={25}>

                                            {id === 'total_assets' ? render_total_assets(user_assets) : `${currency_format(user_assets[id], user_assets.currency)}`}
                                        </Typography>
                                }

                                    {id !== 'total_assets' && <Icon_Button icon={<RiEditFill color={theme.caption} />} onClick={() => setEdit_state(true)}  />}
                                </Stack>

                            }


                            </>
                            : <Typography>---</Typography>}
                </Stack>
            </Paper>
        </Stack>
    </Stack>

}

export const Render_Asset_Cards = () => {

    const { getting_asset_status } = useSelector(state => state.user_asset)

    const dispatch = useDispatch()

    useEffect(() => {

        if (getting_asset_status === async_status.IDLE) {
            dispatch(get_user_assets_async())
        }

    }, [])




    return (
        <>
            <Paper_Container
            >
                <Stack direction='row'>

                    <Grid container spacing={2}>
                        {
                            Object.values(render_cards_data).map((elem, ind) => {
                                return <Grid key={ind} item xs={12} sm={6} md={3} lg={3} xl={3}>
                                    <Asset_Card data={elem} />
                                </Grid>
                            })
                        }
                    </Grid>
                </Stack>

            </Paper_Container>
        </>
    )
}
