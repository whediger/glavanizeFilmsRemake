
var request = require('request');


module.exports = {
  getUpcomingMovieData: function() {
    return new Promise(function(fulfill, reject){
      request('https://api.themoviedb.org/3/movie/upcoming/?sort_by=popularity.desc&api_key=b2c319d64cba3280f7ee6977b9a470e0',
        function(error, response, data){
          console.log('data ', data);
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
      date = months[dateKey[6]] + " " + dateKey[8] + dateKey[9];
    } else {
      //else convert dateKey val from string to int and add 10
      date = months[(parseInt(dateKey[6]) + 10)] + " " + dateKey[8] + dateKey[9];
    }
    return date;
  },

  getPopularity: function(voteIn) {
      return Math.round(voteIn);
  }
}

// function getPopularity(voteIn) {
//   return Math.round(voteIn);
// }