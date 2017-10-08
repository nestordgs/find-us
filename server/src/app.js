global.mongooseErrorHandler = require('mongoose-error-handler')

import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'
import mongoose from 'mongoose'
import config from './config/config'
import router from './router'
import bluebird from 'bluebird'

const app = express()

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

import './passport'

mongoose.Promise = bluebird
mongoose.connect(config.db.url, config.db.opt)
let conn = mongoose.connection

conn.on('error', console.error.bind(console, 'connection error:'))

conn.once('open', function () {
  console.log('Great success!')
})

app.use('/api', router)

app.listen(config.port)
