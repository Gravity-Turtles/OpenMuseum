var mongoose = require( 'mongoose' );

var artSchema = new mongoose.Schema({
  title: String,
  location: String,  
  date: Date,
  description: String,    
  categories: Array,
  image: { 
    data: Buffer, 
    contentType: String 
  },
  user: String
});



mongoose.model('Art', artSchema);