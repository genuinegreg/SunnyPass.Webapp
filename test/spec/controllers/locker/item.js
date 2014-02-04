'use strict';

xdescribe('Controller: LockerItemCtrl', function () {

    // load the controller's module
    beforeEach(module('sunnyPasswebappApp'));

    var LockerItemCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        LockerItemCtrl = $controller('LockerItemCtrl', {
            $scope: scope
        });
    }));

    it('should attach a list of awesomeThings to the scope', function () {
        expect(scope.awesomeThings.length).toBe(3);
    });
});
