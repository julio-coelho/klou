'use strict';

var mongodb = require('mongodb');
var ObjectId = mongodb.ObjectId;
var _ = require('underscore');

exports.findById = function(_id, callback) {

  var collection = mongodb.DB.collection('customer');

  var query = {'_id': new ObjectId(_id)};

  collection.find(query).limit(1).next(function(err, result) {
    if (err) callback(err, null);
    callback(err, result);
  });
};

exports.findOrCreate = function(customer, callback) {

  var collection = mongodb.DB.collection('customer');

  var query = {'facebook_uid': customer.facebook_uid};
  var options = {'upsert': true, 'returnOriginal': false};

  //created
  customer.created = +new Date();

  //updated
  customer.updated = +new Date();

  //active
  customer.active = true;

  var newCustomer = {'$setOnInsert': customer};

  collection.findOneAndUpdate(query, newCustomer, options, function(err, result) {
    if (err) callback(err, null);
    callback(err, result.value);
  });
};

exports.save = function(customer, callback) {

  var collection = mongodb.DB.collection('customer');

  var query = {'_id': new ObjectId(customer._id)};
  var options = {'returnOriginal': false};

  customer._id = new ObjectId(customer._id);
  customer.updated = +new Date();

  collection.findOneAndUpdate(query, customer, options, function(err, result) {
    if (err) callback(err, null);
    callback(err, result.value);
  });
};

exports.delete = function(_id, callback) {

  var collection = mongodb.DB.collection('customer');

  var query = {'_id': new ObjectId(_id)};

  collection.deleteOne(query, function(err, result) {
    if (err) callback(err, null);
    callback(err, result.deletedCount);
  });
};
