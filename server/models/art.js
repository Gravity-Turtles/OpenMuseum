var mongoose = require( 'mongoose' );

var artSchema = new mongoose.Schema({
  title: String,
  artist: {
    type: String,
    default: 'Unknown'
  },
  locLat: Number,
  locLong: Number,  
  address: String,
  date: { 
    type: String, 
    default: Date.now
  },
  description: String,    
  categories: Array,
  image: { 
    data: Buffer, 
    contentType: String 
  },
  images: Array,
  imagesDB: Array,
  user: String,
  likes: { 
    type: Number, 
    default: 0 
  },
  comments: Array
});

artSchema.methods.setLocation = function(locObj){
  this.locLat = locObj.latitude;
  this.locLong = locObj.longitude;
}

mongoose.model('Art', artSchema);