var firebase = require("firebase");
var express = require('express');
var bodyParser = require("body-parser");



var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var config = {
    apiKey: "AIzaSyBj_T0seXFsVNX2juUALNYRJrk9ONERYZs",
    authDomain: "wakidrive-ab771.firebaseapp.com",
    databaseURL: "https://wakidrive-ab771.firebaseio.com",
    projectId: "wakidrive-ab771",
    storageBucket: "wakidrive-ab771.appspot.com",
    messagingSenderId: "128249375550"
};
firebase.initializeApp(config)


require('./router')(app);

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
   
  });
  