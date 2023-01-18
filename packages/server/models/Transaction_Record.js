const mongoose = require('mongoose')
const { Schema } = mongoose;

const TransactionSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    amount: {
        type: Number,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories',
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    paid_from: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Transaction_Record = mongoose.model('transaction_record', TransactionSchema)

module.exports = Transaction_Record