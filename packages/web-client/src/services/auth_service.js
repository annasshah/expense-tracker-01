import { createAsyncThunk } from "@reduxjs/toolkit"
import { axios_handle } from "../config/apiHandle/apiHandle"
import { type_constants, TYPE_LOGOUT_USER } from "../utils/contants"



export const user_login_async = createAsyncThunk(type_constants.USER_LOGIN, async (post_data) => {

    try {
        const res = await axios_handle.post(`/login`, post_data)
        const data = await res.data        
        return data
    } catch (error) {
        if (error?.response?.data) {
            throw Error(error.response.data.message)
        }
        else {
            throw Error(error.message)
        }
    }
})

export const user_signup_async = createAsyncThunk(type_constants.USER_SIGNUP, async (post_data) => {

    try {
        const res = await axios_handle.post(`/signup`, post_data)
        const data = await res.data        
        return data
    } catch (error) {
        if (error?.response?.data) {
            throw Error(error.response.data.message)
        }
        else {
            throw Error(error.message)
        }
    }
})


export const check_user_auth_async = createAsyncThunk(type_constants.CHECK_USER_AUTH, async () => {

    try {
        const res = await axios_handle.get('/check-auth')
        const data = await res.data  
        return data
    } catch (error) {
        if (error?.response?.data) {
            throw Error(error.response.data.message)
        }
        else {
            throw Error(error.message)
        }
    }
})


export const logout_user_async = createAsyncThunk(type_constants.TYPE_LOGOUT_USER, async () => {

    try {
        const res = await axios_handle.post('/logout')
        const data = await res.data        
        return data
    } catch (error) {
        if (error?.response?.data) {
            throw Error(error.response.data.message)
        }
        else {
            throw Error(error.message)
        }
    }
})