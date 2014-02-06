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

    it('should define a semver version number', function() {
        expect(Version.version).toBeDefined();
        expect(Version.version).toMatch(/\d+\.\d+\.\d+/);
    });

    it('should define type to be "stable", "alpha" or "beta"', function() {
        expect(Version.type).toBeDefined();
        expect(Version.type).toMatch(/alpha|beta|stable/);
    });

});
