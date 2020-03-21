// //Install express server
// const express = require('express');
// const path = require('path');

// const app = express();

// // Serve only the static files form the dist directory
// app.use(express.static('./dist/{{your-app-name}}'));

// app.get('/*', function(req,res) {
    
// res.sendFile(path.join(__dirname,'/dist/{{your-app-name}}/index.html'));
// });

// // Start the app by listening on the default Heroku port
// app.listen(process.env.PORT || 8080);



var express = require("express");
// var bodyParser = require("body-parser");
// var mongodb = require("mongodb");
// var ObjectID = mongodb.ObjectID;

// var CONTACTS_COLLECTION = "contacts";

var app = express();
//app.use(bodyParser.json());

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
var distInd = distDir + 'index.html'
app.use(express.static(distDir));

app.get('/*', function(req,res) {
  res.sendFile(distInd);
});

var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});
