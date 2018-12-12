var rp = require('request-promise');
var isEmpty = require('./isEmpty');

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
            let dataToSend = '';
            if (isEmpty(result)){
                throw "There's no team with name " + teamToSearch + " in the database";
            }
            result.forEach(team => {
                dataToSend += "The team " + team.name + " has players ";
                team.players.forEach(player => {
                    dataToSend = dataToSend + player.firstName + " " + player.lastName + ", ";
                })
                dataToSend = dataToSend.substring(0, dataToSend.length-2) + ". "
            });            
            return res.json({                
                "fulfillmentText": dataToSend       
            });            
        })
        .catch(function (err){
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