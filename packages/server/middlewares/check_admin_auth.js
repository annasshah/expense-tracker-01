const jwt = require('jsonwebtoken')
const Admin_Auth_Token = require('../models/Admin_auth_Token')
const user_auth_token = require('../models/Auth_Tokens')

const check_admin_auth = async (req, res, next) => {
    const admin_Token = req.headers.authorization

    if (!admin_Token) {
        return res.json({ success: false, message: 'Token should be passed in headers' })
    }
    try {
        const headers_Token = admin_Token.split(" ")[1]

        if (headers_Token === 'null') {
            return res.status(401).send({ success: false, message: "Access token not found in headers" })
        }
        const { id: admin_id } = jwt.decode(headers_Token)


        const verify_token = await Admin_Auth_Token.findOne({ auth_token: headers_Token })

        if (verify_token) {

            const { auth_token, _id:tokenId } = verify_token
           
            req.userId = admin_id
            req.tokenId = tokenId
            req.admin = true

            next()
            return
        }
        else {
            return res.status(401).send({ success: false, message: "Token is not valid" })
        }


    } catch (error) {
        return res.status(400).send({ success: false, message: "Something went wrong!" })
    }

}



module.exports = {check_admin_auth}