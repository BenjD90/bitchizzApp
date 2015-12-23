'use strict';
/**
 * @ngdoc function
 * @name bitchizzApp.controller:ChatCtrl
 * @description
 * # ChatCtrl
 * A demo of using AngularFire to manage a synchronized list.
 */
angular.module('bitchizzApp')
  .controller('ChatCtrl', function ($scope, user, Ref, $firebaseArray, $firebaseObject, $timeout) {
    var profile = $firebaseObject(Ref.child('users/' + user.uid));

    // synchronize a read-only, synchronized array of messages, limit to most recent 10
    $scope.messages = $firebaseArray(Ref.child('messages').limitToLast(100));

    // display any errors
    $scope.messages.$loaded().then(function() {
      //scroll to bottom
      var elmt = $('.messageArea');
      $timeout(function() {
        elmt.scrollTop(elmt.scrollHeight);
      },100);
    }).catch(alert);

    // provide a method for adding a message
    $scope.addMessage = function (newMessage) {
      if (newMessage) {
        // push a message to the end of the array
        $scope.messages.$add({
          author: profile.name,
          timestamp: parseInt(new Date().getTime() / 1000),
          text: newMessage
        }).catch(alert);
      }
    };

    $scope.$watch($scope.getWindowDimensions, function (newValue, oldValue) {
      var dims = $scope.getWindowDimensions();
      $scope.heightChat = 0;
      $scope.heightChat -= $('.header').outerHeight(true);
      $scope.heightChat -= $('.footer').outerHeight(true);
      $scope.heightChat -= $('div[ng-view]>h2').outerHeight(true);
      $scope.heightChat -= $('div[ng-view]>form').outerHeight(true);
      $scope.heightChat -= $('div[ng-view]>p').outerHeight(true);
      $scope.heightChat += dims.h;
    }, true);

    function alert(msg) {
      $scope.err = msg;
      $timeout(function () {
        $scope.err = null;
      }, 5000);
    }
  });
