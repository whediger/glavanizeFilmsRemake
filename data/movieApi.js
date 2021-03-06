var request = require('request');
var genre = require('./genre');
require('dotenv').config();


module.exports = {
  getUpcomingMovieData: function() {
    return new Promise(function(fulfill, reject){
      request('https://api.themoviedb.org/3/movie/upcoming?api_key=' + process.env.THEMOVIEDB_KEY + '&language=en-US&page=1&region=US',
        function(error, response, data){
          // console.log('data ', data);
          // console.log('response ', response);
          if (error) reject(error);
          else fulfill(data);
        });
    });
  },

  getMonth: function(dateIn) {
    //var date = movieData.results[i].release_date
    var months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
    var dateKey = dateIn.split(""); //split date into array of chars to use
    //console.log(dateKey); //uncomment to see dateKey array
    //if month number is less than 10
    if ( dateKey[5] === '0' ) {
      date = months[dateKey[6] -1] + " " + dateKey[8] + dateKey[9];
    } else {
      //else convert dateKey val from string to int and add 10
      date = months[(parseInt(dateKey[6]) + 10) -1] + " " + dateKey[8] + dateKey[9];
    }
    return date;
  },

  roundResult: function(voteIn) {
      return Math.round(voteIn);
  },

  filterMovieData: function(data){
    var movieData = JSON.parse(data);
    var movieNum = 10; //this is the number of movies displayed
    var movies = { numberOfMovies: movieNum,
                           movies: [] };
    var date = "";
    var vote = 0;
    for ( var i = 0; i < movieNum; i++ ) {
      var isoDate = new Date(movieData.results[i].release_date);
      //console.log('the day' +isoDate);
      var todaysDate = new Date();
      todaysDate = todaysDate.toISOString().replace(/-|:|\.\d\d\d/g,"");
      isoDate = isoDate.toISOString().replace(/-|:|\.\d\d\d/g,"");
      date = this.getMonth(movieData.results[i].release_date);
      popular = this.roundResult(movieData.results[i].popularity);
      if (popular > 6 ){
        popular = this.roundResult(movieData.results[i].vote_average);
      }

      genreNames = movieData.results[i].genre_ids;
      //genre.getGenre(genreNames);

      movies.movies[i] = {  title: movieData.results[i].title,
                                  movieId: movieData.results[i].id,
                                 moviePic: 'https://image.tmdb.org/t/p/w500/'
                                            + movieData.results[i].poster_path,
                              releaseDate: date,
                                  isoDate: isoDate,
                               todaysDate: todaysDate,
                                movieCopy: movieData.results[i].overview,
                           numberOfMovies: movieNum,
                               popularity: popular,
                                    votes: movieData.results[i].vote_count,
                                    genre: genre.getGenre(genreNames)
                            };
    }
    return movies;
  },

  getMoviesShowing: function(){
    return new Promise(function(fulfill, reject){
      request('https://api.themoviedb.org/3/movie/now_playing?sort_by=popularity.desc&api_key=' + process.env.THEMOVIEDB_KEY,
        function(error, response, data){
          // console.log('data ', data);
          // console.log('response ', response);
          if (error) reject(error)
          else fulfill(data);
        });
    });
  },

  getMovieTrailer: function(movieId) {
    return new Promise(function(fulfill, reject){
      request('https://api.themoviedb.org/3/movie/'+ movieId +'/videos?api_key=' + process.env.THEMOVIEDB_KEY,
        function(error, response, data){
          data = JSON.parse(data);
          try {
            var youtubeKey = data.results[0].key;
          }
          catch(e) {
            console.error("+==}========> no video found: " + e);
            var youtubeKey = null;
          }
          if (error) reject(error)
          else fulfill(youtubeKey)
        });
    });
  }

} //module
