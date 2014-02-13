'use strict';

angular.module('SunnyPass.Webapp')
    .controller('RoutesCtrl', function ($rootScope, $state) {


        $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {

            // going to root.locker.* && locked error => redirect to root.locker.unlock state
            if (toState.name.match(/root\.locker\..*/) && error.message === 'locked') {

                // save destination state in order to redirect there on unlock
                $rootScope.toState = toState.name || 'root.locker.content';
                $rootScope.toParams = toParams;

                $state.go('root.locker.unlock', {
                    sharedSecret: toParams.sharedSecret
                });
            }
        });
    });
