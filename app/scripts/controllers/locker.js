'use strict';

angular.module('SunnyPass.Webapp')
    .controller('LockerCtrl', function ($scope, $state, lockers, locker) {
        $scope.$root.lockers = lockers;
        $scope.locker = locker;
    });
