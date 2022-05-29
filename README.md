<div align="center">

<h1>Micro Movies - Movie Recomendation System </h1>
<img src="https://img.shields.io/badge/Python-3.7.3-brown" />
<img src="https://img.shields.io/badge/Frontend-ReactJS-orange" />
<img src="https://img.shields.io/badge/BackendAPI-Flask-yellow" />
<img src="https://img.shields.io/badge/OtherAPI-TMDB-red" />
</div>

## About

<b>Micro Movies</b> is a movie recommendation web application which works on <b>Content Based Filtering</b> using the <b>Cosine Similarity</b> metric. This application not only recommends movies but also shows the top rated and trending movies. It allows the user to search the movie and provides all the information related to that movie,  the top 10 <b>movie recommendations</b> based on the search, and also the trailers of the movies.<br/>

<b>TMDB</b> API was used to retrieve all the information related to the movie and its cast. 

## How to generate TMDB API Key?

1. Login to you your tmdb account: https://www.themoviedb.org/ or create one if you dont have.
2. Then open https://www.themoviedb.org/settings/api link and create your api key by filing all the necessary information.
3. <b>IMPORTANT:</b> After generating the TMDB API KEY, replace "ENTER YOUR TMDB_API_KEY" with your generated key in the API and FRONTEND code.

## TMDB API End Points

1. BASE URL: https://api.themoviedb.org/3
2. FOR MOVIE DATA: https://api.themoviedb.org/3/movie/{tmdb_movie_id}?api_key={TMDB_API_KEY}
3. FOR MOVIE CAST DATA: https://api.themoviedb.org/3/movie/{tmdb_movie_id}/credits?api_key={TMDB_API_KEY}
   <b>NOTE: </b>Please do refer the documentation at the BASE URL for better understanding.

## Flask API end points

1. To get recommendations: 

```
Data to be sent in POST request:
{
    movie_name:"Iron Man 2",
    number_of_recommendations:"10"
}

Data Returned by the API in JSON format:
{
    input_movie:{
        movie_id:TMDB_MOVIE_ID
    },
    recommendations:[
        {
            rank:1,
            movie_id:TMDB_MOVIE_ID
        },
        {
            rank:2,
            movie_id:TMDB_MOVIE_ID
        },
        .
        .
        .
    ]
}
```

<b>NOTE: </b>The error messages are returned in the following format:

```
{
    error:"Content of ERROR Message"
}
```

## Steps to run the React Project

1. Clone or download the repository in your local machine.
2. Open command prompt in the folder `react-movie`
```
cd react-movie
```
3. Install all the npm packages

```
npm i react-router-dom@5.2.0 axios sass swiper@6.8.4 --save
```

4. Now, run the Flask API in your local machine to start the React frontend. You can start the react application using the following command:

```
npm start
```

## Steps to run the Flask API

1. Clone or download the repository and open command prompt in `API` folder.
```
cd API
```
2. Run the Flask API using the command:
```
flask run
```

The API will be running at http://127.0.0.1:5000/

<b>NOTE: </b>You can run the Flask API and the React Frontend in parallel and can use for development by replacing the baseURL,present in `react-movie/src/api/recommenderapi.js`, with the Flask API running link.

## Dataset Links

1. [IMDB 5000 Dataset](https://www.kaggle.com/carolzhangdc/imdb-5000-movie-dataset)
2. movies_metadata.csv and credits.csv from [Movies Dataset](https://www.kaggle.com/rounakbanik/the-movies-dataset)
3. Remaining Datasets are generated using `DataProcessing.ipynb` files in `Movie Recommendation folder`
