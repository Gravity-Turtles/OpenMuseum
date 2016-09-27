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
  console.log('insertArt running')  
  console.log(req.body)  
  console.log(req.files)

    var art = new Art();
    art.title = req.body.title;    
    // art.title = 'test777';        
    art.date = req.body.date;
    art.description = req.body.description;
    art.categories = req.body.categories;
    art.image = req.body.image;
    // art.user = req.body.user; //probably find from querying db on token

    art.setLocation(req.body.location);

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
  console.log("req.body in findArt", req.body);  
/* Enable the line below for production and comment out the other line further below */
  // Art.find({location: req.body.location}, 'location', function(err, data) {
/* Enable the line below for testing and comment out the line above */
  // Art.find({location: 'nearby'}, 'location', function(err, data) {
  Art.find({}, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      // console.log('findArt Data',data);
     
      const range = 0.006;
      let lngMin = req.body.longitude - range;
      let lngMax = req.body.longitude + range;
      let latMin = req.body.latitude - range;
      let latMax = req.body.latitude + range;

      let result = data.filter((spot) => 
          (spot.locLong >= lngMin && spot.locLong <= lngMax) &&
          (spot.locLat >= latMin && spot.locLat <= latMax)
      );

      // sort by distance from me
      const widthFromMe = function(num) {
        let me = Math.abs(req.body.longitude);
        let there = Math.abs(num);
        return Math.abs(there - me);
      }
      const heightFromMe = function(num) {
        let me = Math.abs(req.body.latitude);
        let there = Math.abs(num);
        return Math.abs(there - me);
      }
      const distanceFromMe = function(lng, lat) {
        return Math.sqrt(Math.pow(widthFromMe(lng), 2) + Math.pow(heightFromMe(lat), 2))
      }
      const compareDistance = function(a, b) {
        return distanceFromMe(a.locLong, a.locLat) - distanceFromMe(b.locLong, b.locLat);
      }
      result.sort(compareDistance);
      // end of sort by distance from me

  
      res.status(200).send(result);
    }
  });
};

