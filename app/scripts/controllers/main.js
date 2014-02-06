'use strict';

angular.module('SunnyPass.Webapp')
    .controller('MainCtrl', function (lockers, $scope) {

        $scope.$root.lockers = lockers;

        console.log('enter MainCtrl');

//        $scope.refresh = function() {
//
//            var results = [];
//
//            var list = SunnyPass.list();
//
//            for (var sharedKey in list) {
//
//                var secretKey = list[sharedKey];
//                var secretKeyDisplay
//                    = secretKey.substring(0,4) +
//                    new Array(secretKey.length-7).join('#') +
//                    secretKey.substring(secretKey.length-4);
//
//                results.push(
//                    {
//                        sharedKey: sharedKey,
//                        secretKey: secretKey,
//                        secretKeyDisplay: secretKeyDisplay
//                    }
//                );
//            }
//
////            if (results.length < 1) {
////                $location.path('/locker/create');
////                return;
////            }
////            if (results.length === 1) {
////                $location.path('/locker/get/' + results[0].sharedKey);
////                return;
////            }
//
//            $scope.lockers = results;
//
//        };

//        $scope.refresh();
    });