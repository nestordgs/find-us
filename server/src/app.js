const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const DB = require('./config/db');

const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(DB.url, {useMongoClient: true});
let conn = mongoose.connection;

conn.on('error', console.error.bind(console, 'connection error:'));

conn.once('open', function () {
    console.log("Great success!")
});

app.use('/api', require('./router'));

app.listen(process.env.PORT || 8081);
