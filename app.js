var express = require('express');
var app = express();

var professional = require('./routes/professional');

app.use('/professional', professional);

module.exports = app;
