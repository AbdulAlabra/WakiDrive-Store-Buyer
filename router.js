
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
        console.log('hellooo');
        var userInfo = req.body.userInfo;
        var orderInfo = userInfo.orderInfo;
        // function getKeys(phone, key) {
        //     for (var i = 0; i < userInfo.orderInfo.length; i++) {
        //         var theKey = firebase.database().ref(`buyers/${phone}/${key}/orderInfo`).push(orderInfo[i]);
        //     }
        // }
       
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
                stores: orderInfo 
            }
        ).then(() => {
            firebase.database().ref(`buyers/${userInfo.phone}`).once('value', function (snapshot) {
                var key = "";
                var NumberOfOrders = snapshot.numChildren();
                console.log(NumberOfOrders);
                if (NumberOfOrders === 1) {
                    snapshot.forEach(function (child) {
                        key = child.key
                    });
                    firebase.database().ref(`buyers/${userInfo.phone}/${key}/BuyerInfo/isNewUser`).set(true)
                        .then(() => console.log('updated'))
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