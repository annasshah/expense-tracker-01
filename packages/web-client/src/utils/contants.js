export const TYPE_LOGOUT_USER = "POST_LOGOUT_USER"
export const save_token_constant = '@user_auth_token'


export const async_status = Object.freeze({
    IDLE: 'idle',
    LOADING: 'loading',
    SUCCEEDED: 'succeeded',
    ERROR: 'error',

})


export const alert_severity_constants = Object.freeze({
    ERROR: 'error',
    WARNING: 'warning',
    INFO: 'info',
    SUCCESS: 'success',

})



export const type_constants = {
    USER_LOGIN:"USER_LOGIN",
    USER_SIGNUP:"USER_SIGNUP",
    CHECK_USER_AUTH:"CHECK_USER_AUTH",
    TYPE_LOGOUT_USER:"TYPE_LOGOUT_USER",
    POST_ASSET:"POST_ASSET",
    GET_ASSET:"GET_ASSET",
    PUT_ASSET:"PUT_ASSET",
    GET_TRANSACTION:"GET_TRANSACTION",
    ADD_TRANSACTION:"ADD_TRANSACTION",
    EDIT_TRANSACTION:"EDIT_TRANSACTION",
    DELETE_TRANSACTION:"DELETE_TRANSACTION",
    GET_CATEGORY:"GET_CATEGORY"
}
