var express = require('express');
var genre = require('./genre');
var router = express.Router();
var movieApi = require('../public/data/movieApi');


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
      date = movieApi.getMonth(movieData.results[i].release_date);
      popular = movieApi.getPopularity(movieData.results[i].popularity);
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
