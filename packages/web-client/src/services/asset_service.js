import { createAsyncThunk } from "@reduxjs/toolkit"
import { type_constants } from "../utils/contants"
import { axios_handle } from "../config/apiHandle/apiHandle"


export const post_user_assets_async = createAsyncThunk(type_constants.POST_ASSET, async (post_data) => {

    try {
        const res = await axios_handle.post(`/assets`, post_data)
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

export const get_user_assets_async = createAsyncThunk(type_constants.GET_ASSET, async (post_data) => {

    try {
        const res = await axios_handle.get(`/assets`)
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


export const edit_user_assets_async = createAsyncThunk(type_constants.PUT_ASSET, async (post_data) => {

    try {
        const res = await axios_handle.put(`/assets`,post_data)
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