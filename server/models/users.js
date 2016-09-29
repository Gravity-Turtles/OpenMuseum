const mongoose = require( 'mongoose' );
// const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true
  },
  name: {
    type: String
    // required: true
  },
  password: String
  // hash: String,
  // salt: String
});

// SGrider tutorial code starts below...
// On Save hook, encrypt password
// before saving a model, run this function
userSchema.pre('save', function(next){
  // get access to the user model
  const user = this;

  // generate a salt, then run callback
  bcrypt.genSalt(10, function(err, salt){
    if (err) { return next(err); }

    // hash the password using the salt
    bcrypt.hash(user.password, salt, null, function(err, hash){
      if (err) { return next(err); }

      // overwrite plain-text password with encrypted password
      user.password = hash;
      next();
    });
  });
});


userSchema.methods.comparePassword = function(candidatePassword, callback){
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
    if(err) { return callback(err); }

    callback(null, isMatch);
  });
}

// SGrider tutorial code ends ^^^
/*
userSchema.methods.setPassword = (password) => {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

userSchema.methods.validPassword = (password) => {
  const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
};

userSchema.methods.generateJwt = () => {
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    exp: parseInt(expiry.getTime() / 1000),
  }, "MeetlySecret"); 
};
*/
mongoose.model('User', userSchema);
