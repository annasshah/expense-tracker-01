const mongoose = require("mongoose");

const Admin_Auth_Token_Schema = mongoose.Schema({
    admin_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin',
        required: true
    },
    auth_token: {
        type: String,
        required: true
    }
},{timestamps:true})

const Admin_Auth_Token = mongoose.model("admin_auth_token", Admin_Auth_Token_Schema)

module.exports = Admin_Auth_Token