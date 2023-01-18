import { createSlice } from '@reduxjs/toolkit'
import { edit_user_assets_async, get_user_assets_async, post_user_assets_async } from '../../services/asset_service'
import { add_user_transaction_async, delete_user_transaction_async, update_user_transaction_async } from '../../services/transaction_service'
import { async_status } from '../../utils/contants'

const initialState = {
    getting_asset_status: async_status.IDLE,
    post_asset_status: async_status.IDLE,
    edit_asset_status: async_status.IDLE,
    
    user_assets:null,
    edit_asset_field: '',

    getting_asset_error: null,
    post_asset_error: null,
    edit_asset_error: null,

}

const user_assets_slice = createSlice({
    name: 'user_assets',
    initialState: initialState,
    reducers: {
        set_edit_field(state,{payload}){
            state.edit_asset_field = payload
        }
    },
    extraReducers: (builder) => {

        
        builder.addCase(post_user_assets_async.pending, (state, action) => {
            state.post_asset_status = async_status.LOADING
            state.post_asset_error = null
        })
        
        
        builder.addCase(post_user_assets_async.fulfilled, (state, {payload}) => {
            state.user_assets = payload.data
            state.post_asset_status = async_status.SUCCEEDED
            state.getting_asset_status = async_status.SUCCEEDED
            state.post_asset_error = null
        })
        
        builder.addCase(post_user_assets_async.rejected, (state, actions) => {
            state.user_assets = null
            state.post_asset_status = async_status.ERROR
            state.post_asset_error = actions.error
        })




        builder.addCase(get_user_assets_async.pending, (state, action) => {
            state.getting_asset_status = async_status.LOADING
            state.getting_asset_error = null
        })
        
        
        builder.addCase(get_user_assets_async.fulfilled, (state, {payload}) => {
            state.user_assets = payload.data
            state.getting_asset_status = async_status.SUCCEEDED
            state.getting_asset_error = null
        })
        
        builder.addCase(get_user_assets_async.rejected, (state, actions) => {
            state.user_assets = null
            state.getting_asset_status = async_status.ERROR
            state.getting_asset_error = actions.error
        })



        builder.addCase(edit_user_assets_async.pending, (state, action) => {
            state.edit_asset_status = async_status.LOADING
            state.edit_asset_error = null
        })
        
        
        builder.addCase(edit_user_assets_async.fulfilled, (state, {payload}) => {
            state.user_assets = payload.data
            state.edit_asset_status = async_status.SUCCEEDED
            state.edit_asset_error = null
            state.edit_asset_field =  ''
        })
        
        builder.addCase(edit_user_assets_async.rejected, (state, actions) => {
            state.edit_asset_status = async_status.ERROR
            state.edit_asset_error = actions.error
            state.edit_asset_field =  ''
        })






        builder.addCase(add_user_transaction_async.fulfilled, (state, {payload}) => {
            state.user_assets = payload.assets
        })

        
        builder.addCase(update_user_transaction_async.fulfilled, (state, {payload}) => {
            if(payload.assets){
                state.user_assets = payload.assets
            }
        })


        builder.addCase(delete_user_transaction_async.fulfilled, (state, {payload}) => {
            if(payload.assets){
                state.user_assets = payload.assets
            }
        })


    }
})


export const {set_edit_field} = user_assets_slice.actions
export default user_assets_slice.reducer


