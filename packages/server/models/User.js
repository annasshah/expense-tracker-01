const mongoose = require('mongoose')
const { Schema } = mongoose;

const UserSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique:true
  },
  password: {
    type: String,
    required: true
  },
  complete_asset_details: {
    type: Boolean,
    required: true,
    default:false
  }
},{timestamps:true})

const User = mongoose.model('user', UserSchema)

User.createIndexes()
module.exports = User