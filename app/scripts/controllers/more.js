'use strict';

angular.module('SunnyPass.Controller')
    .controller('MoreCtrl', function (lockers, $scope, $log, $q, SunnyPass) {


        $scope.$root.lockers = lockers;


        $scope.wipe = function() {
            $scope.wipeInput = '';
            $scope.d = $q.defer();
            $scope.d.promise.then(
                function resolved() {
                    SunnyPass.wipe();
                    $log.debug('MoreCtrl.wipe()');

                    // FIXME: Maybe it's not necessary to check $scope.refresh()
                    // call refresh to update locker list ui
                    if ($scope.refresh) {
                        $log.debug('refresh()');
                        $scope.refresh();
                    }
                });
            $scope.d.promise.finally(
                function () {
                    $scope.d = undefined;
                }
            );


        };


    }
);
