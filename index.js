
var express = require('express');
var app = express();
var speedTest = require('speedtest-net');

/* SPEED TESTS */
function performTest() {
    var test = speedTest({maxTime: 9000});

    test.on('data', function(data) {
        console.dir(data.speeds.download);
    });

    test.on('error', function(err) {
        console.error(err);
    });
}

performTest();
setInterval(performTest, 10000);


/* HOST SERVER */
app.get('/', function (req, res) {
    res.send('Hello World')
});

app.listen(3000);