angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, TwitterAPI) {
  $scope.data = {};
  //using the OAuth authorization result get the latest 20 tweets from twitter for the user
  $scope.refreshTimeline = function() {
      TwitterAPI.getTweets('nodejs').then(function(data) {
        console.log(data);
          TwitterAPI.getPlaces(data).then(function(data) {
            console.log(data);
          });
      });
  }
})

.controller('ChatsCtrl', function($scope, Twitter) {
  $scope.$on('$ionicView.enter', function(e) {
    $scope.data = {};
  });

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
