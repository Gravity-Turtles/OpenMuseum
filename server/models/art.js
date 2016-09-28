var mongoose = require( 'mongoose' );

var artSchema = new mongoose.Schema({
  title: String,
  locLat: Number,
  locLong: Number,  
  date: Date,
  description: String,    
  categories: Array,
  image: { 
    data: Buffer, 
    contentType: String 
  },
  user: String
});

artSchema.methods.setLocation = function(locObj){
  this.locLat = locObj.latitude;
  this.locLong = locObj.longitude;
}

mongoose.model('Art', artSchema);