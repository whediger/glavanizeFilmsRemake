var express = require('express');
var request = require('request');
var router = express.Router();

function getMovieData() {
  return new Promise(function(fulfill, reject){
    request('https://api.themoviedb.org/3/movie/upcoming/?api_key=b2c319d64cba3280f7ee6977b9a470e0',
      function(error, response, data){
        if (error) reject(error);
        else fulfill(data);
      });
  });
}

/* GET home page. */
router.get('/', function(request, response, next) {
  //response.render('index', { title: 'Movie Guide' });
  //todo --------- the accoridian is not working due to name conflicts
  getMovieData().then(function(data){
    var movieData = JSON.parse(data);
    var movies = { movies: [] };
    for ( var i = 0; i < 10; i++ ) {
      movies.movies[i] = { title: movieData.results[i].title,
                            movieId: "movie" + i};
      console.log(movies.movies[i].title);
    }
    console.log(movies);

    response.render('index', movies);

  });


});

console.log("hello out thereeeeee!!!!!!!        +=={========>")
module.exports = router;
