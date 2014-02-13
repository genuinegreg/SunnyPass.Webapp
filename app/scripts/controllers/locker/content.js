'use strict';

angular.module('SunnyPass.Webapp')
    .controller('LockerContentCtrl', function (locker, lockers, items, // resolved values
                                               SunnyPass, //SunnyPass services
                                               $scope, $log, $state // angular services
        ) {

        $log.debug('enter LockerContentCtrl()');

        $scope.$root.lockers = lockers;
        $scope.locker = locker;
        $scope.locked = locker.isLocked();
        $scope.list = items;


        $scope.deleteItem = function (item, index) {

            // remove item from locker
            $log.debug('delete :', item._id);
            $scope.locker.deleteById(item._id).then(function success() {
                $state.reload();
            });

            // remove item from display
            $scope.list.splice(index, 1);
        };

        function copyData(field, item) {
            $scope.locker.unlockData(item).then(function success(data) {
                window.prompt('Copy to clipboard: Ctrl+C, Enter', data[field]);
            });
        }

        $scope.copyPassword = function (item) {
            copyData('password', item);
        };
        $scope.copyLogin = function (item) {
            copyData('login', item);
        };
        $scope.copyNotes = function (item) {
            copyData('notes', item);
        };
    });
