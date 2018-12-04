var rp = require('request-promise');

module.exports = function (req, res) {
    const teamToSearch = req.body.queryResult.parameters.team;
    const reqUrl = encodeURI(`http://localhost:8080/provaTesi/webapi/teams/${teamToSearch}`);                       
    var options = {
        method: "GET",
        uri: reqUrl,
        json: true, // Automatically parses the JSON string in the response
    };

    rp(options).
        then(function (result){            
            let dataToSend = 'The team ';
            result.forEach(team => {
                dataToSend = dataToSend + team.name + " has players ";
                team.players.forEach(player => {
                    dataToSend = dataToSend + player.firstName + " " + player.lastName;
                })
            });            
            return res.json({                
                "fulfillmentText": dataToSend       
            });            
        })
        .catch(function (err){
            return res.json({
                "fulfillmentText": "Couldn't find team " + teamToSearch + " at " + reqUrl,
                "error": err
            })
        });
}