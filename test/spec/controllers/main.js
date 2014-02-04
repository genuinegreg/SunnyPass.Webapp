//FIXME: write controller main.js tests

'use strict';

xdescribe('Controller: MainCtrl', function () {

    // load the controller's module
    beforeEach(module('SunnyPass.Webapp'));

    var MainCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        MainCtrl = $controller('MainCtrl', {
            $scope: scope
        });
    }));

    it('should attach a list of awesomeThings to the scope', function () {
        expect(scope.awesomeThings.length).toBe(3);
    });
});
