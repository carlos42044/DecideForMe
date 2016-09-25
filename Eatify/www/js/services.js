angular.module('starter.services', [])


.service('TwitterAPI', function($http) {
  var API = 'http://localhost:8080';
  var self = this;

  self.getTweets = function(username) {
    return $http.get(API + '/tweets/' + username);
  }

  self.getPlaces = function(places) {
    return $http.get("http://ipinfo.io", function(response) {
    console.log(response.city, response.country);
}, "jsonp");
    // return $http.post(API + '/getplaces', {
    //   places: places  
    // });
  }

})
