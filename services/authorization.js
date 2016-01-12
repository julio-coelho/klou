'use strict';

var token = require('./../services/token-util');

module.exports = function(request, response, next) {

  var auth_token = request.get('Authorization') ? request.get('Authorization').substr(7) : undefined;

  if (auth_token) {
    token.decode(auth_token, function(err, decoded) {
      request._id = decoded._id;
      request.profile = decoded.profile;
    });
  }

  next();
};
