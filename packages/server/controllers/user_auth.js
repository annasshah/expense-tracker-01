const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Assets_Record = require('../models/Assets_Record')
const user_auth_token = require('../models/Auth_Tokens')
const User = require('../models/User')


const { AUTH_TOKEN_SECRET_KEY } = process.env


const signUp = async (req, res) => {
    const { first_name, last_name, email, password } = req.body
    if (!first_name || !last_name || !email || !password) {
        return res.json({ success: false, message: 'Please fill all required fields' }).status(422)
    }
    const find_user = await User.findOne({ email })
    if (find_user) {
        return res.status(409).json({ success: false, message: 'User with this email already exist!' })
    }
    const salt = await bcrypt.genSalt(12)
    const secure_password = await bcrypt.hash(password, salt)
    const create_user = await User.create({
        first_name, last_name, email, password: secure_password
    })
    const data = {
        user: {
            id: create_user.id
        }
    }
    const auth_token = jwt.sign(data, AUTH_TOKEN_SECRET_KEY)
    const save_token = await user_auth_token.create({
        user_id: create_user.id,
        auth_token: auth_token
    })

    const user_data = {
        ...create_user.toObject(),
    }
    delete user_data.password

    return res.json({
        success: true,
        token: save_token.auth_token,
        data: user_data,
        complete_asset_details: user_data.complete_asset_details
    }).status(200)
}


const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.json({ success: false, message: 'Please fill all required fields' }).status(422)
    }
    const find_user = await User.findOne({ email })

    if (!find_user) {
        return res.status(401).json({ message: 'Please login with correct credentials!' })
    }

    const password_compare = await bcrypt.compare(password, find_user.password)


    if (!password_compare) {
        return res.status(401).json({
            success: false,
            message: 'Please try to login with correct credentials!'
        })
    }

    const data = {
        user: {
            id: find_user.id
        }
    }
    const auth_token = jwt.sign(data, AUTH_TOKEN_SECRET_KEY)

    const save_token = await user_auth_token.create({
        user_id: find_user.id,
        auth_token: auth_token
    })

    const user_data = {
        ...find_user.toObject(),
    }
    delete user_data.password

    return res.json({
        success: true,
        token: save_token.auth_token,
        data: user_data,
        complete_asset_details: find_user.complete_asset_details
    }).status(200)
}


const fetch_user_details = async (req, res) => {
    const { userId, tokenId } = req

    const find_user = await User.findById(userId).select('-password')

    return res.json({
        success: true,
        data: find_user,
        complete_asset_details: find_user.complete_asset_details
    }).status(200)
}


const logout_user = async (req, res) => {
    const { userId, tokenId } = req


    await user_auth_token.findByIdAndDelete(tokenId)


    return res.json({
        success: true,
        message:'Logged out succcessfully!'
    }).status(200)
}








module.exports = { signUp, login, fetch_user_details, logout_user } 