'use strict';

angular.module('SunnyPass.Webapp')
    .controller('LockerCreateCtrl', function (lockers,$scope, $log, $location, SunnyPass, Crypto) {


        $scope.$root.lockers = lockers;

        $scope.generate = function() {
            $scope.key = Crypto.generateKey();

        };

        $scope.create = function() {

            if ($scope.form.$invalid) {
                return;
            }

            $log.debug('Create locker button pushed', $scope.key, $scope.password1);



            // create a locker and unlock it
            SunnyPass.get($scope.key).then(
                function resolved(locker) {
                    var unlocked = locker.unlock($scope.password1);

                    unlocked.then(
                        function resolved() {
                            $location.path('/locker/get/' + locker.secret.shared);
                        },
                        function rejected(err) {
                            $log.error('$scope.create()... FAILED... unlock rejected', err);
                            alert('Unknown error ! sorry');
                        }
                    );
                }
            );



        };

    });
