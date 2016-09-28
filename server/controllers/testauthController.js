const jwt =  require('jwt-simple');
const config = require('../../config');
// const mongoose = require('mongoose');
// const User = mongoose.model('User');
// mongoose.Promise = require("bluebird");



exports.testauth = function(req, res){
  res.send({hi: 'there'});
};