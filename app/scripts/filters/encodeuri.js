'use strict';

/**
 * @ngdoc filter
 * @name bitchizzApp.filter:encodeURI
 * @function
 * @description
 * # encodeURI
 * Filter in the bitchizzApp.
 */
angular.module('bitchizzApp')
  .filter('encodeURI', function () {
    return function (input) {
      return window.encodeURIComponent(input);
    };
  });
