'use strict';

angular.module('webappApp', [
        'ngSanitize',
        'ngRoute'
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/locker/create', {
                templateUrl: 'views/locker/create.html',
                controller: 'LockerCreateCtrl'
            })
            .when('/locker/get/:sharedSecret', {
                templateUrl: 'views/locker/get.html',
                controller: 'LockerGetCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
