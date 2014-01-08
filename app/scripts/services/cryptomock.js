'use strict';


/**
 * Mock crypto service. Data are not encrypted
 */
angular.module('webappApp')
    .service('Crypto', function Cryptomock() {
        this.encrypt = function(password, seed, data) {
            return data;
        };

        this.decrypt = function(password, seed, data) {
            return data;
        };
    });
