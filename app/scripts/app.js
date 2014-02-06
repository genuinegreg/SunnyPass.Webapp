'use strict';

angular.module('SunnyPass.Webapp', [
        'ngSanitize',
        'ngRoute',
//        'ngAnimate',
        'ui.router',
        'SunnyPass.Services'
    ])
    .config(function ($logProvider) {
        $logProvider.debugEnabled(true);
    })
    .config(function ($stateProvider, $urlRouterProvider) {

        var resolve = {
            locker: function () {
                return ['$stateParams', 'SunnyPass', function ($stateParams, SunnyPass) {
                    return SunnyPass.getBySharedSecret($stateParams.sharedSecret);
                }];
            },
            lockers: function () {
                return ['SunnPass', function (SunnyPass) {
                    return SunnyPass.list();
                }];
            }
        };


        $urlRouterProvider.otherwise('/');


        $stateProvider
            .state('dashboard', {
                url: '/',
                templateUrl: 'views/main.html',
                controller: 'MainCtrl',
                abstract: true,
                resolve: {
                    lockers: resolve.lockers()
                }
            })
            .state('more', {
                url: '/more',
                templateUrl: 'views/more.html',
                controller: 'MoreCtrl',
                resolve: {
                    lockers: resolve.lockers()
                }
            })

            .state('create', {
                url: '/create',
                templateUrl: 'views/locker/create.html',
                controller: 'LockerCreateCtrl',
                resolve: {
                    lockers: resolve.lockers()
                }
            })
            .state('locker', {
                url: '/locker/:sharedSecret',
                controller: 'LockerCtrl',
                abstract: true,
                templateUrl: 'views/locker.html',
                resolve: {
                    locker: resolve.locker(),
                    lockers: resolve.lockers()
                }
            })
            .state('locker.content', {
                url: '/',
                templateUrl: 'views/locker/content.html',
                controller: 'LockerContentCtrl'
            })
            .state('locker.add', {
                url: '/add',
                templateUrl: 'views/locker/add.html',
                controller: 'LockerAddCtrl'
            })
            .state('locker.details', {
                url: '/details',
                templateUrl: 'views/locker/details.html',
                controller: 'LockerDetailsCtrl'
            })
            .state('locker.item', {
                url: '/:itemId',
                templateUrl: 'views/locker/item.html',
                controller: 'LockerItemCtrl'
            });
    });
