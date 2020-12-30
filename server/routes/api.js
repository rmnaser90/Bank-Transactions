const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const Transaction = require('../models/Transaction')

router.get('/transactions', async function (req, res) {
    const transactions = await Transaction.find({})
    res.send(transactions)
})

router.post('/transaction', async function (req, res) {
    const transaction = new Transaction(req.body)
    await transaction.save()
    res.send(transaction)
})

router.put('/transaction/:transactionId', async function (req, res) {
    const { transactionId } = req.params
    const deleted = await Transaction.findByIdAndDelete(transactionId)
    res.send(deleted)
})

module.exports = router