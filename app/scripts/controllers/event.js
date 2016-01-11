'use strict';

/**
 * @ngdoc function
 * @name bitchizzApp.controller:EventCtrl
 * @description
 * # EventCtrl
 * Controller of the bitchizzApp
 */
angular.module('bitchizzApp')
  .controller('EventCtrl', function ($scope, $log, user, Ref, $firebaseArray, $firebaseObject, $routeParams) {
    var profile = $firebaseObject(Ref.child('users/' + user.uid));

    $scope.eventB = undefined;
    $firebaseObject(Ref.child('events/' + $routeParams.idEvent)).$loaded().then(function (data) {
      data.date = new Date(data.date);
      $scope.eventB = data;
    });


    $scope.editEvent = function () {
      $scope.eventB.date = new Date($scope.eventB.date).getTime();
      $scope.eventB.$save().then(function () {
        $scope.eventB.date = new Date($scope.eventB.date);
      });
    };

    $scope.onKeyUp = function (event) {
      var textarea = event.target;
      var content = textarea.value;
      if (event.keyCode === 13 && event.shiftKey) {
        event.stopPropagation();
      } else if (event.keyCode === 13) {
        addMessage(content.substring(0, content.length - 1));
        textarea.value = null;
      }
    };

    function addMessage(newMessage) {
      if (newMessage) {
        var newComment = {
          author: profile.name,
          timestamp: parseInt(new Date().getTime() / 1000),
          text: newMessage
        };

        if ($scope.eventB.comments) {
          // push a message to the end of the array
          $scope.eventB.comments.push(newComment);
        } else {
          $scope.eventB.comments = [newComment];
        }
        $scope.editEvent();


      }
    }
  });
