
var main = document.getElementById('main'),
    speeds,
    speedsLength,
    mainHTML,
    i;


function getSpeeds() {
    fetch('/speeds').then(function(response) {
        return response.json();
    }).then(function(responseJSON) {
        console.log(responseJSON);
        speeds = responseJSON;
        renderSpeeds();
    });
}

function renderSpeeds() {
    speedsLength = speeds.length;
    mainHTML = [];

    for (i = 0; i < speedsLength; i++) {
        mainHTML.push('<p>' + (speeds[i].error ? '<span style="color: red;">Speed test failed</span>' : speeds[i].download + "MB/s ") + '(' + speeds[i].date + ')' + '</p>');

        if (speeds[i].error) {
            errors.push('<p>' + date + '</p>');
        }
    }

    main.innerHTML = mainHTML.join();
}

getSpeeds();

setInterval(getSpeeds, 10000);
