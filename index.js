'use strict';

const express = require('express');
const bodyParser = require('body-parser');
// const http = require('http');
var rp = require('request-promise');
const API_KEY = require('./apiKey');

const server = express();

server.use(bodyParser.urlencoded({
    extended: true
}));

server.use(bodyParser.json());

server.post('/get-movie-details', (req, res) => {

    // const movieToSearch = req.body.result && req.body.result.parameters && req.body.result.parameters.movie ? req.body.result.parameters.movie : 'The Godfather';
    const movieToSearch = req.body.queryResult.parameters.movie;
    const reqUrl = encodeURI(`http://www.omdbapi.com/?t=${movieToSearch}&apikey=${API_KEY}`);
    var options = {
        "method": "GET",
        "uri": reqUrl,
        "json": true, // Automatically parses the JSON string in the response
        "headers": {
            "User-Agent": "My little demo app"
        }
    };
    rp(options).
        then(function (result){
            let dataToSend = '';
            dataToSend = `${result.Title} is a ${result.Actors} starer ${result.Genre} movie, released in ${result.Year}. It was directed by ${result.Director}`;
            return res.json({                
                "fulfillmentText": dataToSend,
                "source": "https://safe-journey-43214.herokuapp.com/get-movie-details",                
            });
        })
        .catch(function (err){
            return res.json({
                "fulfillmentText": "Something went wrong!"
            })
        });
    // http.get(reqUrl, (responseFromAPI) => {
    //     let completeResponse = '';
    //     responseFromAPI.on('data', (chunk) => {
    //         completeResponse += chunk;
    //     });
    //     responseFromAPI.on('end', () => {
    //         const movie = JSON.parse(completeResponse);
    //         let dataToSend = movieToSearch === 'The Godfather' ? `I don't have the required info on that. Here's some info on 'The Godfather' instead.\n` : '';
    //         dataToSend += `${movie.Title} is a ${movie.Actors} starer ${movie.Genre} movie, released in ${movie.Year}. It was directed by ${movie.Director}`;

    //         return res.json({                
    //             "fulfillmentText": dataToSend,
    //             "source": "https://safe-journey-43214.herokuapp.com/get-movie-details",                
    //         });
    //     });
    // }, (error) => {
    //     return res.json({
    //         speech: 'Something went wrong!',
    //         displayText: 'Something went wrong!',
    //         source: 'get-movie-details'
    //     });
    // });
});

server.listen((process.env.PORT || 8000), () => {
    console.log("Server is up and running...");
});