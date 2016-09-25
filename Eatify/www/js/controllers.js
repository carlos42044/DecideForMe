angular.module('starter.controllers', [])

.controller('DashCtrl', function($state, $rootScope, $scope, TwitterAPI) {
  $scope.$on('$ionicView.enter', function(e) {
    $scope.data = {};
  });
  //using the OAuth authorization result get the latest 20 tweets from twitter for the user
  $scope.getTweets = function() {
    var tweets = '';
    TwitterAPI.getTweets($scope.data.twitterHandle).then(function(res) {
      angular.forEach(res.data, function(value, key) {
        tweets = tweets.concat(value.text, ' ');
      });
      $rootScope.tweets = tweets;
      if(res) {
        $state.go('tab.places');
      }
    });
  }
})

.controller('PlacesCtrl', function($ionicModal, $state, $rootScope, $scope, TwitterAPI, LocationAPI) {
  $scope.$on('$ionicView.enter', function(e) {
    LocationAPI.getLocation().then(function(res) {
      TwitterAPI.getPlaces($rootScope.tweets, res.data.city).then(function(res) {
        $rootScope.businesses = res.data.businesses;
      });
    });
  });

  $scope.showMap = function(coordinate) {
  //modal for new feedback items
  $scope.coordinates = coordinate;
  $ionicModal.fromTemplateUrl('templates/map.html', {
    scope: $scope,
    animation: 'slide-in-up'
  })
  .then(function(modal) {
    $scope.mapCoord = modal;
    $scope.mapCoord.show();
  })
  }
  //hide modal view
  $scope.closeMap = function() {
    $scope.mapCoord.hide();
    $scope.mapCoord.remove();
  }
})

.controller('ShowPlacesCtrl', function($timeout, $scope, $stateParams, $rootScope) {
  
  function startMap (coordinates) {
      var lat = coordinates.latitude;
      var lng = coordinates.longitude;
      var latLng = new google.maps.LatLng(lat, lng);

    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
    //Wait until the map is loaded
    google.maps.event.addListenerOnce($scope.map, 'idle', function(){

      var marker = new google.maps.Marker({
        map: $scope.map,
        animation: google.maps.Animation.DROP,
        position: latLng
      });  

      google.maps.event.addListener(marker, 'click', function () {
        infoWindow.open($scope.map, marker);
      });
    });
    }

  //hide modal view
  $scope.closeMap = function() {
    $scope.mapCoord.hide();
    $scope.mapCoord.remove();
  }
  
  $timeout(function(){
    startMap($scope.coordinates);
  }, 1000);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
