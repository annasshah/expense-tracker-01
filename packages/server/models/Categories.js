const mongoose = require('mongoose')
const { Schema } = mongoose;

const CategorySchema = new Schema({

  category: {
    type: String,
    required: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId
  },
  default_category:{
    type: Boolean,
    required:true,
    default:false
  }

}, { timestamps: true })

const Categories = mongoose.model('categories', CategorySchema)

module.exports = Categories