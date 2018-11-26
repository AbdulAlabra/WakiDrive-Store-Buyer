var firebase = require("firebase");

const config = {
    apiKey: "AIzaSyBj_T0seXFsVNX2juUALNYRJrk9ONERYZs",
    authDomain: "wakidrive-ab771.firebaseapp.com",
    databaseURL: "https://wakidrive-ab771.firebaseio.com",
    projectId: "wakidrive-ab771",
    storageBucket: "wakidrive-ab771.appspot.com",
    messagingSenderId: "128249375550"
};

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
