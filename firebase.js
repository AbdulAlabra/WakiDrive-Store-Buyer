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


// firebase.database().ref('stores/874947924').set(
//     {
//         storeName: 'Apple' ,
//         location: {
//             lat: '6426847624',
//             lang: '498274749'
//         },
//         phone: '79537953'
//     }
// );
// firebase.database().ref('stores').once('value', (data) => {
//     console.log(data)
// });
// firebase.database().ref('stores').on('value', (data) => {
//     console.log(data)
// });