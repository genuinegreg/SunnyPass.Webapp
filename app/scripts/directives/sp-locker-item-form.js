'use strict';

angular.module('SunnyPass.Webapp')
    .directive('spLockerItemForm', function ($state, $log, $q) {
        return {
            templateUrl: 'views/directives/sp-locker-item-form.html',
            restrict: 'E',
            scope: {
                'spLockerItem': '&',
                'spLocker': '&',
                'spCancelState': '@',
                'spSuccessState': '@',
                'spSubmit': '='
            },
            replace: true,
            controller: function ($scope) {
                // watch for parent scope item change
                $scope.$watch('spLockerItem()', function (value) {
                    $log.debug('spLockerItem updated', value);
                    $scope.item = angular.copy(value);
                });

                /**
                 * Save item with an optional password unlocking the locker
                 * @param item item to save
                 * @param [password] locker password
                 */
                $scope.unlockAndSave = function (item, password) {

                    $log.debug('unlockAndSave()', item, password);

                    $scope.loading = true;

                    function save() {
                        $log.debug('saving...', $scope.spLocker());
                        return $scope.spLocker().save(item);
                    }

                    function unlock() {
                        if (password) {
                            $log.debug('unlocking...');
                            return $scope.spLocker().unlock(password);
                        }
                        else {
                            $log.debug('not unlocking...');
                            var d = $q.defer();
                            d.resolve();
                            return d.promise;
                        }
                    }

                    // unlock and save when resolved
                    unlock().then(
                        save,
                        function unlockRejected() {
                            // display password error if unlock failed
                            $scope.unlockPasswordError = true;
                        }
                    ).then(
                        function saveResolved() {
                            // clear unlock errors
                            $scope.unlockPasswordError = undefined;

                            // redirect on content state
                            $state.go('root.locker.content', {sharedSecret: $scope.spLocker().secret.shared});

                        },
                        function saveRejected() {
                            // set locked flag
                            $scope.locked = true;

                        }
                    ).finally(
                        function () {
                            // finally clear loading state and unlock password
                            $scope.loading = false;
                            $scope.unlockPassword = undefined;
                        }
                    );


                };


            }
        };
    });
