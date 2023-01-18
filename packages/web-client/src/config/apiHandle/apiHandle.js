import axios from "axios"
import { save_token_constant } from "../../utils/contants";

export const baseURL = process.env.REACT_APP_API_URL


export const axios_handle = axios.create({
    baseURL: `${baseURL}`,
})

// axios_handle.defaults.timeout = 15000;

axios_handle.interceptors.request.use(async req => {

    const auth_token = localStorage.getItem(save_token_constant) ? localStorage.getItem(save_token_constant) : ''

    if(auth_token){
        
        req.headers.Authorization = `Bearer ${auth_token}`
    }

    return req


})

