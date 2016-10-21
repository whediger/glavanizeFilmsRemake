$(document).ready(function(){
  var numberOfMovies = $('.panel-group').data('numofmovies');

  for ( i = 0; i <= numberOfMovies; i++ ){
    var popularity = $('.voteRating' + i).data('popularity');
    for ( e = 1; e <= popularity; e++ ){
      $('.voteRating'+ i + ' span:nth-child(' + e + ')')
      .removeClass('glyphicon-star-empty')
      .addClass('glyphicon glyphicon-star');
    }
  }
});
