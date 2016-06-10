
module.exports = {

        getGenre: function(arrIdIn){
          var arrayOut = [];
          genreLength = genre.genres.length;
          for ( var i = 0; i < arrIdIn.length; i++ ){
            for ( var e = 0; e < genreLength; e++ ) {
                if ( genre.genres[e].id === arrIdIn[i] ){
                  arrayOut.push(genre.genres[e].name);
                }
            }

          }
          return arrayOut;
        }
}
          //console.log(arrIn);
          var genre = {
            genres: [
                  {
                    "id": 28,
                    "name": "Action"
                  },
                  {
                    "id": 12,
                    "name": "Adventure"
                  },
                  {
                    "id": 16,
                    "name": "Animation"
                  },
                  {
                    "id": 35,
                    "name": "Comedy"
                  },
                  {
                    "id": 80,
                    "name": "Crime"
                  },
                  {
                    "id": 99,
                    "name": "Documentary"
                  },
                  {
                    "id": 18,
                    "name": "Drama"
                  },
                  {
                    "id": 10751,
                    "name": "Family"
                  },
                  {
                    "id": 14,
                    "name": "Fantasy"
                  },
                  {
                    "id": 10769,
                    "name": "Foreign"
                  },
                  {
                    "id": 36,
                    "name": "History"
                  },
                  {
                    "id": 27,
                    "name": "Horror"
                  },
                  {
                    "id": 10402,
                    "name": "Music"
                  },
                  {
                    "id": 9648,
                    "name": "Mystery"
                  },
                  {
                    "id": 10749,
                    "name": "Romance"
                  },
                  {
                    "id": 878,
                    "name": "Science Fiction"
                  },
                  {
                    "id": 10770,
                    "name": "TV Movie"
                  },
                  {
                    "id": 53,
                    "name": "Thriller"
                  },
                  {
                    "id": 10752,
                    "name": "War"
                  },
                  {
                    "id": 37,
                    "name": "Western"
                  }
                ]
              }

              // for ( var e = 0; e < arrIdIn.length; e++){//loops through arrIn
              //
              //   for ( var i = 0; i < genreLength; i++ ){//loos through genre object
              //     if ( genre.genres[i].id === arrIdIn[e] ){
              //       idArrIn[e] = genre.genres[i].name;
              //     }
              //   }
              // }
              // return arrIdIn;
