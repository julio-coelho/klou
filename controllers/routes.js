var express = require('express');
var router = express.Router();

//controllers
var auth = require('./auth');
var professional = require('./professional');
var customer = require('./customer');

//routes --> controllers
router.use('/auth', auth);
router.use('/professional', professional);
router.use('/customer', customer);

module.exports = router;
