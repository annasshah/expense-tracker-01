import { IconButton, Stack, Typography } from '@mui/material'
import React from 'react'
import { Paper_Container } from './common.js/Paper_Container'
import logo from '../assets/Expense-Tracker.png'
import { useDispatch, useSelector } from 'react-redux'
import { primary_color, text_color } from '../allStyles'
import { logout_user_async } from '../services/auth_service'
import { FiPower } from 'react-icons/fi';
import { NavLink } from "react-router-dom";
import { route_list } from '../utils/route_list'



const Nav_Menu_items = () => {

   return React.Children.toArray(route_list.map((item) => {

    const { caption, linkTo, menu_item } = item
    return menu_item && <NavLink
        to={linkTo}
        style={({ isActive }) => {
            return {
                textDecoration: 'none',
                color: isActive ? "#4e4e4e" : '#99a0b2',
                fontWeight: 'bold',
            }
        }
        }
    >
        {caption}

    </NavLink>

}))



}










export const Navbar_Component = () => {

    const { user_data } = useSelector(state => state.user_auth)

    const dispatch = useDispatch()

    const logout_handle = () => {
        dispatch(logout_user_async())
    }
    return (
        <Stack my={2}>
            {/* <Paper_Container
            > */}
            <Stack flexWrap='wrap' direction='row' justifyContent='space-between' alignItems='center'>
                <Stack>
                    <img src={logo} width='120' />
                </Stack>

                <Stack direction='row' alignItems='center' spacing={2}>
                    <Nav_Menu_items />
                    <IconButton onClick={logout_handle} color='error' aria-label="logout">
                        <FiPower size={20} />
                    </IconButton>
                </Stack>
            </Stack>
            {/* </Paper_Container> */}

        </Stack>
    )
}
