var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var dbconnection = require('./lib/db-connection');

var professional = require('./routes/professional');

//content-type
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }));

//routes
app.use('/professional', professional);

//db-connection
dbconnection.connect();

module.exports = app;
