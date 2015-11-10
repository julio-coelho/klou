'use strict';

var express = require('express');
var router = express.Router();

var model = require('./../models/professional');

router.route('/')

  .post(function(request, response) {
    var professional = request.body;
    model.save(professional, function(err, data) {
      response.status(201).json(data);
    });
  })

  .put(function(request, response) {
    var professional = request.body;
    model.findOrCreate(professional, function(err, data) {
      response.status(201).json(data);
    });
  })

  .get(function(request, response) {
    var _id = request.query._id;
    model.findById(_id, function(err, data) {
      response.status(200).json(data);
    });
  })

  .delete(function(request, response) {
    var _id = request.body._id;
    model.delete(_id, function(err, data) {
      response.sendStatus(204);
    });
  });

router.route('/service')

  .post(function(request, response) {
    var _id = request.body._id;
    var service = request.body.service;
    model.saveService(_id, service, function(err, data) {
      response.status(201).json(data);
    });
  });

router.route('/schedule')

  .post(function(request, response) {
    var _id = request.body._id;
    var schedule = request.body.schedule;
    model.saveSchedule(_id, schedule, function(err, data) {
      response.status(201).json(data);
    });
  });

router.route('/package')

  .post(function(request, response) {
    var _id = request.body._id;
    var pkg = request.body.package;
    model.savePackage(_id, pkg, function(err, data) {
      response.status(201).json(data);
    });
  });

module.exports = router;
