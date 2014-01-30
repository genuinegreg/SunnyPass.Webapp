'use strict';

angular.module('SunnyPass.Webapp', [
        'ngSanitize',
        'ngRoute',
//        'ngAnimate',
//        'SunnyPass.Controller',
        'SunnyPass.Service'
    ])
    .config(function($logProvider) {
        $logProvider.debugEnabled(true);
    })
    .config(function ($routeProvider) {

        var resolve = {
            locker: function(param) {
                return function($route, SunnyPass) {
                    return SunnyPass.getBySharedSecret($route.current.params[param]);
                };
            },
            lockers: function() {
                return function(SunnyPass) {
                    return SunnyPass.list();
                };
            }
        };


        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl',
                resolve: {
                    lockers: resolve.lockers()
                }
            })
            .when('/more', {
                templateUrl: 'views/more.html',
                controller: 'MoreCtrl',
                resolve: {
                    lockers: resolve.lockers()
                }
            })
            .when('/locker/create', {
                templateUrl: 'views/locker/create.html',
                controller: 'LockerCreateCtrl',
                resolve: {
                    lockers: resolve.lockers()
                }
            })
            .when('/locker/:sharedSecret', {
                templateUrl: 'views/locker/content.html',
                controller: 'LockerContentCtrl',
                resolve: {
                    locker: resolve.locker('sharedSecret'),
                    lockers: resolve.lockers()
                }
            })
            .when('/locker/:sharedSecret/add', {
                templateUrl: 'views/locker/add.html',
                controller: 'LockerAddCtrl',
                resolve: {
                    locker: resolve.locker('sharedSecret'),
                    lockers: resolve.lockers()
                }
            })
            .when('/locker/:sharedSecret/details', {
                templateUrl: 'views/locker/details.html',
                controller: 'LockerDetailsCtrl',
                resolve: {
                    locker: resolve.locker('sharedSecret'),
                    lockers: resolve.lockers()
                }
            })
            .when('/locker/:sharedSecret/item/:itemId', {
                templateUrl: 'views/locker/item.html',
                controller: 'LockerItemCtrl'
            })
            .otherwise({
                redirectTo: '/'
            }
        );
    });
