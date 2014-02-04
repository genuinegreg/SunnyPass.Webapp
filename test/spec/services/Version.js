'use strict';

describe('Service: Version', function () {

    // load the service's module
    beforeEach(module('SunnyPass.Webapp'));

    // instantiate service
    var Version;
    beforeEach(inject(function (_Version_) {
        Version = _Version_;
    }));

    it('should do something', function () {
        expect(!!Version).toBe(true);
    });

    it('should define version', function() {
        expect(Version.version).toBeDefined();
    });

    it('should define type to be "stable", "alpha" or "beta"', function() {
        expect(Version.type).toBeDefined();

        var value = ['alpha', 'beta', 'stable'];

        expect(
            value.some(function(value) {
                    return value === Version.type;
                }
            )).toBeTruthy();
    });

});
