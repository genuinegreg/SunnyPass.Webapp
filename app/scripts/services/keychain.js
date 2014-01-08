'use strict';

/**
 * Basic implementation of keychain.
 * Key persist until next refresh
 */
angular.module('webappApp')
    .service('Keychain', function Keychain() {
        var keychain = {};

        this.getKey = function(secret) {
            return keychain[secret];
        };

        this.saveKey = function(secret, password) {
            console.time('PBKDF2');
            keychain[secret] = CryptoJS.PBKDF2(password, secret, { keySize: 512/32, iterations: 200 });
            console.timeEnd('PBKDF2');
            console.log('key:', this.getKey(secret).toString(CryptoJS.enc.Hex));
            return this.getKey(secret);
        };
    });
