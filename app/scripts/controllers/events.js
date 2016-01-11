'use strict';

/**
 * @ngdoc function
 * @name bitchizzApp.controller:EventsCtrl
 * @description
 * # EventsCtrl
 * Controller of the bitchizzApp
 */
angular.module('bitchizzApp')
  .controller('EventsCtrl', function ($scope, $log, user, Ref, $firebaseArray, $firebaseObject) {
    var now = new Date();
    var eventTemplate = {
      name: '',
      description: '',
      date: new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes()),
      isOnlyBitchizz: true
    }

    // synchronize a read-only, synchronized array of messages, limit to most recent 100
    $scope.eventsBitchizz = $firebaseArray(Ref.child('events').limitToLast(100));

    $scope.event = angular.copy(eventTemplate);


    $scope.createEvent = function () {

      var eventToCreate = {
        createTimestamp: new Date().getTime()
      };
      angular.extend(eventToCreate, $scope.event);

      eventToCreate.date = new Date(eventToCreate.date).getTime();
      $scope.eventsBitchizz.$add(eventToCreate).catch(alert);

      $scope.event = {};
    };


    function alert(msg) {
      $scope.err = msg;
      $timeout(function () {
        $scope.err = null;
      }, 5000);
    }
  });
