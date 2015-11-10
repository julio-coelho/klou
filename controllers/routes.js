var express = require('express');
var router = express.Router();

//controllers
var auth = require('./auth');
var professional = require('./professional');

//routes --> controllers
router.use('/auth', auth);
router.use('/professional', professional);


module.exports = router;
