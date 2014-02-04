//FIXME: write controller locker/details.js tests

'use strict';

xdescribe('Controller: LockerDetailsCtrl', function () {

    // load the controller's module
    beforeEach(module('sunnyPasswebappApp'));

    var LockerDetailsCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        LockerDetailsCtrl = $controller('LockerDetailsCtrl', {
            $scope: scope
        });
    }));

    it('should attach a list of awesomeThings to the scope', function () {
        expect(scope.awesomeThings.length).toBe(3);
    });
});
