'use strict';

const express = require('express');
const bodyParser = require('body-parser');
var rp = require('request-promise');
const API_KEY = require('./apiKey');

const server = express();

server.use(bodyParser.urlencoded({
    extended: true
}));

server.use(bodyParser.json());

server.post('/get-movie-details', (req, res) => {

    const movieToSearch = req.body.queryResult.parameters.movie;
    const reqUrl = encodeURI(`http://www.omdbapi.com/?t=${movieToSearch}&apikey=${API_KEY}`);
    var options = {
        method: "GET",
        uri: reqUrl,
        json: true, // Automatically parses the JSON string in the response
    };
    rp(options).
        then(function (result){
            if (result.Response == 'True') {
                let dataToSend = '';
                dataToSend = `${result.Title} is a ${result.Actors} starer ${result.Genre} movie, released in ${result.Year}. It was directed by ${result.Director}`;
                return res.json({                
                    "fulfillmentText": dataToSend,
                    "source": "https://safe-journey-43214.herokuapp.com/get-movie-details"               
                });
            } else return res.json({                
                "fulfillmentText": "Sorry, couldn't find your movie",
                "source": "https://safe-journey-43214.herokuapp.com/get-movie-details"               
            });
            
        })
        .catch(function (err){
            return res.json({
                "fulfillmentText": "Something went wrong!",
                "source": "https://safe-journey-43214.herokuapp.com/get-movie-details"
            })
        });
    
});

server.listen((process.env.PORT || 8000), () => {
    console.log("Server is up and running...");
});