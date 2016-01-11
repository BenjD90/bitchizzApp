'use strict';

/**
 * @ngdoc function
 * @name bitchizzApp.controller:EventsCtrl
 * @description
 * # EventsCtrl
 * Controller of the bitchizzApp
 */
angular.module('bitchizzApp')
  .controller('EventsCtrl', function ($scope, $log, user, Ref, $firebaseArray, $timeout) {
    var now = new Date();
    var eventTemplate = {
      name: '',
      description: '',
      date: new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes()),
      isOnlyBitchizz: true
    };

    // synchronize a read-only, synchronized array of messages, limit to most recent 100
    $scope.eventsBitchizz = $firebaseObject(Ref.child('events'));

    $scope.event = angular.copy(eventTemplate);


    $scope.createEvent = function () {

      var eventToCreate = {
        createTimestamp: new Date().getTime(),
        comments : []
      };
      angular.extend(eventToCreate, $scope.event);

      eventToCreate.date = new Date(eventToCreate.date).getTime();
      $firebaseArray(Ref.child('events')).$add(eventToCreate).catch(alert);

      $scope.event = {};
    };


    function alert(msg) {
      $scope.err = msg;
      $timeout(function () {
        $scope.err = null;
      }, 5000);
    }
  });
