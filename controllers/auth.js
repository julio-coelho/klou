'use strict';

var express = require('express');
var router = express.Router();
var passport = require('passport');

router.route('/')

  .post(passport.authenticate('facebook-token', { session: false }), function(request, response) {

    if (request.user) {
      response.status(200).json(request.user);
    } else {
      response.sendStatus(401);
    }
  });


module.exports = router;
