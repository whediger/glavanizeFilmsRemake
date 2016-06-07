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

  getMovieData().then(function(data){
    var movieData = JSON.parse(data);
    var movies = { movies: [] };

    for ( var i = 0; i < 10; i++ ) {
      var date = movieData.results[i].release_date
      var months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
      var dateKey = date.split(""); //split date into array of chars to use
      //console.log(dateKey); //uncomment to see dateKey array
      //if month number is less than 10
      if ( dateKey[5] === '0' ) {
      date = months[dateKey[6]] + " " + dateKey[8] + dateKey[9];
    } else {
      //else convert dateKey val from string to int and add 10
      date = months[(parseInt(dateKey[6]) + 10)] + " " + dateKey[8] + dateKey[9];
    }
      movies.movies[i] = { title: movieData.results[i].title,
                            movieId: "movie" + i,
                            moviePic: 'http://image.tmdb.org/t/p/w500/'
                                      + movieData.results[i].poster_path,
                            releaseDate: date};

      //console.log(movies.movies[i].title);
    }
    //console.log(movies);

    response.render('index', movies);

  });


});

console.log("hello out thereeeeee!!!!!!!        +=={========>")
module.exports = router;
