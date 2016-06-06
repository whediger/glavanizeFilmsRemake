var express = require('express');
var request = require('request');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Movie Guide' });


    // response.render('how-to-shoot-a-bow', { steps: information.firstSteps,
    //   title: 'First Steps',
    //   back: '/how-to-shoot-a-bow-part-3',
    //   next: "/how-to-shoot-a-bow-part-2"})

});

console.log("hello out thereeeeee!!!!!!!        +=={========>")
module.exports = router;
