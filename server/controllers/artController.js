const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const fs = require('fs');
const User = mongoose.model('User');
const Art = mongoose.model('Art');

Grid.mongo = mongoose.mongo;
mongoose.connection.on('open', function() {
  console.log('open');
  var gfs = Grid(mongoose.connection);
});
//******** uncomment out this section when adding authentication ******//
// module.exports.profileRead = function(req, res) {

//********* Every secured page will have to go through this check **********//

//**** need to add some error handling for if payloadId provided but not found
//   if (!req.payload._id) {
//     res.status(401).json({
//       "message" : "UnauthorizedError: private profile"
//     });
//   } else {
//     User
//       .findById(req.payload._id)
//       .exec(function(err, user) {
//         res.status(200).json(user);
//       });
//   }

// };

//****** Insert New Art *******//

module.exports.insertArt = function(req, res) {
  console.log('inserArt')
  console.log(req.body)
  console.log(req.files)
  const imagePaths = []
  req.files.forEach(function(file){
    imagePaths.push(file.path)
  })
  
    var art = new Art();
    art.title = req.body.title;    
    // art.title = 'test777';        
    art.date = req.body.date;
    art.description = req.body.description;
    art.categories = req.body.categories;
    art.image = req.body.image;
    art.images = imagePaths;
    // art.user = req.body.user; //probably find from querying db on token

    // art.setLocation(req.body.location);

//STREAM
      // streaming to gridfs
    //filename to store in mongodb

    // var writestream = gfs.createWriteStream({
    //     filename: 'mongo_file.txt'
    // });
    // fs.createReadStream('/home/etech/sourcefile.txt').pipe(writestream);
 
    // writestream.on('close', function (file) {
    //     // do something with `file`
    //     console.log(file.filename + 'Written To DB');
    // });
//STREAM


    art.save(function(err) {
      console.log(err);      
      res.sendStatus(201);
    });  
};


//****** Query DB for nearby art *******//
module.exports.findArt = function(req, res) {
  console.log('findArt query initiated')
  // var art = mongoose.model('Art', openDB);
  // var Person = mongoose.model('Person', yourSchema);
  // console.log('---the art: ',Art);
  // art.find({location: req.body.location}, 'location', function(err, data) {
  Art.find({}, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      // console.log('findArt Data',data);
      res.status(200).send(data);
    }
  });
};

