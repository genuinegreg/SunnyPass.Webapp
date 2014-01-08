'use strict';

describe('Controller: LockerCreateCtrl', function () {

  // load the controller's module
  beforeEach(module('webappApp'));

  var LockerCreateCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LockerCreateCtrl = $controller('LockerCreateCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
