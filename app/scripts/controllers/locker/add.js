'use strict';

angular.module('SunnyPass.Webapp')
    .controller('LockerAddCtrl', function (
        locker, lockers, // resolved values
        $scope // angular services
        ) {




        $scope.$root.lockers = lockers;
        $scope.locker = locker;
        $scope.locked = locker.isLocked();


    });
