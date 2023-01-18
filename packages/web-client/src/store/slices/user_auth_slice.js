import { createSlice } from '@reduxjs/toolkit'
import { post_user_assets_async } from '../../services/asset_service'
import { check_user_auth_async, logout_user_async, user_login_async, user_signup_async } from '../../services/auth_service'
import { async_status, save_token_constant } from '../../utils/contants'

const initialState = {
    initial_auth_check_status: async_status.IDLE,
    login_status: async_status.IDLE,
    signup_status: async_status.IDLE,
    logout_status: async_status.IDLE,
    
    complete_asset_details:false,
    
    user_auth: false,
    user_data: null,


    login_error: null,
    signup_error: null,
    initial_auth_check_error: null,
    logout_error: null,

}

const user_auth_slice = createSlice({
    name: 'user_auth',
    initialState: initialState,
    reducers: {
        set_initial_auth_false(state, { payload }) {
            state.initial_auth_check_status = async_status.SUCCEEDED
            state.user_auth = false
            state.user_data = null
            state.initial_auth_check_error = null
        }

    },
    extraReducers: (builder) => {

        
        builder.addCase(user_login_async.pending, (state, action) => {
            state.login_status = async_status.LOADING
            state.login_error = null
        })
        
        
        builder.addCase(user_login_async.fulfilled, (state, {payload}) => {
            state.user_auth = payload.success
            state.auth_token = payload.token
            state.user_data = payload.data
            
            state.complete_asset_details = payload.complete_asset_details
            localStorage.setItem(save_token_constant, payload.token)    
            state.login_status = async_status.SUCCEEDED
            state.login_error = null
        })
        
        builder.addCase(user_login_async.rejected, (state, actions) => {
            state.user_auth = false
            state.user_data = null
            state.login_error = actions.error
            state.login_status = async_status.ERROR
        })




        builder.addCase(user_signup_async.pending, (state, action) => {
            state.signup_status = async_status.LOADING
            state.signup_error = null
        })
        
        
        builder.addCase(user_signup_async.fulfilled, (state, {payload}) => {
            state.user_auth = payload.success
            state.auth_token = payload.token
            state.user_data = payload.data
            
            state.complete_asset_details = payload.complete_asset_details
            localStorage.setItem(save_token_constant, payload.token)    
            state.signup_status = async_status.SUCCEEDED
            state.signup_error = null
        })
        
        builder.addCase(user_signup_async.rejected, (state, actions) => {
            state.user_auth = false
            state.user_data = null
            state.signup_error = actions.error
            state.signup_status = async_status.ERROR
        })




        builder.addCase(check_user_auth_async.pending, (state, action) => {
            state.initial_auth_check_status = async_status.LOADING
            state.initial_auth_check_error = null
        })
        
        
        builder.addCase(check_user_auth_async.fulfilled, (state, {payload}) => {
            state.user_auth = payload.success
            state.auth_token = payload.token
            state.user_data = payload.data
            
            state.complete_asset_details = payload.complete_asset_details
            state.initial_auth_check_status = async_status.SUCCEEDED
            state.initial_auth_check_error = null
        })
        
        builder.addCase(check_user_auth_async.rejected, (state, actions) => {
            state.user_auth = false
            state.user_data = null
            state.initial_auth_check_error = actions.error
            state.initial_auth_check_status = async_status.ERROR
        })





        builder.addCase(logout_user_async.pending, (state, action) => {
            state.logout_status = async_status.LOADING
            state.logout_error = null
        })
        
        
        builder.addCase(logout_user_async.fulfilled, (state, {payload}) => {
            localStorage.removeItem(save_token_constant)
            window.location.reload()    
            state.logout_status = async_status.SUCCEEDED
            state.user_auth = false
            // state.auth_token = null
            // state.user_data = null
            // state.complete_asset_details = false
            // state.logout_error = null
        })
        
        builder.addCase(logout_user_async.rejected, (state, actions) => {
            state.logout_status = actions.error
            state.logout_error = async_status.ERROR
        })

        builder.addCase(post_user_assets_async.fulfilled, (state, {payload}) => {
            state.complete_asset_details = payload.complete_asset_details
        })
        
    }
})


export const {set_initial_auth_false} = user_auth_slice.actions

export default user_auth_slice.reducer


