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

    $scope.$watch($scope.getWindowDimensions, function () {
      var dims = $scope.getWindowDimensions();
      $scope.heightMap = 0;
      $scope.heightMap += dims.h;
      // jshint ignore:start
      $scope.heightMap -= jQuery('.header').outerHeight(true);
      $scope.heightMap -= jQuery('.footer').outerHeight(true);
      // jshint ignore:end

    }, true);
  });
