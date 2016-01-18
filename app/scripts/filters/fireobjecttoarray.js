'use strict';

/**
 * @ngdoc filter
 * @name bitchizzApp.filter:fireObjectToArray
 * @function
 * @description
 * # fireObjectToArray
 * Filter in the bitchizzApp.
 */
angular.module('bitchizzApp')
  .filter('fireObjectToArray', function () {
    return function (input) {
      //console.log(input);
      var ret = [];

      for(var key in input) {
        if(typeof input[key] === 'object' && key[0] != '$') {
          ret.push(input[key]);
          input[key].idFirebase = key;
        }
      }
      return ret;
    };
  });
