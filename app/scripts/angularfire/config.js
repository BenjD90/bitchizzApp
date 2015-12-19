angular.module('firebase.config', [])
  .constant('FBURL', 'https://bitchizz.firebaseio.com')
  .constant('SIMPLE_LOGIN_PROVIDERS', ['facebook'])

  .constant('loginRedirectPath', '/login');
