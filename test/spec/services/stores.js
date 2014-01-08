'use strict';

describe('Service: Stores', function () {

  // load the service's module
  beforeEach(module('webappApp'));

  // instantiate service
  var Stores;
  beforeEach(inject(function (_Stores_) {
    Stores = _Stores_;
  }));

  it('should do something', function () {
    expect(!!Stores).toBe(true);
  });

});
