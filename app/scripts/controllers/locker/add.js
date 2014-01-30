'use strict';

angular.module('SunnyPass.Webapp')
    .controller('LockerAddCtrl', function (
        locker, lockers, // resolved values
        $scope, $log, $location // angular services
        ) {




        $scope.$root.lockers = lockers;
        $scope.locker = locker;
        $scope.locked = locker.isLocked();


        $scope.add = function(item) {
            // if just on field is not empty, proced
            if (item.url ||
                item.name ||
                item.tags ||
                item.login ||
                item.password ||
                item.notes) {

                var meta = {
                    url: item.url,
                    name: item.name,
                    tags: item.tags ? item.tags.split(',').map(function(tag) {
                        return tag.trim();
                    }) : []

                };

                var data = {
                    password: item.password,
                    login: item.login,
                    notes: item.notes
                };

                locker.save(meta, data).then(
                    function resolved() {
                        $location.path('/locker/content/' + locker.secret.shared);
                    },
                    function rejected() {
                        window.alert('Unknown error !!!');
                    }
                );

            }
        };
    });
