//import API keys from .env file
require("dotenv").config();

//import keys file
var keys = require("./keys.js");

//require fs library
var fs = require("fs");

//import Twitter npm package
var Twitter = require("twitter");

//import Node Spotify API npm package
var Spotify = require('node-spotify-api');

//import Request API npm package for OMDB
var request = require('request');

//keys for pulling Twitter API6
var twitter = new Twitter ({
  	consumer_key: keys.twitter.consumer_key,
  	consumer_secret: keys.twitter.consumer_secret,
  	access_token_key: keys.twitter.access_token_key,
  	access_token_secret: keys.twitter.access_token_secret
});

//Twitter user account
var myTweets = {screen_name: "MissULucy550"};

//keys for pulling Spotify API
var spotify = new Spotify({
	id: keys.spotify.id,
	secret: keys.spotify.secret
});

//variable for Spotify song search
var songChoice = "";

//variable for OMDB movie search
var omdbRequest = "";

//variable for user commands
var userCommand = process.argv[2];

//for the twitter calls
if (userCommand === "my-tweets") {
	twitterCall();
}

//for the spotify calls 
else if (userCommand === "spotify-this-song") {
	spotifyCheck();
	spotifyCall(songChoice);
}

//for the open movie database (OMDB) calls
else if (userCommand === "movie-this") {
	movieCheck();
	movieCall(omdbRequest);
}

//for the do-what-it-says call
else if (userCommand === "do-what-it-says") {
	justDoIt();	
}

//if user does not input a command, return "There was an error."
else {
	return console.log("There was an error.");
}

//function for the twitter calls
function twitterCall() {
	twitter.get("statuses/user_timeline", myTweets, function(error, tweets, response){
		if(error) {
			return console.log(error);
		} else {
		console.log("Tweets from " + myTweets.screen_name + ":");
		console.log("");
			for (var i = 0; i < tweets.length; i++) {

			//convert UTC time to local time for tweet timestamp 
			var tweetDate = new Date(tweets[i].created_at);

			console.log(tweets[i].text);

			//convert UTC time to local time for tweet timestamp 
			console.log(tweetDate.toString()); 
			console.log("------------------------------------------");
			}
		}
	});
};

//functions for Spotify calls; spotifyCheck function puts user's songChoice into var songChoice
//spotifyCall function executes the search with songChoice
//make for-loop for multi-word song titles
function spotifyCheck () {
    //if the user doesn't put in a song, the default will be The Sign by Ace of Base
	if (!process.argv[3]) {
		songChoice = "Ace of Base", "The Sign";
	} else {
		for (i = 3; i < process.argv.length; i++) {
			songChoice = process.argv[i];
		}
	}
};

function spotifyCall(songChoice) {
	spotify.search({type: "track", query: songChoice, limit: 1}, function(error, response){
		if (error) {
			return console.log(error);
		}

//song information to command line
	for (var i = 0; i < response.tracks.items[0].album.artists.length; i++) {
		console.log("Artist(s): " + response.tracks.items[0].album.artists[i].name);
		console.log("Song: " + response.tracks.items[0].name);
		console.log("Song Link: " + response.tracks.items[0].external_urls.spotify);
		console.log("Album: " + response.tracks.items[0].album.name);
		}
	});
};

//functions for the open movie database (OMDB) calls; movieCheck function puts user's movie request into var omdbRequest//
//movieCall function executes the search with omdbRequest
//make for-loop for multi-word movie titles
function movieCheck() {

	//default search for movie title "Mr. Nobody" if user does not put in a movie title
	if (!process.argv[3]) {
		omdbRequest = "Mr. Nobody";
	} else {
		for (var i = 3; i < process.argv.length; i++) {
			omdbRequest += process.argv[i] + "+";
		}
	}
};

function movieCall(omdbRequest) {
	//variable to hold the omdb url search with api key and omdb request
	var omdbMovie = "http://www.omdbapi.com/?apikey=40e9cece&tomatoes=true&t=" + omdbRequest;

	request(omdbMovie, function (error, response, body) {
		if (error) {
			return console.log(error);
		} else if (!error && response.statusCode === 200)

//movie information to command line
	console.log("Title of the movie: " + JSON.parse(body).Title);
	console.log("Year the movie came out: " + JSON.parse(body).Year);
	console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
	console.log("Rotten Tomatoes Rating: " + JSON.parse(body).movie.Ratings[2].Value);
	console.log("Country where the movie was produced: " + JSON.parse(body).Country);
	console.log("Movie language: " + JSON.parse(body).Language);
	console.log("Movie plot: " + JSON.parse(body).Plot);
	console.log("Actors in the movie: " + JSON.parse(body).Actors);
	});
};

//function for the do-what-it-says call
function justDoIt() {
	fs.readFile("random.txt", "utf8", function(error, data) {
		if (error) {
			return console.log(error);
		} else {
			
//splits random.txt into strings.
	var theSplit = data.split(",");
	if (theSplit[0] === "spotify-this-song") {
		songChoice = theSplit[1];

//skip spotifyCheck function and and execute spotifyCall function with songChoice in index 1 of theSplit
		spotifyCall(songChoice);
			} 
	else if (theSplit[0] === "movie-this") {
		omdbRequest = theSplit[1];

//skip over omdbCheck function ABD execute omdbCall function with omdbRequest in index 1 of theSplit
		movieCall(omdbRequest);
			}
	else if (theSplit[0] === "my-tweets") {
				myTweets.screen_name = theSplit[1];
		twitterCall();
			}
	else {
		console.log("Error: There's a problem with this call.")
			}
		}
	});
}