import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


export const Public_Routes = () => {

    const { user_auth } = useSelector(state => state.user_auth)
    return (
        !user_auth ? <Outlet /> : <Navigate to='/' />
    )
}
