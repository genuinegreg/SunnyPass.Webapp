'use strict';

angular.module('SunnyPass.Webapp')
    .controller('LockerItemCtrl', function (item, // resolved values
                                            $scope, $log) {
        $log.debug('item loaded', item);
        $scope.item = item;


    });
