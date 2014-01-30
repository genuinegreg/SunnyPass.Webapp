'use strict';

angular.module('SunnyPass.Webapp')
    .directive('spLockerItemForm', function ($location) {
        return {
            templateUrl: 'views/directives/sp-locker-item-form.html',
            restrict: 'E',
            scope: {
                'spLockerItem': '&',
                'spLocker': '&',
                'spCancelUrl': '@',
                'spSuccessUrl': '@',
                'spLockNotification': '&'
            },
            replace: true,
            controller: function($scope) {
                // watch for parent scope item change
                $scope.$watch('spLockerItem()', function(value) {
                    $scope.item = angular.copy(value);
                });

                // save item
                $scope.save = function(item) {

                    console.log(item);

                    $scope.loading = true;

                    $scope.spLocker().save(
                            angular.copy(item)
                        ).then(
                        function resolved(value) {

                            console.log(value);
                            $scope.saved = true && $scope.spSuccessUrl;

                            if ($scope.spSuccessUrl) {
                                $location.path($scope.spSuccessUrl);
                            }
                        },
                        function rejected() {
                            console.log('rejected');
                        },
                        function notified() {
                            console.log('notified');
                        }).
                        finally(function() {
                            $scope.loading = false;
                            $scope.spLockNotification();
                        });
                };



            }
        };
    });
