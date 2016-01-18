'use strict';

/**
 * @ngdoc function
 * @name bitchizzApp.controller:EventCtrl
 * @description
 * # EventCtrl
 * Controller of the bitchizzApp
 */
angular.module('bitchizzApp')
  .controller('EventCtrl', function ($scope, $log, user, Ref, $firebaseArray, $firebaseObject, $routeParams, $timeout) {
    var profile = $firebaseObject(Ref.child('users/' + user.uid));

    $scope.edit = false;
    $scope.eventB = undefined;

    $firebaseObject(Ref.child('events/' + $routeParams.idEvent)).$loaded().then(function (data) {
      data.date = new Date(data.date);
      $scope.eventB = data;
    });
    $scope.success = false;


    $scope.editEvent = function () {
      $scope.eventB.date = new Date($scope.eventB.date).getTime();
      $scope.eventB.$save().then(function () {
        $scope.eventB.date = new Date($scope.eventB.date);
        $scope.success = true;
        $timeout(function () {
          $scope.success = false;
        }, 5000);
      });
    };


    $scope.participate = function (answer) {
      if (!$scope.eventB.people) {
        $scope.eventB.people = {};
      }
      if (!$scope.eventB.people[answer]) {
        $scope.eventB.people[answer] = [];
      }

        for (var answerKind in $scope.eventB.people) {
          $scope.eventB.people[answerKind].forEach(function (answer, index) {
            if (answer.uid && answer.uid === user.uid) {
              $scope.eventB.people[answerKind].splice(index,1);
            }
          });
        }


      $scope.eventB.people[answer].push({
        name: profile.name,
        uid: user.uid,
        dateAnswer: Firebase.ServerValue.TIMESTAMP
      });

      $scope.eventB.date = new Date($scope.eventB.date).getTime();
      $scope.eventB.$save().then(function () {
        $scope.eventB.date = new Date($scope.eventB.date);

        $scope.success = true;
        $timeout(function () {
          $scope.success = false;
        }, 5000);
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
