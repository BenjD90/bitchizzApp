'use strict';

/**
 * @ngdoc filter
 * @name bitchizzApp.filter:futureEvents
 * @function
 * @description
 * # futureEvents
 * Filter in the bitchizzApp.
 */
angular.module('bitchizzApp')
  .filter('futureEvents', function () {
    return function (input) {
      var nowTimeStamp = new Date().getTime();
      var ret = {};

      for (var key in input) {
        if (!key.startsWith('$')) {
          if(input[key].date > nowTimeStamp) {
            ret[key] = input[key];
          }
        }
      }

      return ret;
    };
  });
