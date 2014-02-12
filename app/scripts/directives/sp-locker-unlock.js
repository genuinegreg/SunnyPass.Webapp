'use strict';

angular.module('SunnyPass.Webapp')
    .directive('spLockerUnlock', function () {
        return {
            templateUrl: 'views/directives/sp-locker-unlock.html',
            restrict: 'EA',
            scope: {
                spLocker: '=',
                spRedirectToState: '='
            },
            controller: function ($scope) {
                $scope.unlock = function (password) {

                    if (!password) {
                        $scope.passwordError = true;
                        return;
                    }
                    $scope.spLocker.unlock(password).then(
                        function resolved() {
                            $scope.spRedirectToState();
                        },
                        function rejected() {
                            $scope.passwordError = true;
                        }
                    ).
                        finally(function () {
                            // clear password field
                            $scope.unlockPassword = undefined;
                        });
                };
            }
        };
    });
