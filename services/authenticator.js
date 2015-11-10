'use strict';

var passport = require('passport');
var FacebookTokenStrategy = require('passport-facebook-token');

var token = require('./../services/token-util');
var model = require('./../models/professional');

var authenticator = {

  init: function() {

    passport.serializeUser(function(user, done) {
      done(null, user);
    });

    passport.deserializeUser(function(obj, done) {
      done(null, obj);
    });

    var facebookClientArgs = {
      'clientID': process.env.FACEBOOK_CLIENT_ID,
      'clientSecret': process.env.FACEBOOK_CLIENT_SECRET
    };

    passport.use(new FacebookTokenStrategy(facebookClientArgs, function(accessToken, refreshToken, profile, done) {

      //TODO: request data from Facebook to create a new user
      var professional = {
        'facebook_uid': profile.id,
        'name': profile.displayName || profile.name
      };

      model.findOrCreate(professional, function(err, data) {
        if (err) throw err;

        return done(null, token.encode(data));
      });
    }));
  }

};


module.exports = authenticator;
