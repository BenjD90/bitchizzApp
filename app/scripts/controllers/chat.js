'use strict';
/**
 * @ngdoc function
 * @name bitchizzApp.controller:ChatCtrl
 * @description
 * # ChatCtrl
 * A demo of using AngularFire to manage a synchronized list.
 */
angular.module('bitchizzApp')
  .controller('ChatCtrl', function ($rootScope, $scope, $log, user, Ref, $firebaseArray, $firebaseObject, $timeout) {
    var profile = $firebaseObject(Ref.child('users/' + user.uid));

    // synchronize a read-only, synchronized array of messages, limit to most recent 10
    $scope.messages = $firebaseArray(Ref.child('messages').limitToLast(100));

    // jshint ignore:start
    // display any errors
    $scope.messages.$loaded().then(function () {
      //scroll to bottom
      var elmt = jQuery('.messageArea');
      $timeout(function () {
        elmt.scrollTop(elmt.scrollHeight);
      }, 100);

      //reset new message val
      $rootScope.newMessage = false;
    }).catch(alert);



    $scope.$on('refreshSize', function () {
      console.debug('refreshSize');

      var dims = $scope.getWindowDimensions();
      $scope.heightChat = 0;
      $scope.heightChat -= jQuery('.header').outerHeight(true);
      $scope.heightChat -= jQuery('.footer').outerHeight(true);
      $scope.heightChat -= jQuery('div[ng-view]>div>h2').outerHeight(true);
      $scope.heightChat -= jQuery('div[ng-view]>div>.textareaParent').outerHeight(true);
      $scope.heightChat -= jQuery('div[ng-view]>div>p').outerHeight(true);
      $scope.heightChat -= 10; //10px margin-bottom
      $scope.heightChat += dims.h;

      if (!$scope.$$phase) {
        $scope.$apply();
      }
    }, true);
    $scope.$broadcast('refreshSize');
    // jshint ignore:end

    function alert(msg) {
      $scope.err = msg;
      $timeout(function () {
        $scope.err = null;
      }, 5000);
    }

    $scope.onKeyUp = function (event) {
      var textarea = event.target;
      var content = textarea.value;
      if (event.keyCode === 13 && event.shiftKey) {
        event.stopPropagation();
      } else if (event.keyCode === 13) {
        addMessage(content.substring(0, content.length - 1));
        textarea.value = null;
      }
    };

    function addMessage(newMessage) {
      if (newMessage) {
        // push a message to the end of the array
        $scope.messages.$add({
          author: profile.name,
          uid: user.uid,
          timestamp: parseInt(new Date().getTime() / 1000),
          text: newMessage
        }).catch(alert);
      }
    }

    $scope.clearNewMessage = function() {
      $rootScope.newMessage = false;
    }
  });
