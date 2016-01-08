'use strict';

var passport = require('passport');
var FacebookTokenStrategy = require('passport-facebook-token');
var request = require('request');

var token = require('./../services/token-util');
var modelProfessional = require('./../models/professional');
var modelCustomer = require('./../models/customer');

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
      'clientSecret': process.env.FACEBOOK_CLIENT_SECRET,
      'passReqToCallback': true
    };

    passport.use(new FacebookTokenStrategy(facebookClientArgs, function(req, accessToken, refreshToken, profile, done) {

      var user = {
        'facebook_uid': profile.id,
        'name': profile.displayName || profile.name.givenName + " " + profile.name.familyName,
        'gender': profile.gender,
        'email': profile.emails[0].value
      };

      request(profile.photos[0].value + '&redirect=false', function(err, resp, body) {
        user.picture = JSON.parse(body).data.url;

        if (req.body.profile === 'professional') {
          modelProfessional.create(user, function(err, data) {
            if (err) throw err;

            data.profile = 'professional';
            return done(null, { "Authorization": "Bearer " + token.encode(data) });
          });
        } else {
          modelCustomer.findOrCreate(user, function(err, data) {
            if (err) throw err;

            data.profile = 'customer';
            return done(null, { "Authorization": "Bearer " + token.encode(data) });
          });
        }
      });
    }));
  }
};


module.exports = authenticator;
