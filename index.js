'use strict';

const express = require('express');
const bodyParser = require('body-parser');
var getPlayerById = require('./getPlayerById'),
    getTeamByName = require('./getTeamByName'),
    port = process.env.PORT || 8000;   

const server = express();

server.use(bodyParser.urlencoded({
    extended: true
}));

server.use(bodyParser.json());


server.post('/', (req, res) => {

    if (req.body.queryResult.intent.displayName == "Find Player Intent - Get Name") {
        console.log("Finding player...");
        getPlayerById(req, res);        
    } else if (req.body.queryResult.intent.displayName == "Find Team Intent - Get Name") {        
        console.log("Finding team...");
        getTeamByName(req, res);
    } else if (req.body.queryResult.intent.displayName == "Image Intent") {
        console.log("Finding image...");
        return res.json({
            "fulfillmentText": "Here is your image",
            "fulfillmentMessages": [
                {
                    "card": {
                        "title": "Here is your image",
                        "subtitle": "but I'm very disappointed...",
                        "imageUri": 'https://media.giphy.com/media/aMAE2PhvcHD4A/giphy.gif'                            
                    }
                }
            ]
        });
    }

});

server.listen(port, function(){
    console.log('Fulfillment server listening in http://localhost:' + port);
});
