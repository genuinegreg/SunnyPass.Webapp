'use strict';

angular.module('SunnyPass.Webapp')
    .controller('LandingCtrl', function ($scope, lockers, $state, Crypto, SunnyPass, $log) {


        if (lockers && lockers.length > 0) {
            $state.go('root.locker.content', {sharedSecret: lockers[0].secret.shared});
        }

        $scope.randomSecret = function () {
            $scope.safeSecret = Crypto.generateKey();
        };
        $scope.randomSecret();



        $scope.cancel = function() {
            $scope.randomSecret();
            $scope.safePassword = undefined;
            $scope.action = undefined;
        };

        $scope.create = function() {
            $log.debug('create safe', $scope.safeSecret, $scope.safePassword);
            // create a locker and unlock it
            SunnyPass.get($scope.safeSecret).then(
                function resolved(locker) {
                    var unlocked = locker.unlock($scope.safePassword);

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
