'use strict';

const express = require('express'),
    bodyParser = require('body-parser'),
    getPlayerInfo = require('./getPlayerInfo'),
    getSessionInfo = require('./getTrainingSession'),
    comparePlayers = require('./comparePlayersPerformance'),
    port = process.env.PORT || 8000;   

const server = express();

server.use(bodyParser.urlencoded({
    extended: true
}));

server.use(bodyParser.json());

// Endpoint for agent requests
server.post('/', (req, res) => {

    switch (req.body.queryResult.action) {
        case "GetPlayerInfo": {
            console.log("Finding player...");
            getPlayerInfo(req, res);}
            break;
        case "GetSessionInfo": {
            console.log("Finding training session...")
            getSessionInfo(req, res)
            }
            break;
        case "ComparePerformance": {
            console.log("Comparing players...");
            comparePlayers(req, res);}
            break;
        default:
            break;
    }

});

server.listen(port, function(){
    console.log('Fulfillment server listening in http://localhost:' + port);
});
