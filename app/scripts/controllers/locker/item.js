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
                $scope.locked = locker.isLocked();
            },
            function rejected(err) {
                $log.debug('rejected', err);
            },
            function notified() {
                $log.debug('route.item notified !!!');
                $scope.locked = locker.isLocked();

            }
        );

    });
