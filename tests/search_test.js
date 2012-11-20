/*global require:true */
var ejs = require('../dist/elastic.js');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.test.test.expect(numAssertions)
    test.done()
  Test assertions:
    test.test.test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.test.test.deepEqual(actual, expected, [message])
    test.nottest.test.deepEqual(actual, expected, [message])
    test.test.test.strictEqual(actual, expected, [message])
    test.nottest.test.strictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.search = {
  setUp: function (done) {
    done();
  },
  exists: function (test) {
    test.expect(2);

    test.ok(ejs.Request, 'Request');
    test.ok(ejs.ComputedProperty, 'ComputedProperty');

    test.done();
  },
  Request: function (test) {
    test.expect(14);

    var req = ejs.Request({
      collections: ['index1'],
      types: ['type1']
    }),
      expected;

    expected = {
      size: 10,
      from: 0
    };

    test.deepEqual(req.collections(), ['index1']);
    test.deepEqual(req.types(), ['type1']);

    req.collections([]);
    test.deepEqual(req.collections(), ['_all']);

    req.types([]);
    test.deepEqual(req.types(), []);

    req.collections([]);
    test.deepEqual(req.collections(), []);

    req.collections(['index1', 'index2']);
    test.deepEqual(req.collections(), ['index1', 'index2']);

    req.types(['type1', 'type2']);
    test.deepEqual(req.types(), ['type1', 'type2']);

    req = ejs.Request({});
    test.deepEqual(req.collections(), []);
    test.deepEqual(req.types(), []);

    req = ejs.Request({
      collections: 'index1',
      types: 'type1'
    });
    test.deepEqual(req.collections(), ['index1']);
    test.deepEqual(req.types(), ['type1']);

    req = ejs.Request({
      types: 'type1'
    });
    test.deepEqual(req.collections(), ['_all']);
    test.deepEqual(req.types(), ['type1']);

    test.strictEqual(req.toString(), JSON.stringify(expected));

    test.done();
  }
};
