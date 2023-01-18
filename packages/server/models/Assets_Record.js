const mongoose = require("mongoose");

const Assets_Record_Schema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    cash: {
        type: Number,
        required: true
    },
    saving: {
        type: Number,
        required: true
    },
    bank: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true
    }
},{timestamps:true})

const Assets_Record = mongoose.model("assets_record", Assets_Record_Schema)

module.exports = Assets_Record