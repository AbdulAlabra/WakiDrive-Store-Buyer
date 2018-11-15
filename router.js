
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
        console.log(req.body.position)
        var position = req.body.position;
        firebase.database().ref('buyers/buyer').set(
            {
                name: 'Abdul',
                location: {
                    latitude: position.latitude,
                    longitude: position.longitude
                },
                phone: '916-318-1728'
            }
        );
        res.json({ ok: true });
    });
}