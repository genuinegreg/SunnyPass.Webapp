'use strict';

angular.module('SunnyPass.Webapp')
    .factory('Version', function VersionFactory() {
        return {
            type: 'alpha',
            version: 'v0.2.0'
        };
    });
