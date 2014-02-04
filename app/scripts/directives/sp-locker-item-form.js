'use strict';

angular.module('SunnyPass.Webapp')
    .directive('spLockerItemForm', function ($location, $log) {
        return {
            templateUrl: 'views/directives/sp-locker-item-form.html',
            restrict: 'E',
            scope: {
                'spLockerItem': '&',
                'spLocker': '&',
                'spCancelUrl': '@',
                'spSuccessUrl': '@',
                'spLockFlag': '='
            },
            replace: true,
            controller: function($scope) {
                // watch for parent scope item change
                $scope.$watch('spLockerItem()', function(value) {
                    $log.debug('spLockerItem updated', value);
                    $scope.item = angular.copy(value);
                });

                // save item
                $scope.save = function(item) {


                    $scope.loading = true;

                    $scope.spLocker().save(
                            angular.copy(item)
                        ).then(
                        function resolved(value) {

                            $log.debug('resolved : item saved', value);
                            $scope.saved = true && $scope.spSuccessUrl;

                            if ($scope.spSuccessUrl) {
                                $location.path($scope.spSuccessUrl);
                            }
                        },
                        function rejected() {
                            window.alert('Unkown error !');
                        },
                        function notified() {
                            $log.warn('notified : locker is locked');
                            $scope.spLockFlag = true;
                        }).
                        finally(function() {
                            $scope.loading = false;
                            $scope.spLockNotification();
                        });
                };



            }
        };
    });
