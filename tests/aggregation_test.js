/*global require:true */
'use strict';

var ejs = require('../dist/elastic.js');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.aggregations = {
  setUp: function (done) {
    done();
  },
  exists: function (test) {
    test.expect(3);

    test.ok(ejs.GlobalAggregation, 'GlobalAggregation');
    test.ok(ejs.FilterAggregation, 'FilterAggregation');
    test.ok(ejs.TermsAggregation, 'TermsAggregation');

    test.done();
  },
  TermsAggregation: function (test) {
    test.expect(33);

    var agg = ejs.TermsAggregation('myagg'),
      ta1 = ejs.TermsAggregation('ta1').field('f1'),
      expected,
      doTest = function () {
        test.deepEqual(agg.toJSON(), expected);
      };

    expected = {
      myagg: {terms: {}}
    };

    test.ok(agg, 'TermsAggregation exists');
    test.ok(agg.toJSON(), 'toJSON() works');
    doTest();

    agg.field('f1');
    expected.myagg.terms.field = 'f1';
    doTest();

    agg.script('s1');
    expected.myagg.terms.script = 's1';
    doTest();

    agg.lang('mvel');
    expected.myagg.terms.lang = 'mvel';
    doTest();

    agg.valueType('string');
    expected.myagg.terms.value_type = 'string';
    doTest();

    agg.valueType('invalid');
    doTest();

    agg.valueType('DOUBLE');
    expected.myagg.terms.value_type = 'double';
    doTest();

    agg.valueType('Float');
    expected.myagg.terms.value_type = 'float';
    doTest();

    agg.valueType('long');
    expected.myagg.terms.value_type = 'long';
    doTest();

    agg.valueType('integer');
    expected.myagg.terms.value_type = 'integer';
    doTest();

    agg.valueType('short');
    expected.myagg.terms.value_type = 'short';
    doTest();

    agg.valueType('byte');
    expected.myagg.terms.value_type = 'byte';
    doTest();

    agg.format('%Y-%m-%d');
    expected.myagg.terms.format = '%Y-%m-%d';
    doTest();

    agg.include('.+');
    expected.myagg.terms.include = {pattern: '.+'};
    doTest();

    agg.include('.*?', 'DOTALL');
    expected.myagg.terms.include = {pattern: '.*?', flags: 'DOTALL'};
    doTest();

    agg.exclude('.*');
    expected.myagg.terms.exclude = {pattern: '.*'};
    doTest();

    agg.exclude('.*?', 'DOTALL|MULTILINE');
    expected.myagg.terms.exclude = {pattern: '.*?', flags: 'DOTALL|MULTILINE'};
    doTest();

    agg.executionHint('map');
    expected.myagg.terms.execution_hint = 'map';
    doTest();

    agg.executionHint('invalid');
    doTest();

    agg.executionHint('ORDINALS');
    expected.myagg.terms.execution_hint = 'ordinals';
    doTest();

    agg.scriptValuesUnique(false);
    expected.myagg.terms.script_values_unique = false;
    doTest();

    agg.size(10);
    expected.myagg.terms.size = 10;
    doTest();

    agg.shardSize(100);
    expected.myagg.terms.shard_size = 100;
    doTest();

    agg.minDocCount(2);
    expected.myagg.terms.min_doc_count = 2;
    doTest();

    agg.params({p1: 'v1'});
    expected.myagg.terms.params = {p1: 'v1'};
    doTest();

    agg.order('_count', 'asc');
    expected.myagg.terms.order = {'_count': 'asc'};
    doTest();

    agg.order('_term', 'invalid');
    expected.myagg.terms.order = {'_term': 'desc'};
    doTest();

    agg.agg(ta1);
    expected.myagg.aggs = ta1.toJSON();
    doTest();

    test.strictEqual(agg._type(), 'aggregation');

    test.throws(function () {
      agg.agggregation('invalid');
    }, TypeError);

    test.throws(function () {
      agg.filter('invalid');
    }, TypeError);

    test.done();
  },
  FilterAggregation: function (test) {
    test.expect(9);

    var agg = ejs.FilterAggregation('myagg'),
      tf1 = ejs.TermFilter('t1', 'v1'),
      tf2 = ejs.TermFilter('t2', 'v2'),
      ta1 = ejs.TermsAggregation('ta1').field('f1'),
      expected,
      doTest = function () {
        test.deepEqual(agg.toJSON(), expected);
      };

    expected = {
      myagg: {}
    };

    test.ok(agg, 'FilterAggregation exists');
    test.ok(agg.toJSON(), 'toJSON() works');
    doTest();

    agg.filter(tf1);
    expected.myagg.filter = tf1.toJSON();
    doTest();

    agg.filter(tf2);
    expected.myagg.filter = tf2.toJSON();
    doTest();

    agg.agg(ta1);
    expected.myagg.aggs = ta1.toJSON();
    doTest();

    test.strictEqual(agg._type(), 'aggregation');

    test.throws(function () {
      agg.agggregation('invalid');
    }, TypeError);

    test.throws(function () {
      agg.filter('invalid');
    }, TypeError);

    test.done();
  },
  GlobalAggregation: function (test) {
    test.expect(8);

    var agg = ejs.GlobalAggregation('myagg'),
      ta1 = ejs.TermsAggregation('ta1').field('f1'),
      ta2 = ejs.TermsAggregation('ta2').field('f2'),
      expected,
      doTest = function () {
        test.deepEqual(agg.toJSON(), expected);
      };

    expected = {
      myagg: {
        global: {}
      }
    };

    test.ok(agg, 'GlobalAggregation exists');
    test.ok(agg.toJSON(), 'toJSON() works');
    doTest();

    agg.aggregation(ta1);
    expected.myagg.aggs = ta1.toJSON();
    doTest();

    agg.agg(ta2);
    expected.myagg.aggs.ta2 = ta2.toJSON().ta2;
    doTest();

    test.strictEqual(agg._type(), 'aggregation');

    test.throws(function () {
      agg.agggregation('invalid');
    }, TypeError);

    test.throws(function () {
      agg.agg('invalid');
    }, TypeError);

    test.done();
  }
};
