const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Admin = require('../models/Admin')
const Admin_Auth_Token = require('../models/Admin_auth_Token')
const User = require('../models/User')


const { ADMIN_AUTH_TOKEN_SECRET_KEY } = process.env


const admin_signUp = async (req, res) => {
    const { user_name, password } = req.body

    try {
        const is_admin_created = await Admin.exists()

        if (is_admin_created) {
            return res.status(409).json({ success: false, message: 'An Admin account is already Exist!' })
        }

        if (!user_name || !password) {
            return res.json({ success: false, message: 'Please fill all required fields' }).status(422)
        }


        const salt = await bcrypt.genSalt(12)
        const secure_password = await bcrypt.hash(password, salt)

        const create_admin = await Admin.create({
            user_name, password: secure_password
        })
        const data = {
            id: create_admin.id
        }
        const auth_token = jwt.sign(data, ADMIN_AUTH_TOKEN_SECRET_KEY)
        const save_token = await Admin_Auth_Token.create({
            admin_id: create_admin.id,
            auth_token: auth_token
        })

        return res.json({ success: true, message: 'Account successfully created!', token: save_token.auth_token }).status(200)

    } catch (error) {
        return res.status(500).send({ success: false, message: "something went wrong" })

    }

}


const admin_login = async (req, res) => {
    const { user_name, password } = req.body
    try {
        if (!user_name || !password) {
            return res.json({ success: false, message: 'Please fill all required fields' }).status(422)
        }


        const find_admin = await Admin.findOne({ user_name })

        if (!find_admin) {
            return res.status(401).json({ message: 'Please login with correct credentials!' })
        }

        const password_compare = await bcrypt.compare(password, find_admin.password)


        if (!password_compare) {
            return res.status(401).json({
                success: false,
                message: 'Please login with correct credentials!'
            })
        }

        const data = {
            id: find_admin.id
        }
        const auth_token = jwt.sign(data, ADMIN_AUTH_TOKEN_SECRET_KEY)

        const save_token = await Admin_Auth_Token.create({
            admin_id: find_admin.id,
            auth_token: auth_token
        })

        return res.json({ success: true, token: save_token.auth_token, message: 'Logged in successfully!' }).status(200)
    } catch (error) {
        return res.status(500).send({ success: false, message: "something went wrong" })

    }

}





module.exports = { admin_signUp, admin_login } 