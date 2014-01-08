'use strict';

angular.module('webappApp')
    .service('Lockers', function Lockers($q, Crypto, Keychain) {

        function Locker(secret) {
            var _this = this;
            _this.secret = secret;
            _this.db = new PouchDB(secret.shared);

//            this.db.put({
//                _id: 'youpla',
//                data: Crypto.encrypt(Keychain.getKey(_this.secret.secret), 'password')
//            }, function(err, response) {
//                console.log(err, response);
//            });
        }

        Locker.prototype.unlock = function(key) {
            this.key = key;
        };


        Locker.prototype.lock = function() {
            this.key = undefined;
        };

        Locker.prototype.list = function(cb) {

            cb = cb || function() {};

            var d = $q.defer();

            var _this = this;

            this.db.allDocs({include_docs: true}, function(err, response) {
                console.log(response);
                var map = response.rows.map(function(doc) {
                    return doc.doc;
                });
                console.log(map);
                d.resolve(map);
                cb(undefined, map);
            });

        };

        Locker.prototype.destroy = function(cb) {
            PouchDB.destroy(this.secret.shared, cb);
        };

        Locker.prototype.save = function(site, password, cb) {

            cb = cb || function() {};

            this.db.put({
                _id: site,
                password: password
            }, function (err) {
                cb(err);
            });
        };




        var db = new PouchDB('sunypass');


        this.get = function(sharedSecret, cb) {
            cb = cb || function(){};
            var d = $q.defer();

            console.log('egtLocker');

            db.get(sharedSecret, function(err, locker) {
                if (err) {
                    d.reject(err);
                    cb(err);
                    return;
                }

                var lockerInst = new Locker(locker.secret);

                d.resolve(lockerInst);
                cb(undefined, lockerInst);
            });



//            var locker = new Locker(secret);

            return d.promise;
        };

        this.list = function(cb) {

            cb = cb || function(){};

            var d = $q.defer();

            db.allDocs({include_docs: true}, function(err, res) {
                if (err) {
                    cb(err);
                    d.reject(err);
                    return;
                }


                console.log(res);

                var lockers = res.rows.map(function(row) {
                    return row.doc;
                });


                cb(undefined, lockers);
                d.resolve(lockers);


            });

            return d.promise;
        };

        this.create = function(secret, cb) {
            var d = $q.defer();

            cb = cb || function() {};

            var locker = {
                _id: secret.shared,
                secret: secret
            };

            db.put(locker, function(err, res) {
                if (err) {
                    cb(err);
                    d.reject(err);
                    return;
                }

                cb(undefined, res);
                d.resolve(res);
            });



            return d.promise;
        };

        this.destroy = function(cb) {

            cb = cb || function() {};

            var d = $q.defer();

            PouchDB.destroy('sunypass', function(err) {
                if (err) {
                    d.reject(err);
                    cb(err);
                    return;
                }

                db = new PouchDB('sunypass');

                d.resolve('ok');
                cb();
            } );

            return d.promise;
        };

        this.generateSecret = function(secret) {

            if (!secret) {
                secret = CryptoJS.lib.WordArray.random(256/8).toString(CryptoJS.enc.Hex);
            }
            var shared = CryptoJS.SHA3(this.hex, { outputLength: 256 }).toString(CryptoJS.enc.Hex);

            return {
                secret: secret,
                shared: shared
            };
        };



    });
