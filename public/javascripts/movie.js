$(document).ready(function(){
  var numberOfMovies = $('.panel-group').data('numofmovies');

  for ( i = 0; i <= numberOfMovies; i++ ){
    console.log('i' + i);
    var popularity = $('.voteRating' + i).data('popularity');
    console.log(popularity);
    for ( e = 1; e <= popularity; e++ ){
      console.log('e' + e);
      $('.voteRating'+ i + ' span:nth-child(' + e + ')')
      .removeClass('glyphicon-star-empty')
      .addClass('glyphicon glyphicon-star');
    }
  }
  console.log(numberOfMovies);
  // for ( var i = 0; i < $())
  // $(.voteRating:nth-of-type(i)).

});
