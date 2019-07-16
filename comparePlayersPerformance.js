var rp = require('request-promise');
var url = `http://localhost:8082/training-sessions`;

module.exports = function (req, res) {
    // Parse date
    let sessionDate = req.body.queryResult.parameters.date;
    sessionDate = sessionDate.substring(0, 10);

    // Parse list of players
    let players = [];
    req.body.queryResult.parameters.player
        .forEach(p => {
            players.push({
                name: p.replace(" ", "_")
            })
        });

    // Builds request uri with query params
    let reqUrl = encodeURI(url + `?date=${sessionDate}`);
    players.forEach(p => {
        reqUrl = reqUrl.concat("&name=" + p.name)
    })     
    var options = {
        method: "GET",
        uri: reqUrl,
        json: true, // Automatically parses the JSON string in the response
    };

    // Calls gateway
    rp(options).
        then(result => {
            console.log("Response: " + JSON.stringify(result, null, 2));
            if (typeof result !== "string") {
                let response = {
                    "fulfillmentText": "Click to see!",
                    "fulfillment_messages": [] 
                };
                result.forEach(p => response.fulfillment_messages.push(
                    {"payload": p}
                ));
                return res.json(response);
            } else {
                return res.json({                
                    "fulfillmentText": result 
                });
            }      
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