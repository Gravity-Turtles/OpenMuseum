const mongoose = require('mongoose');
const User = mongoose.model('User');
const Art = mongoose.model('Art');


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
  // console.log(req)
  // console.log(req.body)
  // console.log(req.data)
    var art = new Art();
    art.title = req.body.title;    
    // art.title = 'test777';        
    art.date = req.body.date;
    art.description = req.body.description;
    art.categories = req.body.categories;
    art.image = req.body.image;
    // art.user = req.body.user; //probably find from querying db on token

    art.setLocation(req.body.location);

    art.save(function(err) {
      console.log(err);      
      res.sendStatus(201);
    });  
};


//****** Query DB for nearby art *******//
module.exports.findArt = function(req, res) {
  console.log('findArt query initiated')  
/* Enable the line below for production and comment out the other line further below */
  // Art.find({location: req.body.location}, 'location', function(err, data) {
/* Enable the line below for testing and comment out the line above */
  // Art.find({location: 'nearby'}, 'location', function(err, data) {
  Art.find({}, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      // console.log('findArt Data',data);
      res.status(200).send(data);
    }
  });
};

