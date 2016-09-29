const passport = require('passport');
const config = require('../../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const mongoose = require('mongoose');
const User = mongoose.model('User');


// create local strategy
const localOptions = {username: 'email'};
const localLogin = new LocalStrategy({localOptions: 'email'}, function(email, password, done){
  // Verify this email and password, call done with the user
  // if it is the correct email and password
  // otherwise, call done with false
  User.findOne({email: 'email'}, function(err, user){
    if (err) { return done(err); }
    if (!user) { return done(null, false); }
      console.log('usr out of fn user.comparePassword is = ', user);

    // compare passwords - is 'password' equal to user.password?
    user.comparePassword(password, function(err, isMatch){
      if (err) { return done(err); }
      if (!isMatch) { return done(null, false); }
      return done(null, user);
    });
  });
});

// setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};


// create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
  // see if the user ID in the payload exists in our database
  // if it does, call 'done' with that user
  // otherwise, call done without a user object
  User.findById(payload.sub, function(err, user){
    if(err) { return done(err, false); }

    if(user){
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

// tell passport to use these strategies
passport.use(jwtLogin);
passport.use(localLogin);