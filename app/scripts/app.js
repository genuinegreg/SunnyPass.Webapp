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
                return ['SunnyPass', function (SunnyPass) {
                    return SunnyPass.list();
                }];
            }
        };


        $urlRouterProvider.otherwise('/');


        $stateProvider
            .state('root', {
                abstract: true,
                templateUrl: 'views/root.html',
                controller: function($scope, $state) {
                    $scope.$state = $state;
                },
                resolve: {
                    lockers: resolve.lockers()
                }
            })

            .state('root.dashboard', {
                url: '/',
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .state('root.more', {
                url: '/more',
                templateUrl: 'views/more.html',
                controller: 'MoreCtrl'
            })

            .state('root.create', {
                url: '/create',
                templateUrl: 'views/locker/create.html',
                controller: 'LockerCreateCtrl'
            })
            .state('root.locker', {
                url: '/locker/:sharedSecret',
                controller: 'LockerCtrl',
                abstract: true,
                templateUrl: 'views/locker.html',
                resolve: {
                    locker: resolve.locker()
                }
            })
            .state('root.locker.content', {
                url: '',
                templateUrl: 'views/locker/content.html',
                controller: 'LockerContentCtrl'
            })
            .state('root.locker.add', {
                url: '/add',
                templateUrl: 'views/locker/add.html',
                controller: 'LockerAddCtrl'
            })
            .state('root.locker.details', {
                url: '/details',
                templateUrl: 'views/locker/details.html',
                controller: 'LockerDetailsCtrl'
            })
            .state('root.locker.content.item', {
                url: '/:itemId',
                templateUrl: 'views/locker/item.html',
                controller: 'LockerItemCtrl'
            });
    });
