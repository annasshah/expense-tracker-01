const jwt = require('jsonwebtoken')
const user_auth_token = require('../models/Auth_Tokens')

const check_user_auth = async (req, res, next) => {
    const userToken = req.headers.authorization

    if (!userToken) {
        return res.json({ success: false, message: 'Token should be passed in headers' })
    }
    try {
        const headers_Token = userToken.split(" ")[1]

        if (headers_Token === 'null') {
            return res.status(401).send({ success: false, message: "Access token not found in headers" })
        }
        const { user } = jwt.decode(headers_Token)


        const verify_token = await user_auth_token.findOne({ auth_token: headers_Token })

        if (verify_token) {

            const { auth_token, _id } = verify_token
            req.userId = user.id
            req.tokenId = _id
            req.admin = false

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



module.exports = {check_user_auth}