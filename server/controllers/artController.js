"use strict";
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const fs = require('fs');
const path = require('path');
const User = mongoose.model('User');
const Art = mongoose.model('Art');
const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo'
});
const jwt =  require('jwt-simple');
const config = require('../../config');
Grid.mongo = mongoose.mongo;  
var gfs = Grid(mongoose.connection.db);   

// mongoose.connection.on('open', function() {
//   console.log('open');
//   var gfs = Grid(mongoose.connection);
// });
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
  console.log("insertArt reqBody",req.body);
  console.log("insertArt reqBody",req.body.location);
  console.log("insertArt reqFiles",req.files);    

  //********** TEST START ************//


  // loop through and write to DB
  // store IDs in an array 

  let imagesDB = [];
  let readStream; 
  if(req.files){
    req.files.forEach(function(file){      
      let filePath = `${file.path}`        
      //create write stream
      let writeStream = gfs.createWriteStream({
        filename: file.filename
      })      
      let readStream = fs.createReadStream(filePath);
      readStream.pipe(writeStream)

      imagesDB.push(file.filename);

      writeStream.on('close', function (file){
      // do something with `file`
        console.log(file.filename + 'Written To DB');
      });
    })
  }

  console.log('IMAGES DB', imagesDB);

  //********** TEST END ************//
  const imagePaths = []
  if(req.files){
    req.files.forEach(function(file){
      imagePaths.push(file.path)
    })
  }
    var art = new Art();
    art.title = req.body.title;              
    art.date = req.body.date;
    art.description = req.body.description;
    art.categories = req.body.categories.split(",");
    art.image = req.body.image;


    art.images = imagePaths;
    art.imagesDB = imagesDB;
    //****** TEMP ******//
    art.locLat = req.body.latitude;
    art.locLong = req.body.longitude;
    //****** TEMP ******//

    art.likes = req.body.likes;


    // art.user = req.body.user; //probably find from querying db on token

    // art.setLocation(req.body.location);

    art.save(function(err) {
      console.log(err);      
      res.sendStatus(201);
    });    
};


//****** Query DB for nearby art *******//
module.exports.findArt = function(req, res) {    
  let whatToFind = {}
  let range = 0.006;
  if (req.body.theme) {
    range = 1;
    whatToFind = {categories: req.body.theme};
  }
  if (req.body.theme === "Trending") {
    whatToFind = {};
  }

  Art.find(whatToFind, function(err, data) {
    if (err) {
      console.log(err);
    } else {      
      if (!req.body.theme) {
        const range = 0.006;
      } else {
        const range = 0.1;
      }
      console.log(range);
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

      // sort by likes after sort by distance from me, if it's search by "Trending".
      const compareLikes = function(a, b) {
        return b.likes - a.likes;
      }
      if (req.body.theme === "Trending") {
        result.sort(compareLikes);
      }    
  
///******* TEST START **********/////
      // console.log('data',data);
      // console.log('result', result);
      // var imageResults = {};
      // result.forEach(item => {
      //   item.imagesDB.forEach((image,index) =>{
      //     //get chunks based on image name
      //     //stream results into array
      //     //add array to result body
      //     //send back result        
      //     var readStream = gfs.createReadStream({
      //       filename: image
      //     })
      //     readStream.pipe(imageResults)
      //     console.log('imageResults', imageResults);
      //   })
      // })

      
///******* TEST END **********/////
      res.status(200).send(result);
    }
  });
};

module.exports.editArt = function(req, res){

const imagePaths = []
  if(req.files){
    req.files.forEach(function(file){
      imagePaths.push(file.path)
    })
  }
 Art.find({ '_id': req.body.oldId }, function (err, docs) {  
  let oldPics = []
  for(var i = 0; i < docs[0].images.length; i++){
    oldPics.push(docs[0].images[i]);
  }  
  for(var k = 0; k < imagePaths.length; k++){
    oldPics.push(imagePaths[k]);
  }  

var newName = req.body.newName;
var newDescription = req.body.newDescription;
Art.update({ '_id': req.body.oldId }, { title: newName, description: newDescription, images: oldPics}, function(response) {    

  })
});
}

module.exports.editLikes = function(req, res){  
  Art.find({ 'title': req.body.title }, function (err, docs) { 

var newLikes = req.body.likes;

Art.update({ 'title': req.body.title }, { likes: newLikes}, function(response) {    


});
})

}

module.exports.insertComment = function(req, res) {  
  let newComment = {};
  let userID = jwt.decode(req.headers.authorization,config.secret).sub  

  User.findById(userID, function(err,user){
    if(err) return handleError(err)    
    Art.findById(req.body.id, function(err, art){        
      let comments = art.comments;    
      newComment.comments = req.body.comment;
      newComment.user = user.email;  
      comments.push(newComment);

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
  Art.findById(req.body.id, function(err, art){
    if(err) return handleError(err);
    res.send(art.comments);
  })
}
