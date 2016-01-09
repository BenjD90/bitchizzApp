'use strict';

/**
 * @ngdoc function
 * @name bitchizzApp.controller:MapCtrl
 * @description
 * # MapCtrl
 * Controller of the bitchizzApp
 */
angular.module('bitchizzApp')
  .controller('MapCtrl', function ($scope, Ref, $firebaseObject) {
    $scope.users = $firebaseObject(Ref.child('users'));

    $scope.users.$loaded().then(function() {
      console.log($scope.users);
    });

    $scope.$watch($scope.getWindowDimensions, function (newValue, oldValue) {
      var dims = $scope.getWindowDimensions();
      $scope.heightMap = 0;
      $scope.heightMap += dims.h;
      $scope.heightMap -= $('.header').outerHeight(true);
      $scope.heightMap -= $('.footer').outerHeight(true);
    }, true);
  });
