var express = require('express');
var router = express.Router();

//controllers
var auth = require('./auth');
var professional = require('./professional');
var services = require('./services');
var packs = require('./packs');
var schedule = require('./schedule');
var customer = require('./customer');
var appointment = require('./appointment');

//routes --> controllers
router.use('/auth', auth);
router.use('/professional', professional);
router.use('/services', services);
router.use('/packs', packs);
router.use('/schedule', schedule);
router.use('/customer', customer);
router.use('/appointment', appointment);

module.exports = router;
