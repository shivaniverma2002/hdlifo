const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config();

const app = express()

// routes importing
const Route = require('./routes/Route.js')

// middleware
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

// view engine
app.set('view engine', 'ejs')

const dbURI = process.env.DB
console.log(dbURI)
const PORT = process.env.PORT || 8888

mongoose.connect(dbURI)
  .then((result) => {
    console.log('DB connected.......')
    console.log(`port no : ${PORT}`)
    app.listen(PORT)
  })
  .catch((err) => {
    console.log(err)
  })

app.use('',Route)

app.use((req, res) => {
    res.status(404).send("404 not found")
  })