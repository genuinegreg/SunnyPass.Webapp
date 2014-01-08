'use strict';

describe('Service: Cryptomock', function () {

  // load the service's module
  beforeEach(module('webappApp'));

  // instantiate service
  var Cryptomock;
  beforeEach(inject(function (_Cryptomock_) {
    Cryptomock = _Cryptomock_;
  }));

  it('should do something', function () {
    expect(!!Cryptomock).toBe(true);
  });

});
