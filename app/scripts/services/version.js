'use strict';

angular.module('sunnyPasswebappApp')
    .factory('Version', function VersionFactory() {
        return {
            type: 'alpha',
            version: 'v0.0.2'
        };
    });
