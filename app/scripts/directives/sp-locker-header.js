'use strict';

var app = angular.module('SunnyPass.Webapp');

app.directive('spLockerHeader', function () {
    return {
        templateUrl: 'views/directives/sp-locker-header.html',
        restrict: 'E',
        replace: true,
        controller: function ($scope, $state) {
            $scope.lock = function() {
                $scope.locker.lock();
                $state.reload();
            };
        },
        link: function postLink(scope, element, attrs) {
            scope.active = {
                content: attrs.content !== undefined,
                details: attrs.details !== undefined,
                add: attrs.add !== undefined
            };
        }
    };
});