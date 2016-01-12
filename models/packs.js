'use strict';

var mongodb = require('mongodb');
var ObjectId = mongodb.ObjectId;
var _ = require('underscore');

exports.create = function(_id, pkg, callback) {

  var collection = mongodb.DB.collection('professional');

  var _pack = _.clone(pkg);

  var now = +new Date();

  _pack.updated = now;
  _pack.created = now;
  _pack._id = new ObjectId();

  var query = {'_id': new ObjectId(_id)};
  var update = {'$push': {'packs': _pack}, '$set': {'updated': now}};
  var options = {'returnOriginal': false, 'projection': {'_id': false, 'packs': true}};

  collection.findOneAndUpdate(query, update, options, function(err, result) {
    if (err) callback(err, null);
    callback(err, result.value);
  });
};

exports.retrieve = function(_id, pack, callback) {

  var collection = mongodb.DB.collection('professional');

  var query = {'_id': new ObjectId(_id), 'packs': {'$elemMatch': {'_id': new ObjectId(pack)}}};

  collection.find(query).project({'_id': false, 'packs.$': true}).next(function(err, result) {
    if (err) callback(err, null);
    callback(err, result);
  });
};

exports.retrieveAll = function(_id, callback) {

  var collection = mongodb.DB.collection('professional');

  var query = {'_id': new ObjectId(_id)};

  collection.find(query).project({'_id': false, 'packs': true}).next(function(err, result) {
    if (err) callback(err, null);
    callback(err, result);
  });
};

exports.update = function(_id, pkg, callback) {

  var collection = mongodb.DB.collection('professional');

  var _pack = _.clone(pkg);

  var now = +new Date();

  _pack.updated = now;
  _pack._id = new ObjectId(pkg._id);

  var query = {'_id': new ObjectId(_id), 'packs': {'$elemMatch': {'_id': _pack._id}}};
  var update = {'$set': {'packs.$': _pack, 'updated': now}};
  var options = {'returnOriginal': false, 'projection': {'_id': false, 'packs': true}};

  collection.findOneAndUpdate(query, update, options, function(err, result) {
    if (err) callback(err, null);
    callback(err, result.value);
  });
};
