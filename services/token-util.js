'use strict';

var jwt = require('jsonwebtoken');
var key = process.env.TOKEN_SECRET;
var options = { };

exports.encode = function(user, callback) {

  var payload = { "_id": user._id, "profile": user.profile };

  return jwt.sign(payload, key, options);
};

exports.decode = function(token, callback) {

  jwt.verify(token, key, options, function(err, decoded) {
    if (err) callback(err, null);

    callback(null, decoded);
  });
};
