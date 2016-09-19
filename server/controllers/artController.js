var mongoose = require('mongoose');
var User = mongoose.model('User');
var Art = mongoose.model('Art');


//******** uncmoment out this section when adding authentication ******//
module.exports.profileRead = function(req, res) {

//********* Every secured page will have to go through this check **********//

//**** need to add some error handling for if payloadId provided but not found
  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    User
      .findById(req.payload._id)
      .exec(function(err, user) {
        res.status(200).json(user);
      });
  }

};

//****** Insert New Art *******//

module.exports.insertArt = function(req, res) {
  console.log('insertArt running')
    var art = new Art();

    // art.title = req.body.title;    
    art.title = 'test777';    
    art.location = req.body.location;
    art.date = req.body.date;
    art.description = req.body.description;
    art.categories = req.body.categories;
    art.image = req.body.image;
    // art.user = req.body.user; //probably find from querying db on token

    art.save(function(err) {
      console.log(err);      
      res.sendStatus(201);
    });  
};