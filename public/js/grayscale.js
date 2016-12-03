/*!
 * Start Bootstrap - Grayscale Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

// jQuery to collapse the navbar on scroll
function collapseNavbar() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
}

$(window).scroll(collapseNavbar);
$(document).ready(collapseNavbar);

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
  if ($(this).attr('class') != 'dropdown-toggle active' && $(this).attr('class') != 'dropdown-toggle') {
    $('.navbar-toggle:visible').click();
  }
});


//google maps geocoder
function getUserLocation(zipCode, callback) {
  return new Promise(function(fulfill, reject){
    $.get('https://maps.googleapis.com/maps/api/geocode/json?address='+ zipCode + '&components=postal_code&key=AIzaSyAroEaSDeI9YCYmgcbMWqLIybCv8XfY6pA',
      function(geoLocation){
        if (geoLocation.status == 'ZERO_RESULTS'){
          document.getElementById('zipCodeInput').style.border = 'thick dotted yellow';
          document.getElementById('locationError').style.visibility = 'visible';
          console.error('error: location not found');
        } else {
          var location = {};
          document.getElementById('zipCodeInput').style.border = 'none';
          document.getElementById('locationError').style.visibility = 'hidden';
          //geoLocation = JSON.parse(geoLocation);
          // console.log(geoLocation.results[0].geometry.location.lat);
          // console.log(geoLocation.results[0].geometry.location.lng);
          location = {  lat: geoLocation.results[0].geometry.location.lat,
                        lng: geoLocation.results[0].geometry.location.lng,
                    zipCode: zipCode }
          callback(location);
        }
      });
  });
}

//Google maps event handlers
document.getElementById('zipButton').addEventListener('click', function(){
  var zipCode = document.getElementById('zipCodeInput').value;
  saveToLocalStorage('zipcode', zipCode)
  initMap(zipCode);

});

// Google Maps Scripts
var map = null;
var zipcode = localStorageInit();
document.getElementById('zipCodeInput').value = zipcode;
// When the window has finished loading create our google map below
google.maps.event.addDomListener(window, 'load', initMap(zipcode) );


function getLocalTheatres(zipcode){
  getUserLocation(zipcode, function(locationLatLng){

    locationLatLng = new google.maps.LatLng(locationLatLng.lat, locationLatLng.lng)
    var mapOptions = getMapOptions();
    mapOptions.center = locationLatLng,
    map = new google.maps.Map(document.getElementById('map'), mapOptions);

    var request = {
      location: locationLatLng,
      rankBy: google.maps.places.RankBy.DISTANCE,
      keyword: 'movie theatre',
      type: 'movie_theater'
    }

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, theaterCallback);
  });
}

function theaterCallback(results, status){
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    var theaterListing = document.getElementById('theaterListing');
    while (theaterListing.firstChild){
      theaterListing.removeChild(theaterListing.firstChild);
    }

    for ( var i = 0; i < 9; i++){
      var div = document.createElement('div');
      var a = document.createElement('a');
      var h3 = document.createElement('h3');
      var p = document.createElement('p');
      a.setAttribute('target', "_blank");
      addTheaterLink(a, results[i].place_id);
      h3.innerHTML = results[i].name;
      p.innerHTML = results[i].vicinity;
      a.appendChild(h3);
      div.appendChild(a);
      div.appendChild(p);
      theaterListing.appendChild(div);
    }
  }
}

function addTheaterLink(element, theaterId){
  var request2 = {
    placeId: theaterId
  };
  service = new google.maps.places.PlacesService(map);
  service.getDetails(request2, detailsCallback);
  function detailsCallback(place, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      link = place.website;
      element.setAttribute('href', link);
    } else {
      console.error("+==}========> Error: link not created: detail not found");
      console.error(google.maps.places.PlacesServiceStatus);
    }
  }
}

function initMap(zipCode){
  // dependency injection - geocode the zipcode

  document.getElementById('zipCodeInput').placeholder = zipCode;
  google.maps.event.addDomListener(window, 'resize', function() {
      getUserLocation(zipCode, function(location){
          map.panTo(new google.maps.LatLng(location.lat, location.lng)); //Denver 39.7376, -104.9897
      });
  });
  getLocalTheatres(zipCode);
  getUserLocation(zipCode, init);
}

function init(location) {
      // Basic options for a simple Google Map
      // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions

      mapOptions = getMapOptions();

      // The latitude and longitude to center the map (always required)
      mapOptions.center = new google.maps.LatLng(location.lat, location.lng); // Denver 39.7376, -104.9897

      //console.log(mapOptions);
      // Get the HTML DOM element that will contain your map
      // We are using a div with id="map" seen below in the <body>
      var mapElement = document.getElementById('map');

      // Create the Google Map using out element and options defined above
      map = new google.maps.Map(mapElement, mapOptions);

      // Custom Map Marker Icon - Customize the map-marker.png file to customize your icon
      var image = 'images/map-marker.png';
      var myLatLng = new google.maps.LatLng(location.lat, location.lng);
      var beachMarker = new google.maps.Marker({
          position: myLatLng,
          map: map,
          icon: image
      });
}

// localstorage Scripts

function storageAvailable(type) {
	try {
		var storage = window[type],
			x = '__storage_test__';
		storage.setItem(x, x);
		storage.removeItem(x);
		return true;
	}
	catch(e) {
		return false;
	}
}

function localStorageInit(){
  if(!localStorage.getItem('zipcode')) {
    return '80226';
  } else {
    return localStorage.getItem('zipcode');
  }
}

function saveToLocalStorage(key, value){
  if (storageAvailable('localStorage')) {
    localStorage.setItem(key, value);
  	// Yippee! We can use localStorage awesomeness
  }
  else {
    console.error("localstorage not available - location not saved");
  	// Too bad, no localStorage for us
  }
}

function getMapOptions(){
  var mapOptions = {
      // How zoomed in you want the map to start at (always required)
      zoom: 12,

      // Disables the default Google Maps UI components
      disableDefaultUI: true,
      scrollwheel: false,
      draggable: false,

      // How you would like to style the map.
      // This is where you would paste any style found on Snazzy Maps.
      styles: [{
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [{
              "color": "#000000"
          }, {
              "lightness": 17
          }]
      }, {
          "featureType": "landscape",
          "elementType": "geometry",
          "stylers": [{
              "color": "#000000"
          }, {
              "lightness": 20
          }]
      }, {
          "featureType": "road.highway",
          "elementType": "geometry.fill",
          "stylers": [{
              "color": "#000000"
          }, {
              "lightness": 17
          }]
      }, {
          "featureType": "road.highway",
          "elementType": "geometry.stroke",
          "stylers": [{
              "color": "#000000"
          }, {
              "lightness": 29
          }, {
              "weight": 0.2
          }]
      }, {
          "featureType": "road.arterial",
          "elementType": "geometry",
          "stylers": [{
              "color": "#000000"
          }, {
              "lightness": 18
          }]
      }, {
          "featureType": "road.local",
          "elementType": "geometry",
          "stylers": [{
              "color": "#000000"
          }, {
              "lightness": 16
          }]
      }, {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [{
              "color": "#000000"
          }, {
              "lightness": 21
          }]
      }, {
          "elementType": "labels.text.stroke",
          "stylers": [{
              "visibility": "on"
          }, {
              "color": "#000000"
          }, {
              "lightness": 16
          }]
      }, {
          "elementType": "labels.text.fill",
          "stylers": [{
              "saturation": 36
          }, {
              "color": "#000000"
          }, {
              "lightness": 40
          }]
      }, {
          "elementType": "labels.icon",
          "stylers": [{
              "visibility": "off"
          }]
      }, {
          "featureType": "transit",
          "elementType": "geometry",
          "stylers": [{
              "color": "#000000"
          }, {
              "lightness": 19
          }]
      }, {
          "featureType": "administrative",
          "elementType": "geometry.fill",
          "stylers": [{
              "color": "#000000"
          }, {
              "lightness": 20
          }]
      }, {
          "featureType": "administrative",
          "elementType": "geometry.stroke",
          "stylers": [{
              "color": "#000000"
          }, {
              "lightness": 17
          }, {
              "weight": 1.2
          }]
      }]
  };
  return mapOptions;
}
