const jwt =  require('jwt-simple');
const config = require('../../config');
const mongoose = require('mongoose');
const User = mongoose.model('User');
mongoose.Promise = require('bluebird');

function tokenForUser(user){
  console.log('in token 4 usr fn: the user obj is:', user);
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function(req, res, next) {
  // User has already had their email and password auth'd
  // We just need to give them a token
  console.log("Here in signin", req);
  res.send({ token: tokenForUser(req.body) });
}

exports.signup = function(req, res, next){
  // 2 lines below are for dev testing purposes only
  // res.send({success:'true'});
  // console.log('req.body.email', req.body.email);

  // get name, email and pass from req.body
  const name = req.body.name;
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
      return res.status(422).send({ error: 'Email is in use'});
    }
    // if an email with a user DOES NOT exist, create and save user record
    const user = new User({
      name: name,
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