global.mongooseErrorHandler = require('mongoose-error-handler')

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const config = require('./config/config')

const app = express()

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

require('./passport')

mongoose.connect(config.db.url, config.db.opt)
let conn = mongoose.connection

conn.on('error', console.error.bind(console, 'connection error:'))

conn.once('open', function () {
  console.log('Great success!')
})

app.use('/api', require('./router'))

app.listen(config.port)
