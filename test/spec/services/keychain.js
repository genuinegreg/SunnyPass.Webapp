'use strict';

describe('Service: Keychain', function () {

  // load the service's module
  beforeEach(module('webappApp'));

  // instantiate service
  var Keychain;
  beforeEach(inject(function (_Keychain_) {
    Keychain = _Keychain_;
  }));

  it('should do something', function () {
    expect(!!Keychain).toBe(true);
  });

});
