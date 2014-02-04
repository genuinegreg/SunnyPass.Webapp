//FIXME: write directive sp-locker-unlock.js tests

'use strict';

xdescribe('Directive: spLockerUnlock', function () {

    // load the directive's module
    beforeEach(module('sunnyPasswebappApp'));

    var element,
        scope;

    beforeEach(inject(function ($rootScope) {
        scope = $rootScope.$new();
    }));

    it('should make hidden element visible', inject(function ($compile) {
        element = angular.element('<sp-locker-unlock></sp-locker-unlock>');
        element = $compile(element)(scope);
        expect(element.text()).toBe('this is the spLockerUnlock directive');
    }));
});
