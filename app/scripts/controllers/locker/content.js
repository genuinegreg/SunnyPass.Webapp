'use strict';

angular.module('SunnyPass.Webapp')
    .controller('LockerContentCtrl', function (
        locker, lockers, // resolved values
        SunnyPass, //SunnyPass services
        $scope, $log // angular services
        ) {

        $log.debug('enter LockerContentCtrl()');

        $scope.$root.lockers = lockers;
        $scope.locker = locker;
        $scope.locked = locker.isLocked();


        $scope.refreshItems = function() {

            $scope.locked = $scope.locker.isLocked();

            // if locker is locked
            if (locker.isLocked()) {
                $scope.locked = locker.isLocked();
                return;
            }

            $scope.locker.list().then(
                function resolved(list) {
                    $log.debug('items list', list);
                    $scope.list = list;
                    $scope.locked = $scope.locker.isLocked();
                },
                undefined,
                function notified() {
                    // if notified while listing locker's items, prompt password
                    $scope.locked = locker.isLocked();
                });
        };


        $scope.deleteItem = function(item) {

            $log.debug('delete :', item._id);
            $scope.locker.deleteById(item._id).then(function success() {
                $scope.refreshItems();
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
