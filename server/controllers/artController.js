"use strict";
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const fs = require('fs');
const User = mongoose.model('User');
const Art = mongoose.model('Art');
const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo'
});
const jwt =  require('jwt-simple');
const config = require('../../config');

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
  const imagePaths = []
  if(req.files){
    req.files.forEach(function(file){
      imagePaths.push(file.path)
    })
  }
    var art = new Art();
    art.title = req.body.title;    
    // art.title = 'test777';        
    art.date = req.body.date;
    art.description = req.body.description;
    art.categories = req.body.categories;
    art.image = req.body.image;


    art.images = imagePaths;



    //****** TEMP ******//
    art.locLat = 40.745694;
    art.locLong = -73.98617749999999;
    //****** TEMP ******//

    art.likes = req.body.likes;


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
  console.log("req.body in findArt", req.body);  

  Art.find({}, function(err, data) {
    if (err) {
      console.log(err);
    } else {
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

module.exports.editArt = function(req, res){
console.log("heeeeeeey, i'm in yoooour edit ART!!!!")
console.log("this is the req.body: ", req.body);

Art.find({ 'title': req.body.oldArt.title }, function (err, docs) {
 console.log('DOCS', docs);

var newName = req.body.newName;
var newDescription = req.body.newDescription;
Art.update({ 'title': req.body.oldArt.title }, { title: newName, description: newDescription}, function(response) {
    console.log("word, now show me that RESPONSE:", response);


});
})
}

module.exports.editLikes = function(req, res){
  console.log('EDITING LIKES, with req.body: ', req.body)
  Art.find({ 'title': req.body.title }, function (err, docs) {
 console.log('DOCS', docs);

var newLikes = req.body.likes;

Art.update({ 'title': req.body.title }, { likes: newLikes}, function(response) {
    console.log("updated Likes, show me that RESPONSE", response);


});
})

}

// Art.find({title: req.body.oldArt.title})
//     .select('title description')
//     .exec(function(res){
//       console.log("big DATABASE REsPONSE: ", res);
//     })
module.exports.insertComment = function(req, res) {
  console.log('insertComment');
  let newComment = {};
  let userID = jwt.decode(req.headers.authorization,config.secret).sub  

  User.findById(userID, function(err,user){
    if(err) return handleError(err)
    console.log('USER FOUND!', user)      
    Art.findById(req.body.id, function(err, art){        
      let comments = art.comments;    
      newComment.comments = req.body.comment;
      newComment.user = user.email;  
      comments.push(newComment);    
      console.log('newComment');
      console.log(newComment)
      Art.findByIdAndUpdate(req.body.id, {$set:{
        comments: comments
      }}, {new: true}, function(err,art){
        if(err) return handleError(err);
        res.send(comments);
      });
    })
  })
}

module.exports.getComments = function(req, res) {
  console.log('GET ART CONTROLLER');
  console.log(req.body)

//get comments and update
  Art.findById(req.body.id, function(err, art){
    console.log('ART', art);
    console.log(art.comments);
    if(err) return handleError(err);
    res.send(art.comments);
  })
}
