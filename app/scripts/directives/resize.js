'use strict';

/**
 * @ngdoc directive
 * @name bitchizzApp.directive:resize
 * @description
 * # resize
 */
angular.module('bitchizzApp')
  .directive('resize', function ($window, $rootScope) {
    return function (scope) {
      var w = angular.element($window);
      scope.getWindowDimensions = function () {
        return {
          'h': w.height(),
          'w': w.width()
        };
      };

      w.bind('resize', function () {
        scope.$broadcast('refreshSize');
      });

      $('#js-navbar-collapse').on('shown.bs.collapse', function () { /*Bootstrap collapse JS */
        scope.$broadcast('refreshSize');

        $rootScope.$on('$routeChangeSuccess', function () { /*AngularJS $route */
          /* Bootstrap collapse JS */
          $('#js-navbar-collapse').collapse('hide');
        });
      });

      $('#js-navbar-collapse').on('hidden.bs.collapse', function () {
        scope.$broadcast('refreshSize');
      });

      scope.$broadcast('refreshSize');
    };
  });
