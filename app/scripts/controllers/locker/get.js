'use strict';

angular.module('webappApp')
    .controller('LockerGetCtrl', function ($scope, $location, $routeParams, Lockers, Keychain) {

        console.log($routeParams.sharedSecret);

        var _this = this;



        $scope.refresh = function() {
            _this.locker.list(function(err, list) {
                console.log('controller', list);
                $scope.list = list;
                $scope.$digest();
            });
        };

        $scope.save = function() {
            _this.locker.save($scope.id, $scope.password, function(err) {
                $scope.refresh();
            });
        };

        $scope.destroy = function() {
            _this.locker.destroy(function() {
                console.log('destroyed !!!');
                $location.path('/');
            });
        };


        Lockers.get($routeParams.sharedSecret, function(err, locker) {
            console.log(err, locker);

            _this.locker = locker;


            var key = Keychain.getKey(locker.secret.secret);

            locker.unlock(key);

            $scope.refresh();



        });

    });
