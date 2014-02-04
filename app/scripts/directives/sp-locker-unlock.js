'use strict';

angular.module('SunnyPass.Webapp')
    .directive('spLockerUnlock', function () {
        return {
            templateUrl: 'views/directives/sp-locker-unlock.html',
            restrict: 'EA',
            controller: function($scope) {
                $scope.unlock = function(password) {
                    if (!password) {
                        $scope.passwordError = true;
                        return;
                    }
                    $scope.locker.unlock(password).then(
                        function resolved() {
                            if ($scope.refreshItems) {
                                $scope.refreshItems();
                            }
                            else {
                                $scope.locked = $scope.locker.isLocked();
                            }
                        },
                        function rejected() {
                            $scope.passwordError = true;
                        }
                    ).
                        finally(function() {
                            // clear password field
                            $scope.unlockPassword = undefined;
                        });
                };
            }
        };
    });
