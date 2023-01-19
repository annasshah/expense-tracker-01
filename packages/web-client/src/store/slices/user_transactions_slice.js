import { createSlice } from '@reduxjs/toolkit'
import { add_user_transaction_async, delete_user_transaction_async, get_user_transaction_async, update_user_transaction_async } from '../../services/transaction_service'
import { async_status } from '../../utils/contants'

const initialState = {
    getting_user_transactions_status: async_status.IDLE,
    post_transaction_status: async_status.IDLE,
    edit_transaction_status: async_status.IDLE,
    delete_transaction_status: async_status.IDLE,

    graph_data:[],
    user_transaction:[],
    edit_transaction_data: '',
    edit_transaction_state: false,

    getting_user_transactions_error: null,
    post_transaction_error: null,
    edit_transaction_error: null,
    delete_transaction_error: null,

}

const user_transactions_slice = createSlice({
    name: 'user_transactions',
    initialState: initialState,
    reducers: {
        set_idle_add_update_transaction_status(state,{payload}){
            state.post_transaction_status = async_status.IDLE
            state.edit_transaction_status = async_status.IDLE
        },
        set_edit_transaction_state(state,{payload}){
            state.edit_transaction_state = payload.state
            state.edit_transaction_data = payload.data
        }
       
    },
    extraReducers: (builder) => {

        
        builder.addCase(get_user_transaction_async.pending, (state, action) => {
            state.getting_user_transactions_status = async_status.LOADING
            state.getting_user_transactions_error = null
        })
        
        
        builder.addCase(get_user_transaction_async.fulfilled, (state, {payload}) => {
            state.user_transaction = payload.data
            state.graph_data = payload.graph_data
            state.getting_user_transactions_status = async_status.SUCCEEDED
            state.getting_user_transactions_error = null
        })
        
        builder.addCase(get_user_transaction_async.rejected, (state, actions) => {
            state.getting_user_transactions_status = async_status.ERROR
            state.getting_user_transactions_error = actions.error
        })



        builder.addCase(add_user_transaction_async.pending, (state, action) => {
            state.post_transaction_status = async_status.LOADING
            state.post_transaction_error = null
        })
        
        
        builder.addCase(add_user_transaction_async.fulfilled, (state, {payload}) => {
            state.user_transaction = payload.transactions
            state.graph_data = payload.graph_data
            state.post_transaction_status = async_status.SUCCEEDED
            state.post_transaction_error = null
        })
        
        builder.addCase(add_user_transaction_async.rejected, (state, actions) => {
            state.post_transaction_status = async_status.ERROR
            state.post_transaction_error = actions.error
        })


        builder.addCase(update_user_transaction_async.pending, (state, action) => {
            state.edit_transaction_status = async_status.LOADING
            state.post_transaction_error = null
        })
        
        
        builder.addCase(update_user_transaction_async.fulfilled, (state, {payload}) => {
            state.user_transaction = payload.transactions
            state.graph_data = payload.graph_data
            state.edit_transaction_status = async_status.SUCCEEDED
            state.post_transaction_error = null
            state.edit_transaction_state = false
            state.edit_transaction_data = null
        })
        
        builder.addCase(update_user_transaction_async.rejected, (state, actions) => {
            state.edit_transaction_status = async_status.ERROR
            state.post_transaction_error = actions.error
        })






        builder.addCase(delete_user_transaction_async.pending, (state, action) => {
            state.delete_transaction_status = async_status.LOADING
            state.delete_transaction_error = null
        })
        
        
        builder.addCase(delete_user_transaction_async.fulfilled, (state, {payload}) => {
            state.user_transaction = payload.transactions
            state.graph_data = payload.graph_data
            state.delete_transaction_status = async_status.SUCCEEDED
            state.delete_transaction_error = null
        })
        
        builder.addCase(delete_user_transaction_async.rejected, (state, actions) => {
            state.delete_transaction_status = async_status.ERROR
            state.delete_transaction_error = actions.error
        })




       


    }
})


export const {set_idle_add_update_transaction_status, set_edit_transaction_state} = user_transactions_slice.actions
export default user_transactions_slice.reducer


