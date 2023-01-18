import { createAsyncThunk } from "@reduxjs/toolkit"
import { axios_handle } from "../config/apiHandle/apiHandle"
import { type_constants } from "../utils/contants"



export const get_user_transaction_async = createAsyncThunk(type_constants.GET_TRANSACTION, async () => {

    try {
        const res = await axios_handle.get(`/transaction`)
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


export const add_user_transaction_async = createAsyncThunk(type_constants.ADD_TRANSACTION, async (post_data) => {

    try {
        const res = await axios_handle.post(`/transaction`,post_data)
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


export const update_user_transaction_async = createAsyncThunk(type_constants.EDIT_TRANSACTION, async (post_data) => {

    try {
        const res = await axios_handle.put(`/transaction/${post_data.id}`,post_data.data)
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


export const delete_user_transaction_async = createAsyncThunk(type_constants.DELETE_TRANSACTION, async (id) => {

    try {
        const res = await axios_handle.delete(`/transaction/${id}`)
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