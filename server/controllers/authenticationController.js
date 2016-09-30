const jwt =  require('jwt-simple');
const config = require('../../config');
const mongoose = require('mongoose');
const User = mongoose.model('User');
mongoose.Promise = require("bluebird");

function tokenForUser(user){
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signup = function(req, res, next){
  // 2 lines below are for dev testing purposes only
  // res.send({success:'true'});
  // console.log('req.body.email', req.body.email);

  // get email and pass from req.body
  const email = req.body.email;
  const password = req.body.password;

  if(!email || !password){
    return res.status(422).send({ error: 'Please provide an email and password' });
  }
  // see if a user with the given email exists
  User.findOne({ email: email }, function(err, existingUser){
    if(err) { return next(err); }
    // if a user with an email does exist, return an error
    if(existingUser) {
      console.log("existing user");
      return res.status(422).send({ error: 'Email address is already in use'});
    }
    // if an email with a user DOES NOT exist, create and save user record
    const user = new User({
      email: email,
      password: password
    });

    user.save(function(err){
      if(err) { return next(err); }
      // Respond to request saying that user was created
      // res.json(user);
      res.json({ token: tokenForUser(user) });
    });
  });
}