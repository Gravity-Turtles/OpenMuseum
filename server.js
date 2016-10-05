//********** MODULES **********//
const express = require("express");
const path = require('path');
const bodyParser = require("body-parser");
const cors = require("cors");
const multer  = require('multer');

//********** CONFIGURATION **********//
//multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.jpg') //Appending .jpg
  }
})
const upload = multer({ storage: storage });
// Bring in the data model
require('./server/models/db.js');
// Set API router
const apiRouter = require("./server/routes/api.js");
//set port
const port = process.env.PORT || 8888; 

// Initialize the server 
const app = express();
// Add middleware 
app.use(cors());
app.use(bodyParser.json());
app.use(upload.any())

// Set static file location
app.use(express.static(__dirname + '/dist'))

//for page refresh problem (not perfect yet)
app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
})

//API Routes:
app.use("/api", apiRouter);

//********** START APP **********//
app.listen(port);
console.log('app started on port: ' + port);