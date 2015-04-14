'use strict';

describe('Service: changelog', function () {

  // load the service's module
  beforeEach(module('angularHereMapsApp'));

  // instantiate service
  var changelog;
  beforeEach(inject(function (_changelog_) {
    changelog = _changelog_;
  }));

  it('should do something', function () {
    expect(!!changelog).toBe(true);
  });

});
