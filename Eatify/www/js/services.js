angular.module('starter.services', [])


.service('TwitterAPI', function($http) {
  var API = 'http://localhost:8080';
  var self = this;

  self.getTweets = function(username) {
    return $http.get(API + '/tweets/' + username);
  }

  self.getPlaces = function(places, location) {
    return $http.post(API + '/getplaces', {
      places: '',
      location: location
    });
  }
})

.service('LocationAPI', function($http) {
  var self = this;

  self.getLocation = function() {
    return $http.get("http://ipinfo.io");
  }
})
