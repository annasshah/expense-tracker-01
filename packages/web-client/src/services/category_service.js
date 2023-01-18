import { createAsyncThunk } from "@reduxjs/toolkit"
import { axios_handle } from "../config/apiHandle/apiHandle"
import { type_constants } from "../utils/contants"



export const get_categories_async = createAsyncThunk(type_constants.GET_CATEGORY, async () => {

    try {
        const res = await axios_handle.get(`/category`)
        const data = await res.data    
        console.log({data});    
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