'use strict';

angular.module('SunnyPass.Webapp', [
        'ngSanitize',
//        'ngRoute',
//        'ngAnimate',
        'ui.router',
        'SunnyPass.Services'
    ])
    .config(function ($logProvider) {
        $logProvider.debugEnabled(true);
    })
    .config(function ($stateProvider, $urlRouterProvider) {


        var resolve = {
            lockers: function () {
                return ['SunnyPass', function (SunnyPass) {
                    return SunnyPass.list();
                }];
            },
            locker: function () {
                return ['$stateParams', 'SunnyPass', function ($stateParams, SunnyPass) {
                    return SunnyPass.getBySharedSecret($stateParams.sharedSecret);
                }];
            },
            isLockerLocked: function () {
                return ['$stateParams', 'SunnyPass', '$q', function ($stateParams, SunnyPass, $q) {
                    return SunnyPass.getBySharedSecret($stateParams.sharedSecret).
                        then(function (locker) {
                            if (locker.isLocked()) {
                                return $q.reject(new Error('locked'));
                            }
                            return true;
                        }
                    );
                }];
            },
            lockerItems: function () {
                return ['$stateParams', 'SunnyPass', function ($stateParams, SunnyPass) {
                    return SunnyPass.getBySharedSecret($stateParams.sharedSecret).
                        then(function resolvedLocker(locker) {
                            return locker.list();
                        });
                }];
            },
            lockerItem: function () {
                return ['$stateParams', 'SunnyPass', function ($stateParams, SunnyPass) {
                    return SunnyPass.getBySharedSecret($stateParams.sharedSecret).
                        then(function resolvedLocker(locker) {
                            return locker.get($stateParams.itemId);
                        });
                }];
            }
        };


        $urlRouterProvider.otherwise('/');


        $stateProvider
            .state('root', {
                abstract: true,
                templateUrl: 'views/root.html',
                controller: function ($scope, $state, lockers) {
                    $scope.lockers = lockers;
                    $scope.$state = $state;
                },
                resolve: {
                    lockers: resolve.lockers()
                }
            })

            .state('root.dashboard', {
                url: '/',
                templateUrl: 'views/main.html',
                controller: 'DashboardCtrl'
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
            .state('root.locker.unlock', {
                url: '/unlock',
                templateUrl: 'views/locker/unlock.html',
                controller: 'LockerUnlockCtrl'
            })
            .state('root.locker.content', {
                url: '',
                templateUrl: 'views/locker/content.html',
                controller: 'LockerContentCtrl',
                resolve: {
                    items: resolve.lockerItems()
                }
            })
            .state('root.locker.add', {
                url: '/add',
                templateUrl: 'views/locker/add.html',
                controller: 'LockerAddCtrl',
                resolve: {
                    locked: resolve.isLockerLocked()
                }
            })
            .state('root.locker.details', {
                url: '/details',
                templateUrl: 'views/locker/details.html',
                controller: 'LockerDetailsCtrl',
                resolve: {
                    locked: resolve.isLockerLocked()
                }
            })
            .state('root.locker.item', {
                url: '/:itemId',
                templateUrl: 'views/locker/item.html',
                controller: 'LockerItemCtrl',
                resolve: {
                    item: resolve.lockerItem()
                }
            });
    })
;
