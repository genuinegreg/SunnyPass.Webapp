'use strict';

describe('Service: Version', function () {

  // load the service's module
  beforeEach(module('sunnyPasswebappApp'));

  // instantiate service
  var Version;
  beforeEach(inject(function (_Version_) {
    Version = _Version_;
  }));

  it('should do something', function () {
    expect(!!Version).toBe(true);
  });

});
