var express = require('express');
var router = express.Router();
var movieApi = require('../data/movieApi');


/* GET home page. */
router.get('/', function(req, res, next) {
  var movies = {};
  movieApi.getUpcomingMovieData()
    .then(function(soonData){
      movies.upComingMovies = movieApi.filterMovieData(soonData);
      //response.render('index', upComingMovies);
    })
    .then(function(){
      movieApi.getMoviesShowing()
      .then(function(nowData){
        movies.moviesNowShowing = movieApi.filterMovieData(nowData);
        // console.log(moviesNowShowing);
        res.render('index', movies);
        //TODO rating system is garbage
        //arrange movies in ascending order by number of votes?
      });
    });
});

router.get('/:title.:id', function(req, res, next){
  movieApi.getMovieTrailer(req.params.id)
    .then(function(youtubeKey){
      var data = { title: req.params.title, youtubeKey: youtubeKey };
      if (youtubeKey === null){
          data.title = "Sorry: No Video for This Movie found"
      }

      res.render('trailer', data);
    });
});



module.exports = router;
