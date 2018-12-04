var rp = require('request-promise');

module.exports = function (req, res) {
    const playerToSearch = req.body.queryResult.parameters.player;
    const reqUrl = encodeURI(`http://localhost:8080/provaTesi/webapi/players/${playerToSearch}`);                       
    var options = {
        method: "GET",
        uri: reqUrl,
        json: true, // Automatically parses the JSON string in the response
    };

    rp(options).
        then(function (result){
            let dataToSend = '';
            dataToSend = `${result.firstName} ${result.lastName} is ${result.age} years old`;
            return res.json({                
                "fulfillmentText": dataToSend       
            });            
        })
        .catch(function (err){
            return res.json({
                "fulfillmentText": "Couldn't find player " + playerToSearch + " at " + reqUrl,
                "error": err
            })
        });
}