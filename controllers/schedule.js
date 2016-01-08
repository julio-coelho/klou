'use strict';

var express = require('express');
var router = express.Router();

var model = require('./../models/schedule');

router.route('/')

  .post(function(request, response) {
    var _id = request.body._id;
    var entity = request.body.schedule;
    model.create(_id, entity, function(err, data) {
      response.status(201).json(data);
    });
  })

  .put(function(request, response) {
    var _id = request.body._id;
    var entity = request.body.schedule;
    model.update(_id, entity, function(err, data) {
      response.status(201).json(data);
    });
  });

router.route('/:_id')

  .get(function(request, response) {
    var _id = request.params._id;
    model.retrieve(_id, function(err, data) {
      response.status(200).json(data);
    });
  });

module.exports = router;
