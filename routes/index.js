var express = require('express');
var request = require('request');
var router = express.Router();

function getMovieData() {
  return new Promise(function(fulfill, reject){
    request('http://api.themoviedb.org/3/movie/upcoming/?api_key=b2c319d64cba3280f7ee6977b9a470e0',
      function(error, response, data){
        if (error) reject(error);
        else fulfill(data);
      });
  });
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Movie Guide' });
//var movieData =
getMovieData().then(function(movieData){console.log(movieData)});


    // response.render('how-to-shoot-a-bow', { steps: information.firstSteps,
    //   title: 'First Steps',
    //   back: '/how-to-shoot-a-bow-part-3',
    //   next: "/how-to-shoot-a-bow-part-2"})

});

console.log("hello out thereeeeee!!!!!!!        +=={========>")
module.exports = router;
