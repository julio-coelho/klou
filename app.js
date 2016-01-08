'use strict';

var express = require('express');
var app = express();

//passport
var passport = require('passport');
app.use(passport.initialize());

//mongodb
var mongodb = require('./services/mongodb');
mongodb.connect();

//authentication
var authenticator = require('./services/authenticator');
authenticator.init();

//content-type
var bodyParser = require('body-parser');
app.use(bodyParser.json());

//cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

//authorization
var jwt = require('express-jwt');
app.use(jwt({ secret: process.env.TOKEN_SECRET }).unless({path: ['/auth']}));

//routes
var routes = require('./controllers/routes');
app.use(routes);


module.exports = app;
