var express = require('express');
var router = express.Router();
var movieApi = require('../public/data/movieApi');


/* GET home page. */
router.get('/', function(request, response, next) {
  //response.render('index', { title: 'Movie Guide' });
  movieApi.getUpcomingMovieData().then(function(data){

    var upComingMovies = movieApi.filterUpComingMovieData(data);
    //console.log(movies);

    response.render('index', upComingMovies);

  });
});


module.exports = router;
