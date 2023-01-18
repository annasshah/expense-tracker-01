const mongoose = require('mongoose')
const { Schema } = mongoose;

const AdminSchema = new Schema({

  user_name: {
    type: String,
    required: true,
    unique:true
  },
  password: {
    type: String,
    required: true
  }
},{timestamps:true})

const Admin = mongoose.model('admin', AdminSchema)

module.exports = Admin