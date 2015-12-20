'use strict';

/**
 * @ngdoc function
 * @name bitchizzApp.controller:MenuCtrl
 * @description
 * # MenuCtrl
 * Controller of the bitchizzApp
 */
angular.module('bitchizzApp')
  .controller('MenuCtrl', function ($scope, $location, $log) {
    $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
    };
  });
