var express = require('express');
var router = express.Router();
var movieApi = require('../data/movieApi');


/* GET home page. */
router.get('/', function(request, response, next) {
  var movies = {};
  movieApi.getUpcomingMovieData()
    .then(function(soonData){
      movies.upComingMovies = movieApi.filterUpComingMovieData(soonData);
      //response.render('index', upComingMovies);
    })
    .then(function(){
      movieApi.getMoviesShowing()
      .then(function(nowData){
        movies.moviesNowShowing = movieApi.filterUpComingMovieData(nowData);
        // console.log(moviesNowShowing);
        response.render('index', movies);
        //TODO rating system is garbage
        //arrange movies in ascending order by number of votes
      });
    });



});


module.exports = router;
