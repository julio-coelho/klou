'use strict';

var express = require('express');
var router = express.Router();

var model = require('./../models/packs');

router.route('/')

  .get(function(request, response) {
    var _id = request._id;
    model.retrieveAll(_id, function(err, data) {
      response.status(200).json(data);
    });
  })

  .post(function(request, response) {
    var _id = request._id;
    var entity = request.body;
    model.create(_id, entity, function(err, data) {
      response.status(201).json(data);
    });
  })

  .put(function(request, response) {
    var _id = request._id;
    var entity = request.body;
    model.update(_id, entity, function(err, data) {
      response.status(201).json(data);
    });
  });

router.route('/:_id')

  .get(function(request, response) {
    var _id = request._id;
    var pack = request.params._id;
    model.retrieve(_id, pack, function(err, data) {
      response.status(200).json(data);
    });
  });

module.exports = router;
