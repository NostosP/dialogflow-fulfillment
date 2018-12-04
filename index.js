'use strict';

const express = require('express');
const bodyParser = require('body-parser');
var rp = require('request-promise');

const server = express();

server.use(bodyParser.urlencoded({
    extended: true
}));

server.use(bodyParser.json());

server.post('/', (req, res) => {

    if (req.body.queryResult.intent.displayName == "Find Player Intent - Get Name") {
        const playerToSearch = req.body.queryResult.parameters.player;
        let reqUrl = encodeURI(`http://localhost:8080/provaTesi/webapi/players/${playerToSearch}`);        
        var options = {
            method: "GET",
            uri: reqUrl,
            json: true, // Automatically parses the JSON string in the response
        };
    }    
    
    rp(options).
        then(function (result){
            let dataToSend = '';
            dataToSend = `${result.firstName} ${result.lastName} is ${result.age} years old`;
            return res.json({                
                "fulfillmentText": dataToSend,
                "source": "https://safe-journey-43214.herokuapp.com"               
            });            
        })
        .catch(function (err){
            return res.json({
                "fulfillmentText": "Something went wrong!",
                "source": "https://safe-journey-43214.herokuapp.com"
            })
        });
    
});

server.listen((process.env.PORT || 8000), () => {
    console.log("Server is up and running...");
});