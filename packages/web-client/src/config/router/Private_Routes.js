import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import {useSelector } from 'react-redux'

export const Record_Assets_Routes = () => {

    const { user_auth, complete_asset_details } = useSelector(state => state.user_auth)
    return (
       !complete_asset_details && user_auth ? <Outlet /> : complete_asset_details && user_auth ?  <Navigate to='/' /> : <Navigate to='/login' />
    )
}


export const Private_Routes = () => {

    const { user_auth, complete_asset_details } = useSelector(state => state.user_auth)
    return (
        user_auth && complete_asset_details ? <Outlet /> :  user_auth && !complete_asset_details ? <Navigate to='/asset-record' /> : <Navigate to='/login' />
    )
}
