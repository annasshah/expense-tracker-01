import { createSlice } from '@reduxjs/toolkit'
import { get_categories_async } from '../../services/category_service'
import { add_user_transaction_async, get_user_transaction_async, update_user_transaction_async } from '../../services/transaction_service'
import { async_status } from '../../utils/contants'

const initialState = {
    getting_categories_status: async_status.IDLE,
    
    categories:null,

    getting_categories_error: null,
   
}

const category_slice = createSlice({
    name: 'category',
    initialState: initialState,
    reducers: {
       
    },
    extraReducers: (builder) => {

        
        builder.addCase(get_categories_async.pending, (state, action) => {
            state.getting_categories_status = async_status.LOADING
            state.getting_categories_error = null
        })
        
        
        builder.addCase(get_categories_async.fulfilled, (state, {payload}) => {
            state.categories = payload.data
            state.getting_categories_status = async_status.SUCCEEDED
            state.getting_categories_error = null
        })
        
        builder.addCase(get_categories_async.rejected, (state, actions) => {
            state.getting_categories_status = async_status.ERROR
            state.getting_categories_error = actions.error
        })




        builder.addCase(add_user_transaction_async.fulfilled, (state, {payload}) => {
            if(payload.new_category){
                state.categories = [...state.categories, payload.new_category]
            }
        })


        builder.addCase(update_user_transaction_async.fulfilled, (state, {payload}) => {
            if(payload.new_category){
                state.categories = [...state.categories, payload.new_category]
            }
        })





       


    }
})


export const {} = category_slice.actions
export default category_slice.reducer


