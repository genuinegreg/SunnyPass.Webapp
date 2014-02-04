'use strict';

angular.module('SunnyPass.Webapp')
    .directive('spShowHideInput', function () {
        return {
            template: '<input type="password" />',
            restrict: 'E',
            replace: true
        };
    });
