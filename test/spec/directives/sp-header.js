'use strict';

xdescribe('Directive: spHeader', function () {

    // load the directive's module
    beforeEach(module('sunnyPasswebappApp'));

    var element,
        scope;

    beforeEach(inject(function ($rootScope) {
        scope = $rootScope.$new();
    }));

    it('should make hidden element visible', inject(function ($compile) {
        element = angular.element('<sp-header></sp-header>');
        element = $compile(element)(scope);
        expect(true).toBe('this is the spHeader directive');
    }));
});
