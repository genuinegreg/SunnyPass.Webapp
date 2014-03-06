'use strict';

angular.module('SunnyPass.Webapp')
    .controller('MoreCtrl', function (lockers, $scope, $state, $log, $q, SunnyPass) {


        $log.debug('enter MoreCtrl');


        $scope.wipe = function() {
            $scope.wipeInput = '';
            $scope.d = $q.defer();
            $scope.d.promise.then(
                function resolved() {
                    SunnyPass.wipe();
                    $log.debug('MoreCtrl.wipe()');

                    // notify change in lockers list
                    $scope.$emit('$lockersListChange');
                });
            $scope.d.promise.finally(
                function () {
                    $scope.d = undefined;
                    $state.go('landing');

                }
            );


        };


    }
);
