'use strict';

angular.module('SunnyPass.Webapp')
    .controller('LockerCtrl', function ($scope, $state, locker) {
        $scope.locker = locker;
    });
