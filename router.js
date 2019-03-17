
var firebase = require('firebase');
var path = require('path');
 //--------------------------------- not Important ---------------------------------

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
    //--------------------------------- not Important ---------------------------------








    app.post('/api/buyer/location', function (req, res) {
        
        var userInfo = req.body.userInfo;
        var orderInfo = userInfo.orderInfo;
      //---------------Line 24 through 59--------------------------- this should happen when user click on the final check out ------------------------------------------ 
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
                //arrays of stores. each store has an array of products, and other info as you saw in home,html file
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
            .catch(err => {
                console.log(err)
                console.log('SOMETHING WENT WRONG');
            })
      //------------------------------------------ this should happen when user click on the final check out ------------------------------------------ 

        res.json({ ok: true });
    });
}