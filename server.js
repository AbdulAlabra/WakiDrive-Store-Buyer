var firebase = require("firebase");
var express = require('express');
var bodyParser = require("body-parser");
// var config = require('./KEYS');
var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const config = {
  apiKey: "AIzaSyB2Uj3RLaL3KsdQmFtkl7Doj5DVIit8RKw",
  authDomain: "wakidrive-production.firebaseapp.com",
  databaseURL: "https://wakidrive-production.firebaseio.com",
  projectId: "wakidrive-production",
  storageBucket: "wakidrive-production.appspot.com",
  messagingSenderId: "360460920276"
};
firebase.initializeApp(config)


require('./router')(app);

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
   
  });
  