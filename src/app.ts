const express = require('express')
const bodyParser = require('body-parser')
const Passport = require('passport')
const route = require('./route')
const path = require('path')

const PassportStrategy = require('./midleware/passport-strategy')

const app = express()

app.use(require('morgan')('dev'))
app.use(require('cors')())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(Passport.initialize())
Passport.use(PassportStrategy)

// роутинг
app.use( route )

module.exports = app