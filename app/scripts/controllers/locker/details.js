'use strict';

angular.module('SunnyPass.Webapp')
    .controller('LockerDetailsCtrl', function (locker, // resolved values
                                               Locker, $scope, $q, $log, $state) {

        $scope.locker = locker;
        $scope.locked = locker.isLocked();

        $log.debug('locker metadata', locker.metadata);
        $scope.metadataModel = angular.copy(locker.metadata);

        $scope.saveMetadata = function (meta) {


            var promises = [];

            // if name has been modify => save name
            if ($scope.metadataForm.name.$dirty) {
                promises.push(locker.saveMetadata('NAME', meta.name));
            }

            // if description has been modify => save description
            if ($scope.metadataForm.description.$dirty) {
                promises.push(locker.saveMetadata('DESCRIPTION', meta.description));
            }


            $q.all(promises).then(
                function resolved() {
                    locker.loadMetadata().finally($state.reload);
                    $log.debug('saved');
                },
                function rejected() {
                    $log.debug('rejected');
                }
            );
        };

    });
