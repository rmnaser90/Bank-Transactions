const express = require('express')
const app = express()
const mongoose = require('mongoose')
const api = require('./server/routes/api')
mongoose.connect("mongodb://localhost/Bank", { useNewUrlParser: true, useUnifiedTopology: true })
const path= require('path')

app.use(express.static(path.join(__dirname,'build')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
    
    next()
})
app.use('/', api)


const PORT = 3001
app.listen(PORT, function () {
    console.log("up and listening on port " + PORT);
})
