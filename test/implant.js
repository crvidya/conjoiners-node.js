'use strict';

var conjoiners = require('../lib/conjoiners');

exports['values should be accessible on implanted obj'] = function(test) {
    test.expect(2);

    var value = 'implant_value';
    var conjoinerName = 'test_implant';

    var obj = {};

    conjoiners.implant(obj,
            'test/implant.conf.json',
            conjoinerName,
            function (err) {
        if (err) {
            throw err;
        }
        obj.transenlightenment.on('val', function (event) {
            test.equal(event.property, 'val');
            test.done();
        });
        obj.val = value;
        test.equal(obj.val, value);
    });
};

exports['config cannot be found'] = function(test) {
    test.expect(2);

    conjoiners.implant({}, 'nOtEXiTIng.json', 'foobar', function (err) {
        test.ok(err != null);
    }).fail(function (err) {
        test.ok(err != null);
        test.done();
    }).done();
};

exports['conjoiner cannot be found'] = function(test) {
    test.expect(2);

    conjoiners.implant({}, 'implant.conf.json', 'nOtEXiTIng', function (err) {
        test.ok(err != null);
    }).fail(function (err) {
        test.ok(err != null);
        test.done();
    }).done();
};
