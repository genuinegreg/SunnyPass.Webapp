'use strict';

angular.module('SunnyPass.Webapp')
    .controller('LockerCreateCtrl', function ($scope, $log, $state, SunnyPass, Crypto) {


        $log.debug('enter LockerCreateCtrl Controller...');

        $scope.generate = function () {
            $scope.key = Crypto.generateKey();
        };

        $scope.create = function () {

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

                            // notify change in lockers list
                            $scope.$emit('$lockersListChange');

                            $state.go('root.locker.content', {
                                sharedSecret: locker.secret.shared
                            });
                        },
                        function rejected(err) {
                            $log.error('$scope.create()... FAILED... unlock rejected', err);
                            window.alert('Unknown error ! sorry');
                        }
                    );
                }
            );


        };

    });
