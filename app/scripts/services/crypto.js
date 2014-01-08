'use strict';

/**
 * Crypto module
 * Encrypt and decrypt data using AES.
 */
angular.module('webappApp')
    .service('Crypto', function Crypto() {
        this.encrypt = function(key, data) {
            var encrypted = CryptoJS.AES.encrypt(data, key);
            return encrypted;
        };

        this.decrypt = function(key, data) {
            var decrypted = CryptoJS.AES.decrypt(data, key);
            return decrypted;
        };
    });
