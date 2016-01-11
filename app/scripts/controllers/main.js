'use strict';

/**
 * @ngdoc function
 * @name bitchizzApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bitchizzApp
 */
angular.module('bitchizzApp')
  .controller('MainCtrl', function ($scope, Auth) {
    if (Auth.$getAuth()) {
      $scope.isConnected = true;
    } else {
      $scope.isConnected = false;
    }

  });
