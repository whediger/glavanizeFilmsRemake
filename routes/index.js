var express = require('express');
var router = express.Router();
var movieApi = require('../public/data/movieApi');


/* GET home page. */
router.get('/', function(request, response, next) {

  movieApi.getUpcomingMovieData()
    .then(function(data){
      var upComingMovies = movieApi.filterUpComingMovieData(data);
      response.render('index', upComingMovies);
  });

  movieApi.getMoviesShowing();
});


module.exports = router;
