'use strict';

var express = require('express');
var router = express.Router();

var model = require('./../models/professional');

router.route('/')

  .post(function(request, response) {
    var professional = request.body;
    model.save(professional, function(err, data) {
      response.sendStatus(201);
    });
  });

router.route('/:id')

  .get(function(request, response) {
    response.sendStatus(200);
  })

  .delete(function(request, response) {
    response.sendStatus(204);
  });

module.exports = router;
