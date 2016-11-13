
var express = require('express');
var app = express();
var speedTest = require('speedtest-net');

var speeds = [];
var date = new Date;
var port = 4000;

/* SPEED TESTS */
function performTest() {
    var test = speedTest({maxTime: 9000});

    date = new Date;
    date = date.getHours() + ":" + date.getMinutes() + "." + date.getSeconds() + " (" + date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + ")";

    test.on('data', function(data) {
        speeds.push({
            date: date,
            error: false,
            download: data.speeds.download,
            upload: data.speeds.upload,
            ping :data.server.ping
        });
        console.dir(data.speeds.download);
    });

    test.on('error', function(err) {
        speeds.push({
            date: date,
            error: true,
            errorMsg: err
        });
        console.error(err);
    });

    console.log(speeds);
}

performTest();
setInterval(performTest, 10000);


/* HOST SERVER */
app.use('/', express.static(__dirname + '/'));

app.get('/speeds', function (req, res) {
    res.json(speeds);
});

app.listen(port, function() {console.log('Running server on port ', port)});