'use strict';

angular.module('webappApp')
    .controller('MainCtrl', function ($scope, Lockers) {

        var _this = this;

        $scope.lockerName = 'test';

        $scope.generate = function() {
            _this.secret = Lockers.generateSecret($scope.lockerName);
            console.log(_this.secret.secret);
            $scope.secretHex = _this.secret.secret;
        };

        $scope.create = function() {

            if (!_this.secret) {
                console.err('Error');
            }

            Lockers.create(_this.secret);
        };

        $scope.refresh = function() {
            Lockers.list(function(err, lockers) {
                if(err) {
                    console.err('Error');
                }

                console.log(lockers);
                $scope.lockers = lockers;
                $scope.$digest();
            });
        };

        $scope.destroy = function() {
            Lockers.destroy();
        };



        $scope.generate();
        $scope.refresh();
    });