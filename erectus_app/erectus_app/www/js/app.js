// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic', 'ngCordova'])

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})


app.controller('MapController', function($scope, $cordovaGeolocation, $ionicLoading, $ionicPlatform) {

    $ionicPlatform.ready(function() {

        $ionicLoading.show({
            template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Acquiring location!'
        });

        var posOptions = {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 0
        };


        $cordovaGeolocation.getCurrentPosition(posOptions).then(function(position) {
            var lat = position.coords.latitude;
            var long = position.coords.longitude;
console.log(lat);
console.log(long);
            var myLatlng = new google.maps.LatLng(lat, long);

            var mapOptions = {
                center: myLatlng,
                zoom: 16,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };


mapOptions={
    center: myLatlng,
          zoom: 2,
          minZoom: 2,
          zoomControl: true,
    scaleControl: true,
     mapTypeControl: false,
      draggable: true,
      scaleControl: false,
      scrollwheel: true,
      navigationControl: false,
      streetViewControl: false
}
var locations = [
      ['Bondi Beach', -33.890542, 151.274856, 4],
      ['Coogee Beach', -33.923036, 151.259052, 5],
      ['Cronulla Beach', -34.028249, 151.157507, 3],
      ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
      ['Maroubra Beach', -33.950198, 151.259302, 1]
    ];


            var map = new google.maps.Map(document.getElementById("map"), mapOptions);

var marker = new google.maps.Marker({
                position: myLatlng,
                map: map
                  });

            console.log(marker);
 var lat_lng = new Array();
   for (i = 0; i < locations.length; i++) {  
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map,
        icon: 
      })
      /*lat_lng.push(position);*/
    };


 for (i = 0; i < locations.length; i++) {  
      
       var myLatlng = new google.maps.LatLng(locations[i][1], locations[i][2]);
     lat_lng.push(myLatlng);
    };
    

//Initialize the Path Array
        var path = new google.maps.MVCArray();
//Initialize the Direction Service
        var service = new google.maps.DirectionsService();
 
        //Set the Path Stroke Color
        var poly = new google.maps.Polyline({ map: map, strokeColor: 'rgb(239,55,83)' });


 for (var i = 0; i < lat_lng.length; i++) {
            if ((i + 1) < lat_lng.length) {
             var src = lat_lng[i];
                   var des = lat_lng[i + 1];
                path.push(src);
                poly.setPath(path);
                service.route({
                    origin: src,
                    destination: des,
                    travelMode: google.maps.DirectionsTravelMode.DRIVING
                }, function (result, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        for (var i = 0, len = result.routes[0].overview_path.length; i < len; i++) {
                            path.push(result.routes[0].overview_path[i]);
                        }
                    }
                });
            }};





 var usRoadMapType = new google.maps.StyledMapType([
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [
          {saturation: -4},
           {visibility: 'on'},
          {lightness: -67},
          {color:'#6d7988'}
        ]
      }, {
        featureType: 'road.arterial',
        elementType: 'all',
        stylers: [
          {saturation: -4},
           {visibility: 'on'},
          {lightness: -67},
          {color:'#6d7988'}
        ]
      }, {
        featureType: 'road.local',
        elementType: 'all',
        stylers: [
          {saturation: -4},
           {visibility: 'on'},
          {lightness: -67},
          {color:'#6d7988'}
        ]
      }, {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [
          
          {saturation: -4},
           {visibility: 'on'},
          {lightness: -67},
          {color:'#6d7988'}
          
        ]
      }, {
        featureType: 'road.highway',
        elementType: 'labels',
        stylers: [
          {saturation: -4},
           {visibility: 'on'},
          {lightness: -67},
          {color:'#6d7988'}
        ]
      }, {
        featureType: 'administrative.locality',
        elementType: 'labels.text',
        stylers: [
          {saturation: -4},
           {visibility: 'simplified'},
          {lightness: -67},
          {color:'#bdc3c7'},
          {gamma: 0.90}        ]
      },
{
        featureType: 'administrative.province',
        elementType: 'labels.text',
        stylers: [
          {saturation: -4},
           {visibility: 'simplified'},
          {lightness: -67},
          {color:'#bdc3c7'},
          {gamma: 0.90}        ]
      },
      {
        featureType: 'administrative.country',
        elementType: 'labels.text',
        stylers: [
          {saturation: -4},
           {visibility: 'simplified'},
          {lightness: -67},
          {color:'#bdc3c7'},
          {gamma: 0.90}
        ]
      },
       {
        featureType: 'transit.line',
        elementType: 'geometry',
        stylers: [
          {saturation: -4},
           {visibility: 'on'},
          {lightness: -67},
          {color:'#6d7988'}
        ]
      },
      {
        featureType: 'landscape',
        elementType: 'geometry',
        stylers: [
          {hue: '#ff0000'},
          {visibility: 'on'},
           {saturation: -4},
          {lightness: -67},
          {color:'#333333'}
        ]
      }
    ], {name: 'US Road Atlas'});


 map.mapTypes.set('usroadatlas', usRoadMapType);
  map.setMapTypeId('usroadatlas');
            $scope.map = map;
            $ionicLoading.hide();

            




        }, function(err) {
            $ionicLoading.hide();
            console.log(err);
        });
    })
});















