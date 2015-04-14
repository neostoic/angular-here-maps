'use strict';

describe('Controller: InstallCtrl', function () {

  // load the controller's module
  beforeEach(module('angularHereMapsApp'));

  var InstallCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    InstallCtrl = $controller('InstallCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
