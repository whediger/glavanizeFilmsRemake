var express = require('express');
var router = express.Router();

router.get('http://api.themoviedb.org/3/movie/upcoming/?api_key=b2c319d64cba3280f7ee6977b9a470e0', function(request, response){
  console.log(response);
  // response.render('how-to-shoot-a-bow', { steps: information.firstSteps,
  //   title: 'First Steps',
  //   back: '/how-to-shoot-a-bow-part-3',
  //   next: "/how-to-shoot-a-bow-part-2"})
});

module.exports = router;
