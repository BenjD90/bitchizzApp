'use strict';

/**
 * @ngdoc directive
 * @name bitchizzApp.directive:resize
 * @description
 * # resize
 */
angular.module('bitchizzApp')
  .directive('resize', function ($window) {
    return function (scope, element) {
      var w = angular.element($window);
      scope.getWindowDimensions = function () {
        return {
          'h': w.height(),
          'w': w.width()
        };
      };

      w.bind('resize', function () {
        scope.$apply();
      });
    };
  });
