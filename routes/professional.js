var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended : false });

router.route('/')

  .post(urlencodedParser, function(request, response) {
    response.sendStatus(201);
  });

router.route('/:id')

  .get(function(request, response) {
    response.sendStatus(200);
  })

  .delete(function(request, response) {
    response.sendStatus(204);
  });

module.exports = router;
