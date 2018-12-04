var rp = require('request-promise');
var isEmpty = require('./isEmpty');

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
            if (isEmpty(result)) {
                throw "There's no player with id " + playerToSearch + " in the database";
            }
            let dataToSend = '';
            dataToSend = `${result.firstName} ${result.lastName} is ${result.age} years old`;
            return res.json({                
                "fulfillmentText": dataToSend       
            });            
        })
        .catch(function (err){
            return res.json({
                "fulfillmentText": "Something went wrong!",
                "error": err
            })
        });
}