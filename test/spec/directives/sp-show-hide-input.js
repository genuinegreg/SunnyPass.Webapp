//FIXME: write directive sp-show-hide-input.js tests

'use strict';

xdescribe('Directive: spShowHideInput', function () {

    // load the directive's module
    beforeEach(module('sunnyPasswebappApp'));

    var element,
        scope;

    beforeEach(inject(function ($rootScope) {
        scope = $rootScope.$new();
    }));

    it('should make hidden element visible', inject(function ($compile) {
        element = angular.element('<sp-show-hide-input></sp-show-hide-input>');
        element = $compile(element)(scope);
        expect(element.text()).toBe('this is the spShowHideInput directive');
    }));
});
