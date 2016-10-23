var express = require('express');
var genre = require('./genre');
var router = express.Router();
var movieApi = require('../public/data/movieApi');





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
  movieApi.getUpcomingMovieData().then(function(data){
    var movieData = JSON.parse(data);
    var movieNum = 10; //this is the number of movies displayed
    var upComingMovies = { numberOfMovies: movieNum,
                           movies: [] };
    var date = "";
    var vote = 0;
    //todo --votes and popularity ar backwards
    for ( var i = 0; i < movieNum; i++ ) {
      var isoDate = new Date(movieData.results[i].release_date);
      isoDate = isoDate.toISOString().replace(/-|:|\.\d\d\d/g,"");
      date = getMonth(movieData.results[i].release_date);
      popular = getPopularity(movieData.results[i].popularity);
      genreNames = movieData.results[i].genre_ids;
      //genre.getGenre(genreNames);

      upComingMovies.movies[i] = {  title: movieData.results[i].title,
                            movieId: "movie" + i,
                            moviePic: 'http://image.tmdb.org/t/p/w500/'
                                      + movieData.results[i].poster_path,
                            releaseDate: date,
                            isoDate: isoDate,
                            movieCopy: movieData.results[i].overview,
                            numberOfMovies: movieNum,
                            popularity: popular,
                            votes: movieData.results[i].vote_count,
                            genre: genre.getGenre(genreNames)
                            };
    }
    //console.log(movies);

    response.render('index', upComingMovies);

  });
});


module.exports = router;
