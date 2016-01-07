'use strict';

var express = require('express');
var router = express.Router();

var model = require('./../models/appointment');

router.route('/')

  .post(function(request, response) {
    var appointment = request.body;
    model.save(appointment, function(err, data) {
      response.status(201).json(data);
    });
  })

  .put(function(request, response) {
    var appointment = request.body;
    model.insert(appointment, function(err, data) {
      response.status(201).json(data);
    });
  })

  .delete(function(request, response) {
    var _id = request.body._id;
    model.delete(_id, function(err, data) {
      response.sendStatus(204);
    });
  });

router.route('/:_id')

  .get(function(request, response) {
    var _id = request.params._id;
    model.findById(_id, function(err, data) {
      response.status(200).json(data);
    });
  });

module.exports = router;
