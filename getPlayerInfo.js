var rp = require('request-promise');
var url = `http://localhost:8082/players`;

module.exports = function (req, res) {
    const playerToSearch = req.body.queryResult.parameters.player;
    const firstName = playerToSearch.split(" ")[0];
    const lastName = playerToSearch.split(" ")[1];
    const reqUrl = encodeURI(url + `?firstname=${firstName}&lastname=${lastName}`);                      
    var options = {
        method: "GET",
        uri: reqUrl,
        json: true, // Automatically parses the JSON string in the response
    };

    console.log(`Requesting first name:${firstName} last name:${lastName} to ${reqUrl}`);

    rp(options).
        then(result => {
            console.log("Response: " + JSON.stringify(result));
            let dataToSend;
            if (typeof result !== "string") {
                dataToSend = `${result[0].firstName} ${result[0].lastName} was born in ${result[0].birthday},` + 
                ` is ${result[0].height} cm tall and weights ${result[0].weight} kg.`;
            } else {
                dataToSend = result
            }            
            return res.json({                
                "fulfillmentText": dataToSend       
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