var rp = require('request-promise');
var url = `http://localhost:8082/training-sessions`;

module.exports = function (req, res) {
    let sessionDate = req.body.queryResult.parameters.date;
    sessionDate = sessionDate.substring(0, 10);
    const reqUrl = encodeURI(url + `?date=${sessionDate}`);                      
    var options = {
        method: "GET",
        uri: reqUrl,
        json: true, // Automatically parses the JSON string in the response
    };

    rp(options).
        then(result => {
            console.log("Response: " + JSON.stringify(result));
            let dataToSend;
            if (typeof result !== "string") {
                const hours = result[0].duration.substring(
                    result[0].duration.lastIndexOf("T") + 1,
                    result[0].duration.lastIndexOf("H")
                );
                const minutes = result[0].duration.substring(
                    result[0].duration.lastIndexOf("H") + 1,
                    result[0].duration.lastIndexOf("M")
                )
                const seconds = result[0].duration.substring(
                    result[0].duration.lastIndexOf("M") + 1,
                    result[0].duration.lastIndexOf("S")
                )
                dataToSend = `The training session on  ${result[0].date}` +
                    ` was a ${result[0].type} and it lasted for ${hours}:${minutes}:${seconds}.`;
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