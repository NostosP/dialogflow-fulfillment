var rp = require('request-promise');
var url = `http://localhost:8082/performanceTrend`;

module.exports = function (req) {
    // Get firebaseToken TODO: will be username
    const token = req.body.originalDetectIntentRequest.payload.token;

    // Parse period dates
    let startDate = req.body.queryResult.parameters['date-period'].startDate;
    startDate = startDate.substring(0, 10);
    let endDate = req.body.queryResult.parameters['date-period'].endDate;
    endDate = endDate.substring(0, 10);

    // Parse player
    const playerToSearch = req.body.queryResult.parameters.player;
    const firstName = playerToSearch.split(" ")[0];
    const lastName = playerToSearch.split(" ")[1];

    // Builds request uri with query params
    let reqUrl = encodeURI(url + `?startDate=${startDate}&endDate=${endDate}&` +
        `firstName=${firstName}&lastName=${lastName}&token=${token}`);
    var options = {
        method: "GET",
        uri: reqUrl,
        json: true, // Automatically parses the JSON string in the response
    };

    console.log("url: ", reqUrl);

    // Calls gateway
    rp(options).
        then(result => {
            console.log("Response: " + JSON.stringify(result, null, 2));          
        })
        .catch(err => {
            console.log(err);
        });

    

}