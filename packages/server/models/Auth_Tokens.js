const mongoose = require("mongoose");

const user_auth_token_schema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    auth_token: {
        type: String,
        required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
},{timestamps:true})

const user_auth_token = mongoose.model("user_auth_token", user_auth_token_schema)

module.exports = user_auth_token