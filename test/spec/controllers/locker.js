'use strict';

xdescribe('Controller: LockerCtrl', function () {

    // load the controller's module
    beforeEach(module('SunnyPass.webapp'));

    var LockerCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        LockerCtrl = $controller('LockerCtrl', {
            $scope: scope
        });
    }));

    it('should attach a list of awesomeThings to the scope', function () {
        expect(scope.awesomeThings.length).toBe(3);
    });
});
