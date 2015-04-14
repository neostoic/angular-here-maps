'use strict';

describe('Controller: ChangelogCtrl', function () {

  // load the controller's module
  beforeEach(module('angularHereMapsApp'));

  var ChangelogCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ChangelogCtrl = $controller('ChangelogCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
