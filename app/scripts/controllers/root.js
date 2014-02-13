'use strict';

angular.module('SunnyPass.Webapp')
    .controller('RootCtrl', function ($scope, $state, lockers, SunnyPass) {
        $scope.lockers = lockers;
        $scope.$state = $state;

        $scope.$root.$on('$lockersListChange', function () {
            SunnyPass.list().then(
                function (list) {
                    $scope.lockers = list;
                }
            );
        });
    });
