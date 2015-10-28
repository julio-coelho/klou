'use strict';

var mongodb = require('mongodb');

exports.get = function () {

};

exports.save = function (professional, callback) {

  var collection = mongodb.DB.collection('professional');

  collection.insert(professional, callback);

};
