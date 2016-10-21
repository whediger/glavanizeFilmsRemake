var express = require('express');
var request = require('request');
var genre = require('./genre');
var router = express.Router();

function getMovieData() {
  return new Promise(function(fulfill, reject){
    request('https://api.themoviedb.org/3/movie/upcoming/?api_key=b2c319d64cba3280f7ee6977b9a470e0',
      function(error, response, data){
        // console.log('data ', data);
        // console.log('response ', response);
        if (error) reject(error);
        else fulfill(data);
      });
  });
}

function getMonth(dateIn) {
  //var date = movieData.results[i].release_date
  var months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
  var dateKey = dateIn.split(""); //split date into array of chars to use
  //console.log(dateKey); //uncomment to see dateKey array
  //if month number is less than 10
  if ( dateKey[5] === '0' ) {
    date = months[dateKey[6]] + " " + dateKey[8] + dateKey[9];
  } else {
    //else convert dateKey val from string to int and add 10
    date = months[(parseInt(dateKey[6]) + 10)] + " " + dateKey[8] + dateKey[9];
  }
  return date;
}

function getPopularity(voteIn) {
  return Math.round(voteIn);
}



/* GET home page. */
router.get('/', function(request, response, next) {
  //response.render('index', { title: 'Movie Guide' });
  getMovieData().then(function(data){
    var movieData = JSON.parse(data);
    var movieNum = 10; //this is the number of movies displayed
    var movies = { numberOfMovies: movieNum,
                           movies: [] };
    var date = "";
    var vote = 0;
    //todo --votes and popularity ar backwards
    for ( var i = 0; i < movieNum; i++ ) {
      date = getMonth(movieData.results[i].release_date);
      popular = getPopularity(movieData.results[i].popularity);
      genreNames = movieData.results[i].genre_ids;
      console.log("genres: " + genre.getGenre(genreNames));
      //genre.getGenre(genreNames);

      movies.movies[i] = {  title: movieData.results[i].title,
                            movieId: "movie" + i,
                            moviePic: 'http://image.tmdb.org/t/p/w500/'
                                      + movieData.results[i].poster_path,
                            releaseDate: date,
                            movieCopy: movieData.results[i].overview,
                            numberOfMovies: movieNum,
                            popularity: popular,
                            votes: movieData.results[i].vote_count,
                            genre: genre.getGenre(genreNames)
                            };

    }
    //console.log(movies);

    response.render('index', movies);

  });


});


module.exports = router;
