
var firebase = require('firebase');
var path = require('path');

module.exports = function (app) {
    app.get('/', function (req, res) {
        console.log("home");
        res.sendFile(path.join(__dirname, "./home.html"));

    });

    app.get("/api/stores/data", function (req, res) {
        console.log('inside api');
        firebase.database().ref('stores').once('value', (data) => {
            console.log(data)
            res.json(data);
        });
    });

    app.post('/api/buyer/location', function (req, res) {
        console.log(req.body.userInfo)
        var userInfo = req.body.userInfo;
        firebase.database().ref(`buyers/${userInfo.phone}`).push().set(
            {
                BuyerInfo: {
                    name: userInfo.name,
                    phone: userInfo.phone,
                    isNewUser: false
                },
                BuyerLocation: {
                    latitude: userInfo.latitude,
                    longitude: userInfo.longitude
                },
                orderInfo: {
                    driver: {
                        hasDriver: false,
                        driverID: null
                    },
                    storeName: 'Appel',
                    storeLocation: {
                        latitude: 24.800173,
                        longitude: 46.68806993381629
                    }
                }
            }
        ).then(() => {
            firebase.database().ref(`buyers/${userInfo.phone}`).once('value', function(snapshot) {
                var key = "";
                if(snapshot.numChildren() === 1) {
                    snapshot.forEach(function (child) {
                        key = child.key
                    });
                    firebase.database().ref(`buyers/${userInfo.phone}/${key}/BuyerInfo/isNewUser`).set(true)
                    .then(() => console.log('updtaed'))
                    .catch(err => console.log(err));
                }
                else {
                    return;
                }
            })
        })
        .catch(err => console.log(err))

        res.json({ ok: true });
    });
}