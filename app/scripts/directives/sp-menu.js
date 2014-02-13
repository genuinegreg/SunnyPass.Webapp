'use strict';

angular.module('SunnyPass.Webapp')
    .directive('spMenu', function () {
        return {
            templateUrl: 'views/directives/sp-menu.html',
            restrict: 'EA',
            scope: {
                spLockers: '='
            },
            controller: function($scope, $state, $rootScope, SunnyPass, Locker) {

                $scope.$state = $state;

                $scope.isActiveLocker = function(state) {
                    return state === $state.params.sharedSecret;
                };

                $scope.lockAll = function() {
                    Locker.lockAll();
                    $state.reload();
                };

                $scope.clearSearch = function() {
                    $scope.$root.searchInput = undefined;
                };

//                $scope.$routeParams = $routeParams;

            }
        };
    });
