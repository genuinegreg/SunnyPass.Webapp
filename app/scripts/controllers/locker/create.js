'use strict';

angular.module('webappApp')
    .controller('LockerCreateCtrl', function ($scope, $location, Lockers, Keychain) {

        $scope.generate = function() {
            $scope.secret = Lockers.generateSecret().secret;
        };

        $scope.create = function() {

            console.log('Creating a new locker', $scope.secret);

            var secret = Lockers.generateSecret($scope.secret);
            console.log(secret, $scope.password1);
            Lockers.create(secret);

            Keychain.saveKey(secret.secret, $scope.password1);

            $location.path('/locker/get/' + secret.shared);

        };

    });
