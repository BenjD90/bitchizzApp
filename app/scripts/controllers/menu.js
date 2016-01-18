'use strict';

/**
 * @ngdoc function
 * @name bitchizzApp.controller:MenuCtrl
 * @description
 * # MenuCtrl
 * Controller of the bitchizzApp
 */
angular.module('bitchizzApp')
  .controller('MenuCtrl', function ($scope, $rootScope, $location, $timeout, Ref, $firebaseArray, $firebaseObject, Auth) {
    $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
    };

    $window.ga('send', 'pageview', {page: $location.url()});

    $scope.messages = $firebaseArray(Ref.child('messages').limitToLast(1));

    $scope.messages.$loaded().then(function () {
      $rootScope.newMessage = false;
      $scope.messages.$watch(function (event) {
        if (event.event === 'child_added') {
          var newObject = $firebaseObject(Ref.child('messages/' + event.key));
          newObject.$loaded().then(function (newObject) {
            if (newObject.uid != Auth.$getAuth().uid) {
              console.log('New message !', newObject, event);
              $rootScope.newMessage = true;
            }
          });
        }
      });
    }).catch(alert);
  });
