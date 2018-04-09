##### __LIRI-NODE-APP__

###### __WHAT DOES THIS APP DO?__
Liri-Node-App is a _*Language_* Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and gives you back data. This current configuration of Liri-Node-App takes in specific, limited comands and displays, depending on the command,the last 20 tweets of Twitter user __MissULucy550__; information from Spotifiy about any particular song requested by the app user; information from the Open Movie Database API (OMDB) about a particular movie requesed by the app user; or random information from a .txt file, in this case, information provided by Spotify about the song, "I Want It That Way", by the Backstreet Boys. 

###### __HOW DO YOU GET STARTED?__

    <1> Clone or download the repository for Liri-Node-App.

    <2> Obtain the following:

        - API keys from Twitter: (i) consumer key; (ii) consumer secret; (iii) access token key; and (iv) access token secret. Go to <https://apps.twitter.com/app/new> to obtain the API keys from Twitter.
        - API keys from Spotify: (i) client id; and (ii) client secret. Go to <https://developer.spotify.com/my-applications/#!/applications/create> to obtain API keys from Twitter. 

        <Note, you must obtain your own API key, as they are not provided with the Liri-Node-App that you have downloaded.>
        
    <3> Create a file named `.env`, add the following to it, replacing the values with your API keys (no quotes) once you have them:

            SPOTIFY_ID=your-spotify-id
            SPOTIFY_SECRET=your-spotify-secret

            TWITTER_CONSUMER_KEY=your-twitter-consumer-key
            TWITTER_CONSUMER_SECRET=your-twitter-consumer-secret
            TWITTER_ACCESS_TOKEN_KEY=your-access-token-key
            TWITTER_ACCESS_TOKEN_SECRET=your-twitter-access-token-secret

    <4> Include the above .env in the root directory of the Liri-Node-App that you have downloaded.

    <5> Open GitBash or Terminal, making sure that you are in the file location of the Liri-Node-App, and run command 'npm install', to complete installation. 

###### __HOW DOES LIRI-NODE-APP WORK?__

###### __WHO MAINTAINS AND CONTRIBUTES TO THIS VERSION OF LIRI-NODE-APP?__ 

This version of Liri-Node-App was created by me, Jason Heath Meadows, Esq., currently a student at the University of Arizona Coding Boot Camp, in Gilbert, Arizona. I will maintain and contribute to this app, as necessary, as part of my Portfolio.