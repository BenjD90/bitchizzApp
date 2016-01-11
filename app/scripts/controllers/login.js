'use strict';
/**
 * @ngdoc function
 * @name bitchizzApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Manages authentication to any active providers.
 */
angular.module('bitchizzApp')
  .controller('LoginCtrl', function ($scope, Auth, $location, Ref, $firebaseObject) {
    $scope.oauthLogin = function (provider) {
      $scope.err = null;
      Auth.$authWithOAuthPopup(provider, {rememberMe: true}).then(redirect, showError);
    };

    function redirect(auth) {
      var uid = auth.uid;
      var facebookObj = auth.facebook;
      // jshint ignore:start
      var name = facebookObj.cachedUserProfile.first_name + ' ' + facebookObj.cachedUserProfile.last_name[0];
      // jshint ignore:end

      var profile = $firebaseObject(Ref.child('users/' + uid));

      profile.name = name;
      profile.profileImageURL = facebookObj.profileImageURL;

      profile.$save();
      //profile.set();

      $location.path('/account');
    }

    function showError(err) {
      $scope.err = err;
    }


  });
