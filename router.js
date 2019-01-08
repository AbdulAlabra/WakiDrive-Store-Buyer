
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
                },
                BuyerLocation: {
                    latitude: userInfo.latitude,
                    longitude: userInfo.longitude
                },
                orderInfo: {
                    isReceived: false,
                    storeName: 'Appel',
                    storeLocation: {
                        latitude: 24.800173,
                        longitude: 46.68806993381629
                    }
                }
            }
        ).then(() => {
            
        });

        res.json({ ok: true });
    });
}