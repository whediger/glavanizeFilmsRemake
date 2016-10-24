$(document).ready(function(){
  var numberOfMoviesComingSoon = $('.group1').data('numofmovies');
  for ( i = 0; i <= numberOfMoviesComingSoon; i++ ){
    var popularity = $('.voteRating1' + i).data('popularity');
    for ( e = 1; e <= popularity; e++ ){
      $('.voteRating1'+ i + ' span:nth-child(' + e + ')')
      .removeClass('glyphicon-star-empty')
      .addClass('glyphicon glyphicon-star');
    }
  }

  var numberOfMoviesInTheaters = $('.group2').data('numofmovies');

  for ( i = 0; i <= numberOfMoviesInTheaters; i++ ){
    var popularity = $('.voteRating2' + i).data('popularity');
    for ( e = 1; e <= popularity; e++ ){
      $('.voteRating2'+ i + ' span:nth-child(' + e + ')')
      .removeClass('glyphicon-star-empty')
      .addClass('glyphicon glyphicon-star');
    }
  }
});
