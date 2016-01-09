'use strict';

describe('Directive: date', function () {

  // load the directive's module
  beforeEach(module('bitchizzApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<date></date>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the date directive');
  }));
});
