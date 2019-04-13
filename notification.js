var rp = require('request-promise');

module.exports = function (token) {
    const reqUrl = encodeURI(`https://testsocket.serveo.net/pushNotification`);                       
    var options = {
        method: "POST",
        uri: reqUrl,
        body: {
            "title" : "Notification",
            "body" : "Hi from fulfillment, your token is " + token
        },
        json: true, // Automatically parses the JSON string in the response
    };

    rp(options).
        then((response) => { console.log(response) })
        .catch((err) => { console.log(err) });
}