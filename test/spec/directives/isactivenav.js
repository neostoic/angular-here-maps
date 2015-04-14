'use strict';

describe('Directive: isActiveNav', function () {

  // load the directive's module
  beforeEach(module('angularHereMapsApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<is-active-nav></is-active-nav>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the isActiveNav directive');
  }));
});
