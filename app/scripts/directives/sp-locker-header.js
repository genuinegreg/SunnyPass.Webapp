'use strict';

var app = angular.module('SunnyPass.Webapp');

app.directive('spLockerHeader', function () {
    return {
        templateUrl: 'views/directives/sp-locker-header.html',
        restrict: 'E',
        replace: true,
        controller: function ($scope, $state, SunnyPass) {
            $scope.lock = function() {
                $scope.locker.lock();
                $state.reload();
            };

            $scope.wipe = function() {
                SunnyPass.wipeLocker($scope.locker.secret).finally(function() {
                    // notify change in lockers list
                    $scope.$emit('$lockersListChange');

                    // and go to dashboard
                    $state.go('root.dashboard');
                });


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