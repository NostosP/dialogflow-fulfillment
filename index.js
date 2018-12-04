'use strict';

const express = require('express');
const bodyParser = require('body-parser');
var getPlayerById = require('./getPlayerById');
var getTeamByName = require('./getTeamByName');

const server = express();

server.use(bodyParser.urlencoded({
    extended: true
}));

server.use(bodyParser.json());


server.post('/', (req, res) => {

    if (req.body.queryResult.intent.displayName == "Find Player Intent - Get Name") {
        console.log("Finding player...")
        getPlayerById(req, res);        
    } else if (req.body.queryResult.intent.displayName == "Find Team Intent - Get Name") {        
        console.log("Finding team...")
        getTeamByName(req, res);
    }

});

server.listen((process.env.PORT || 8000), () => {
    console.log("Server is up and running...");
});