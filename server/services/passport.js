const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const config = require('../../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const FacebookStrategy = require('passport-facebook').Strategy;

// create local strategy
const localOptions = {usernameField: 'email'};
const localLogin = new LocalStrategy(localOptions, function(email, password, done){
  // Verify this email and password, call done with the user
  // if it is the correct email and password
  // otherwise, call done with false
  User.findOne({ email: email }, function(err, user) {
    if (err) { return done(err); }
    if (!user) { return done(null, false); }

    // compare passwords - is `password` equal to user.password?
    user.comparePassword(password, function(err, isMatch) {
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




// create Facebook strategy
const facebookOptions = {
  clientID: 650322325142979,
  clientSecret: '611cbd399fc90a129e236b4a7ece9db5',
  callbackURL: "http://localhost:8888/auth/facebook/callback"
};

const facebookLogin = new FacebookStrategy(facebookOptions,
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ facebookId: profile.id }, function(err, user) {
      if (err) { return done(err); }
      return done(null, user);
  });
});


// tell passport to use these strategies
passport.use(jwtLogin);
passport.use(localLogin);
passport.use(facebookLogin);