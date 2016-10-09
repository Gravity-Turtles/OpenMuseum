"use strict";
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const fs = require('fs');
const path = require('path');
const User = mongoose.model('User');
const Art = mongoose.model('Art');
// const googleMapsClient = require('@google/maps').createClient({
//   key: 'AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo'
// });
const jwt =  require('jwt-simple');
const config = require('../../config');
Grid.mongo = mongoose.mongo;  
var gfs = Grid(mongoose.connection.db);   

module.exports.insertArt = function(req, res) { 
  //********** GRIDFS START ************//
  // let imagesDB = [];
  // let readStream; 
  // if(req.files){
  //   req.files.forEach(function(file){      
  //     let filePath = `${file.path}`        
  //     //create write stream
  //     let writeStream = gfs.createWriteStream({
  //       filename: file.filename
  //     })      
  //     let readStream = fs.createReadStream(filePath);
  //     readStream.pipe(writeStream)

  //     imagesDB.push(file.filename);

  //     writeStream.on('close', function (file){      
  //       console.log(file.filename + 'Written To DB');
  //     });
  //   })
  // }
  //********** GRIDFS END ************//
  const imagePaths = []
  if(req.files){
    req.files.forEach(function(file){
      imagePaths.push(file.path)
    })
  }
    var art = new Art();
    art.title = req.body.title;                  
    art.description = req.body.description;
    art.categories = req.body.categories.split(",");
    art.image = req.body.image;
    art.images = imagePaths;
    // art.imagesDB = imagesDB; //for gridFS
    //****** TEMP ******//
    art.locLat = req.body.latitude;
    art.locLong = req.body.longitude;
    art.address = req.body.address;
    //****** TEMP ******//
    art.likes = req.body.likes;

    art.save(function(err) {
      console.log(err);      
      res.sendStatus(201);
    });    
};

module.exports.findArt = function(req, res){    
  let whatToFind = {}
  let range = 0.007;
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
      console.log("THEME+++++++++++++",req.body.theme);
      if (req.body.theme === "Trending") {
        result.sort(compareLikes);
        console.log("LENGTH+++++++++++++++++",result.length);
        if (result.length > 10) {
          result = result.slice(0, 10);
        }
      }
        
///******* GRIDFS START **********/////
      // var imageResults = {};
      // result.forEach(item => {
      //   item.imagesDB.forEach((image,index) =>{              
      //     var readStream = gfs.createReadStream({
      //       filename: image
      //     })
      //     readStream.pipe(res) // needs fixing
      //     console.log('imageResults', imageResults);
      //   })
      // })      
///******* GRIDFS END **********/////
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
    for(let i = 0; i < docs[0].images.length; i++){
      oldPics.push(docs[0].images[i]);
    }  
    for(let k = 0; k < imagePaths.length; k++){
      oldPics.push(imagePaths[k]);
    }  
    let newName = req.body.newName;
    let newDescription = req.body.newDescription;
    Art.update({
        '_id': req.body.oldId 
      }, 
      { 
        title: newName, description: newDescription, images: oldPics
      }, function(err,art){    
        if(err) console.log('editArt error:', err);    
        else res.send(art);
      })
  });
}

module.exports.editLikes = function(req, res){  
  Art.find({ 'title': req.body.title }, function (err, docs) { 
    let newLikes = req.body.likes;
    Art.update({ 'title': req.body.title }, { likes: newLikes}, function(err,art) {    
      if(err) console.log('editLikes error:', err);    
      else res.send(art);
    });
  })
}

module.exports.insertComment = function(req, res) {  
  let newComment = {};
  let userID = jwt.decode(req.headers.authorization,config.secret).sub  

  User.findById(userID, function(err,user){
    if(err) console.log('insertComment error:', err);    
    else{ Art.findById(req.body.id, function(err, art){     
      let comments = art.comments;    
      newComment.comments = req.body.comment;
      newComment.user = user.email;  
      comments.push(newComment);

      Art.findByIdAndUpdate(req.body.id, {$set:{
        comments: comments
      }}, {new: true}, function(err,art){
        if(err) console.log('insertComment error:', err);    
        else res.send(comments);
      });
    })}
  })
}

module.exports.getComments = function(req, res) {
  Art.findById(req.body.id, function(err, art){
    if(err) console.log('getComments error:', err);    
    else res.send(art.comments);
  })
}
