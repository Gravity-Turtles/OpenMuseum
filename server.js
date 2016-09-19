//********** MODULES **********//
var express = require("express");
var path = require('path');
var bodyParser = require("body-parser");
var cors = require("cors");

//********** CONFIGURATION **********//
// Bring in the data model
require('./server/models/db.js');
// Set API router
var apiRouter = require("./server/routes/api.js");
//set port
var port = process.env.PORT || 8888; 

// Initialize the server 
var app = express();
// Add middleware 
app.use(cors());
app.use(bodyParser.json());

//Set static file location
app.use("/", express.static(__dirname + "/dist/"));

//API Routes:
app.use("/api", apiRouter);

//********** START APP **********//
app.listen(port);
console.log('app started on port: ' + port);