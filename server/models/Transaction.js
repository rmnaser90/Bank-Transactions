const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TransactionSchema = new Schema({
    amount: Number,
    category: String,
    vendor: String,
    date: Date
})

const Transaction = mongoose.model('Transaction', TransactionSchema)



module.exports = Transaction