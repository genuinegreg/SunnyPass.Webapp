'use strict';

xdescribe('Controller: LockerLockedCtrl', function () {

    // load the controller's module
    beforeEach(module('SunnyPass.Webapp'));

    var LockerLockedCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        LockerLockedCtrl = $controller('LockerUnlockCtrl', {
            $scope: scope
        });
    }));

    it('should attach a list of awesomeThings to the scope', function () {
        expect(scope.awesomeThings.length).toBe(3);
    });
});
