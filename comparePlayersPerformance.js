var rp = require('request-promise');
var url = `http://localhost:8082/training-sessions`;

module.exports = function (req, res) {
    let sessionDate = req.body.queryResult.outputContexts[0].parameters.date;
    sessionDate = sessionDate.substring(0, 10);
    let players = [];
    req.body.queryResult.outputContexts[0].parameters.player
        .forEach(p => {
            players.push({
                name: p.replace(" ", "_")
            })
        });
    let reqUrl = encodeURI(url + `?date=${sessionDate}`);
    players.forEach(p => {
        reqUrl = reqUrl.concat("&name=" + p.name)
    })                     
    var options = {
        method: "GET",
        uri: reqUrl,
        json: true, // Automatically parses the JSON string in the response
    };

    rp(options).
        then(result => {
            console.log("Response: " + JSON.stringify(result));
            return res.json({                
                "fulfillmentText": "Click to see",
                "payload": {result}       
            });            
        })
        .catch(err => {
            if (err.error.code == "ECONNREFUSED") {
                return res.json({
                    "fulfillmentText" : "Sorry, there's no connection with the database!"
                })
            }
            return res.json({
                "fulfillmentText": err
            })
        });

}