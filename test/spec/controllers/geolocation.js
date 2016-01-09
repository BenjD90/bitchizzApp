'use strict';

describe('Controller: GeolocationCtrl', function () {

  // load the controller's module
  beforeEach(module('bitchizzApp'));

  var GeolocationCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GeolocationCtrl = $controller('GeolocationCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(GeolocationCtrl.awesomeThings.length).toBe(3);
  });
});
