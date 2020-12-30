const express = require('express')
const dotenv = require('dotenv').config()
const app = express()
const mongoose = require('mongoose')
const api = require('./server/routes/api')
mongoose.connect(process.env.MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const path= require('path')

app.use(express.static(path.join(__dirname,'build')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// app.use(function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*')
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
    
//     next()
// })
app.use('/', api)

// app.get('*', function (req, res) {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });


const PORT = process.env.PORT
app.listen(PORT, function () {
    console.log("up and listening on port " + PORT);
})
