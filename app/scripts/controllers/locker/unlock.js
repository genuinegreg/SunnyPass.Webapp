'use strict';

angular.module('SunnyPass.Webapp')
    .controller('LockerUnlockCtrl', function ($scope, $state, $stateParams) {

        //
        var stateName = $scope.$root.toState || 'root.locker.content';
        angular.extend($stateParams, $scope.$root.toParams || {});


        $scope.redirectToState = function () {
            console.log('redirect to', stateName, $stateParams);
            $state.go(stateName, $stateParams);
        };

        console.log('yo', $scope.redirectToState);


    });
