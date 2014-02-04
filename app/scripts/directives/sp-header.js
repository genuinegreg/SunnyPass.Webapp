'use strict';

angular.module('SunnyPass.Webapp')
    .directive('spHeader', function (Version) {
        return {
            templateUrl: 'views/directives/sp-header.html',
            restrict: 'EA',
            link: function postLink(scope) {
                scope.version = Version;
            }
        };
    });
