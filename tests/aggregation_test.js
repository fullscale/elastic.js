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
    test.expect(10);

    test.ok(ejs.GlobalAggregation, 'GlobalAggregation');
    test.ok(ejs.FilterAggregation, 'FilterAggregation');
    test.ok(ejs.TermsAggregation, 'TermsAggregation');
    test.ok(ejs.GeoHashGridAggregation, 'GeoHashGridAggregation');
    test.ok(ejs.HistogramAggregation, 'HistogramAggregation');
    test.ok(ejs.MissingAggregation, 'MissingAggregation');
    test.ok(ejs.NestedAggregation, 'NestedAggregation');
    test.ok(ejs.RangeAggregation, 'RangeAggregation');
    test.ok(ejs.SignificantTermsAggregation, 'SignificantTermsAggregation');
    test.ok(ejs.AvgAggregation, 'AvgAggregation');

    test.done();
  },
  AvgAggregation: function (test) {
    test.expect(11);

    var agg = ejs.AvgAggregation('myagg'),
      ta1 = ejs.TermsAggregation('ta1').field('f1'),
      expected,
      doTest = function () {
        test.deepEqual(agg.toJSON(), expected);
      };

    expected = {
      myagg: {avg: {}}
    };

    test.ok(agg, 'AvgAggregation exists');
    test.ok(agg.toJSON(), 'toJSON() works');
    doTest();

    agg.field('f1');
    expected.myagg.avg.field = 'f1';
    doTest();

    agg.script('s1');
    expected.myagg.avg.script = 's1';
    doTest();

    agg.lang('mvel');
    expected.myagg.avg.lang = 'mvel';
    doTest();

    agg.scriptValuesSorted(false);
    expected.myagg.avg.script_values_sorted = false;
    doTest();

    agg.params({p1: 'v1'});
    expected.myagg.avg.params = {p1: 'v1'};
    doTest();

    agg.agg(ta1);
    expected.myagg.aggs = ta1.toJSON();
    doTest();

    test.strictEqual(agg._type(), 'aggregation');

    test.throws(function () {
      agg.agggregation('invalid');
    }, TypeError);

    test.done();
  },
  SignificantTermsAggregation: function (test) {
    test.expect(18);

    var agg = ejs.SignificantTermsAggregation('myagg'),
      ta1 = ejs.TermsAggregation('ta1').field('f1'),
      expected,
      doTest = function () {
        test.deepEqual(agg.toJSON(), expected);
      };

    expected = {
      myagg: {significant_terms: {}}
    };

    test.ok(agg, 'SignificantTermsAggregation exists');
    test.ok(agg.toJSON(), 'toJSON() works');
    doTest();

    agg.field('f1');
    expected.myagg.significant_terms.field = 'f1';
    doTest();

    agg.format('%Y-%m-%d');
    expected.myagg.significant_terms.format = '%Y-%m-%d';
    doTest();

    agg.include('.+');
    expected.myagg.significant_terms.include = {pattern: '.+'};
    doTest();

    agg.include('.*?', 'DOTALL');
    expected.myagg.significant_terms.include = {pattern: '.*?', flags: 'DOTALL'};
    doTest();

    agg.exclude('.*');
    expected.myagg.significant_terms.exclude = {pattern: '.*'};
    doTest();

    agg.exclude('.*?', 'DOTALL|MULTILINE');
    expected.myagg.significant_terms.exclude = {pattern: '.*?', flags: 'DOTALL|MULTILINE'};
    doTest();

    agg.executionHint('map');
    expected.myagg.significant_terms.execution_hint = 'map';
    doTest();

    agg.executionHint('invalid');
    doTest();

    agg.executionHint('ORDINALS');
    expected.myagg.significant_terms.execution_hint = 'ordinals';
    doTest();

    agg.size(10);
    expected.myagg.significant_terms.size = 10;
    doTest();

    agg.shardSize(100);
    expected.myagg.significant_terms.shard_size = 100;
    doTest();

    agg.minDocCount(2);
    expected.myagg.significant_terms.min_doc_count = 2;
    doTest();

    agg.agg(ta1);
    expected.myagg.aggs = ta1.toJSON();
    doTest();

    test.strictEqual(agg._type(), 'aggregation');

    test.throws(function () {
      agg.agggregation('invalid');
    }, TypeError);

    test.done();
  },
  RangeAggregation: function (test) {
    test.expect(16);

    var agg = ejs.RangeAggregation('myagg'),
      ta1 = ejs.TermsAggregation('ta1').field('f1'),
      expected,
      doTest = function () {
        test.deepEqual(agg.toJSON(), expected);
      };

    expected = {
      myagg: {range: {}}
    };

    test.ok(agg, 'RangeAggregation exists');
    test.ok(agg.toJSON(), 'toJSON() works');
    doTest();

    agg.field('f1');
    expected.myagg.range.field = 'f1';
    doTest();

    agg.script('s1');
    expected.myagg.range.script = 's1';
    doTest();

    agg.lang('mvel');
    expected.myagg.range.lang = 'mvel';
    doTest();

    agg.range(2, 4);
    expected.myagg.range.ranges = [{from: 2, to: 4}];
    doTest();

    agg.range(null, 8, 'eight');
    expected.myagg.range.ranges.push({to: 8, key: 'eight'});
    doTest();

    agg.range(9);
    expected.myagg.range.ranges.push({from: 9});
    doTest();

    agg.range('start', null, 'strfrom');
    expected.myagg.range.ranges.push({from: 'start', key: 'strfrom'});
    doTest();

    agg.keyed(true);
    expected.myagg.range.keyed = true;
    doTest();

    agg.scriptValuesSorted(false);
    expected.myagg.range.script_values_sorted = false;
    doTest();

    agg.params({p1: 'v1'});
    expected.myagg.range.params = {p1: 'v1'};
    doTest();

    agg.agg(ta1);
    expected.myagg.aggs = ta1.toJSON();
    doTest();

    test.strictEqual(agg._type(), 'aggregation');

    test.throws(function () {
      agg.agggregation('invalid');
    }, TypeError);

    test.done();
  },
  NestedAggregation: function (test) {
    test.expect(7);

    var agg = ejs.NestedAggregation('myagg'),
      ta1 = ejs.TermsAggregation('ta1').field('f1'),
      expected,
      doTest = function () {
        test.deepEqual(agg.toJSON(), expected);
      };

    expected = {
      myagg: {nested: {}}
    };

    test.ok(agg, 'NestedAggregation exists');
    test.ok(agg.toJSON(), 'toJSON() works');
    doTest();

    agg.path('f1');
    expected.myagg.nested.path = 'f1';
    doTest();

    agg.agg(ta1);
    expected.myagg.aggs = ta1.toJSON();
    doTest();

    test.strictEqual(agg._type(), 'aggregation');

    test.throws(function () {
      agg.agggregation('invalid');
    }, TypeError);

    test.done();
  },
  MissingAggregation: function (test) {
    test.expect(7);

    var agg = ejs.MissingAggregation('myagg'),
      ta1 = ejs.TermsAggregation('ta1').field('f1'),
      expected,
      doTest = function () {
        test.deepEqual(agg.toJSON(), expected);
      };

    expected = {
      myagg: {missing: {}}
    };

    test.ok(agg, 'MissingAggregation exists');
    test.ok(agg.toJSON(), 'toJSON() works');
    doTest();

    agg.field('f1');
    expected.myagg.missing.field = 'f1';
    doTest();

    agg.agg(ta1);
    expected.myagg.aggs = ta1.toJSON();
    doTest();

    test.strictEqual(agg._type(), 'aggregation');

    test.throws(function () {
      agg.agggregation('invalid');
    }, TypeError);

    test.done();
  },
  HistogramAggregation: function (test) {
    test.expect(17);

    var agg = ejs.HistogramAggregation('myagg'),
      ta1 = ejs.TermsAggregation('ta1').field('f1'),
      expected,
      doTest = function () {
        test.deepEqual(agg.toJSON(), expected);
      };

    expected = {
      myagg: {histogram: {}}
    };

    test.ok(agg, 'HistogramAggregation exists');
    test.ok(agg.toJSON(), 'toJSON() works');
    doTest();

    agg.field('f1');
    expected.myagg.histogram.field = 'f1';
    doTest();

    agg.script('s1');
    expected.myagg.histogram.script = 's1';
    doTest();

    agg.lang('mvel');
    expected.myagg.histogram.lang = 'mvel';
    doTest();

    agg.format('%Y-%m-%d');
    expected.myagg.histogram.format = '%Y-%m-%d';
    doTest();

    agg.interval(10);
    expected.myagg.histogram.interval = 10;
    doTest();

    agg.minDocCount(0);
    expected.myagg.histogram.min_doc_count = 0;
    doTest();

    agg.keyed(true);
    expected.myagg.histogram.keyed = true;
    doTest();

    agg.scriptValuesSorted(false);
    expected.myagg.histogram.script_values_sorted = false;
    doTest();

    agg.params({p1: 'v1'});
    expected.myagg.histogram.params = {p1: 'v1'};
    doTest();

    agg.order('_count', 'asc');
    expected.myagg.histogram.order = {'_count': 'asc'};
    doTest();

    agg.order('_key', 'invalid');
    expected.myagg.histogram.order = {'_key': 'desc'};
    doTest();

    agg.agg(ta1);
    expected.myagg.aggs = ta1.toJSON();
    doTest();

    test.strictEqual(agg._type(), 'aggregation');

    test.throws(function () {
      agg.agggregation('invalid');
    }, TypeError);

    test.done();
  },
  GeoHashGridAggregation: function (test) {
    test.expect(10);

    var agg = ejs.GeoHashGridAggregation('myagg'),
      ta1 = ejs.TermsAggregation('ta1').field('f1'),
      expected,
      doTest = function () {
        test.deepEqual(agg.toJSON(), expected);
      };

    expected = {
      myagg: {geohash_grid: {}}
    };

    test.ok(agg, 'GeoHashGridAggregation exists');
    test.ok(agg.toJSON(), 'toJSON() works');
    doTest();

    agg.field('f1');
    expected.myagg.geohash_grid.field = 'f1';
    doTest();

    agg.precision(6);
    expected.myagg.geohash_grid.precision = 6;
    doTest();

    agg.size(10);
    expected.myagg.geohash_grid.size = 10;
    doTest();

    agg.shardSize(100);
    expected.myagg.geohash_grid.shard_size = 100;
    doTest();

    agg.agg(ta1);
    expected.myagg.aggs = ta1.toJSON();
    doTest();

    test.strictEqual(agg._type(), 'aggregation');

    test.throws(function () {
      agg.agggregation('invalid');
    }, TypeError);

    test.done();
  },
  TermsAggregation: function (test) {
    test.expect(32);

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
