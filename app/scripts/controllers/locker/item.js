'use strict';

angular.module('SunnyPass.Webapp')
    .controller('LockerItemCtrl', function (
        lockers, locker, // resolved values
        $scope, $log, $routeParams) {

        $scope.$root.lockers = lockers;
        $scope.locker = locker;
        $scope.locked = locker.isLocked();

        $log.debug('locker', $scope.locker);


        locker.get($routeParams.itemId).then(
            function resolved(item) {
                $log.debug('resolved', item);
                $scope.item = item;
            },
            function rejected(err) {
                $log.debug('rejected', err);
            }
        );

    });
