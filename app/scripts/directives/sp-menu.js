'use strict';

angular.module('SunnyPass.Webapp')
    .directive('spMenu', function () {
        return {
            templateUrl: 'views/directives/sp-menu.html',
            restrict: 'EA',
            controller: function($scope, $rootScope, SunnyPass, Locker) {
                $scope.refresh = function() {
                    SunnyPass.list().then(
                        function resolved(lockers) {
                            $scope.lockers = lockers;
                        }
                    );
                };

                $scope.lockAll = function() {
                    Locker.lockAll();
                    if ($scope.refresh) {
                        $scope.refresh();
                    }
                    if ($scope.refreshItems) {
                        $scope.refreshItems();
                    }
                };

                $scope.clearSearch = function() {
                    $scope.$root.searchInput = undefined;
                };

//                $scope.$routeParams = $routeParams;

            }
        };
    });
