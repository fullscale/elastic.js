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
    test.expect(22);

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
    test.ok(ejs.CardinalityAggregation, 'CardinalityAggregation');
    test.ok(ejs.MaxAggregation, 'MaxAggregation');
    test.ok(ejs.MinAggregation, 'MinAggregation');
    test.ok(ejs.PercentilesAggregation, 'PercentilesAggregation');
    test.ok(ejs.StatsAggregation, 'StatsAggregation');
    test.ok(ejs.SumAggregation, 'SumAggregation');
    test.ok(ejs.ValueCountAggregation, 'ValueCountAggregation');
    test.ok(ejs.ExtendedStatsAggregation, 'ExtendedStatsAggregation');
    test.ok(ejs.DateHistogramAggregation, 'DateHistogramAggregation');
    test.ok(ejs.DateRangeAggregation, 'DateRangeAggregation');
    test.ok(ejs.GeoDistanceAggregation, 'GeoDistanceAggregation');
    test.ok(ejs.IPv4RangeAggregation, 'IPv4RangeAggregation');

    test.done();
  },
  ExtendedStatsAggregation: function (test) {
    test.expect(9);

    var agg = ejs.ExtendedStatsAggregation('myagg'),
      ta1 = ejs.TermsAggregation('ta1').field('f1'),
      expected,
      doTest = function () {
        test.deepEqual(agg.toJSON(), expected);
      };

    expected = {
      myagg: {extended_stats: {}}
    };

    test.ok(agg, 'ExtendedStatsAggregation exists');
    test.ok(agg.toJSON(), 'toJSON() works');
    doTest();

    agg.field('f1');
    expected.myagg.extended_stats.field = 'f1';
    doTest();

    agg.script('s1');
    expected.myagg.extended_stats.script = 's1';
    doTest();

    agg.lang('mvel');
    expected.myagg.extended_stats.lang = 'mvel';
    doTest();

    agg.scriptValuesSorted(false);
    expected.myagg.extended_stats.script_values_sorted = false;
    doTest();

    agg.params({p1: 'v1'});
    expected.myagg.extended_stats.params = {p1: 'v1'};
    doTest();

    test.strictEqual(agg._type(), 'aggregation');

    test.done();
  },
  ValueCountAggregation: function (test) {
    test.expect(9);

    var agg = ejs.ValueCountAggregation('myagg'),
      ta1 = ejs.TermsAggregation('ta1').field('f1'),
      expected,
      doTest = function () {
        test.deepEqual(agg.toJSON(), expected);
      };

    expected = {
      myagg: {value_count: {}}
    };

    test.ok(agg, 'ValueCountAggregation exists');
    test.ok(agg.toJSON(), 'toJSON() works');
    doTest();

    agg.field('f1');
    expected.myagg.value_count.field = 'f1';
    doTest();

    agg.script('s1');
    expected.myagg.value_count.script = 's1';
    doTest();

    agg.lang('mvel');
    expected.myagg.value_count.lang = 'mvel';
    doTest();

    agg.scriptValuesUnique(false);
    expected.myagg.value_count.script_values_unique = false;
    doTest();

    agg.params({p1: 'v1'});
    expected.myagg.value_count.params = {p1: 'v1'};
    doTest();

    test.strictEqual(agg._type(), 'aggregation');

    test.done();
  },
  SumAggregation: function (test) {
    test.expect(9);

    var agg = ejs.SumAggregation('myagg'),
      ta1 = ejs.TermsAggregation('ta1').field('f1'),
      expected,
      doTest = function () {
        test.deepEqual(agg.toJSON(), expected);
      };

    expected = {
      myagg: {sum: {}}
    };

    test.ok(agg, 'SumAggregation exists');
    test.ok(agg.toJSON(), 'toJSON() works');
    doTest();

    agg.field('f1');
    expected.myagg.sum.field = 'f1';
    doTest();

    agg.script('s1');
    expected.myagg.sum.script = 's1';
    doTest();

    agg.lang('mvel');
    expected.myagg.sum.lang = 'mvel';
    doTest();

    agg.scriptValuesSorted(false);
    expected.myagg.sum.script_values_sorted = false;
    doTest();

    agg.params({p1: 'v1'});
    expected.myagg.sum.params = {p1: 'v1'};
    doTest();

    test.strictEqual(agg._type(), 'aggregation');

    test.done();
  },
  StatsAggregation: function (test) {
    test.expect(9);

    var agg = ejs.StatsAggregation('myagg'),
      ta1 = ejs.TermsAggregation('ta1').field('f1'),
      expected,
      doTest = function () {
        test.deepEqual(agg.toJSON(), expected);
      };

    expected = {
      myagg: {stats: {}}
    };

    test.ok(agg, 'StatsAggregation exists');
    test.ok(agg.toJSON(), 'toJSON() works');
    doTest();

    agg.field('f1');
    expected.myagg.stats.field = 'f1';
    doTest();

    agg.script('s1');
    expected.myagg.stats.script = 's1';
    doTest();

    agg.lang('mvel');
    expected.myagg.stats.lang = 'mvel';
    doTest();

    agg.scriptValuesSorted(false);
    expected.myagg.stats.script_values_sorted = false;
    doTest();

    agg.params({p1: 'v1'});
    expected.myagg.stats.params = {p1: 'v1'};
    doTest();

    test.strictEqual(agg._type(), 'aggregation');

    test.done();
  },
  PercentilesAggregation: function (test) {
    test.expect(15);

    var agg = ejs.PercentilesAggregation('myagg'),
      ta1 = ejs.TermsAggregation('ta1').field('f1'),
      expected,
      doTest = function () {
        test.deepEqual(agg.toJSON(), expected);
      };

    expected = {
      myagg: {percentiles: {}}
    };

    test.ok(agg, 'PercentilesAggregation exists');
    test.ok(agg.toJSON(), 'toJSON() works');
    doTest();

    agg.field('f1');
    expected.myagg.percentiles.field = 'f1';
    doTest();

    agg.script('s1');
    expected.myagg.percentiles.script = 's1';
    doTest();

    agg.lang('mvel');
    expected.myagg.percentiles.lang = 'mvel';
    doTest();

    agg.scriptValuesSorted(false);
    expected.myagg.percentiles.script_values_sorted = false;
    doTest();

    agg.params({p1: 'v1'});
    expected.myagg.percentiles.params = {p1: 'v1'};
    doTest();

    agg.keyed(true);
    expected.myagg.percentiles.keyed = true;
    doTest();

    agg.percents([95, 99]);
    expected.myagg.percentiles.percents = [95, 99];
    doTest();

    agg.percent(99.9);
    expected.myagg.percentiles.percents.push(99.9);
    doTest();

    agg.percents([98, 99, 99.9]);
    expected.myagg.percentiles.percents = [98, 99, 99.9];
    doTest();

    agg.compression(200);
    expected.myagg.percentiles.compression = 200;
    doTest();

    test.strictEqual(agg._type(), 'aggregation');

    test.throws(function () {
      agg.percents('invalid');
    }, TypeError);

    test.done();
  },
  MinAggregation: function (test) {
    test.expect(9);

    var agg = ejs.MinAggregation('myagg'),
      ta1 = ejs.TermsAggregation('ta1').field('f1'),
      expected,
      doTest = function () {
        test.deepEqual(agg.toJSON(), expected);
      };

    expected = {
      myagg: {min: {}}
    };

    test.ok(agg, 'MinAggregation exists');
    test.ok(agg.toJSON(), 'toJSON() works');
    doTest();

    agg.field('f1');
    expected.myagg.min.field = 'f1';
    doTest();

    agg.script('s1');
    expected.myagg.min.script = 's1';
    doTest();

    agg.lang('mvel');
    expected.myagg.min.lang = 'mvel';
    doTest();

    agg.scriptValuesSorted(false);
    expected.myagg.min.script_values_sorted = false;
    doTest();

    agg.params({p1: 'v1'});
    expected.myagg.min.params = {p1: 'v1'};
    doTest();

    test.strictEqual(agg._type(), 'aggregation');

    test.done();
  },
  MaxAggregation: function (test) {
    test.expect(9);

    var agg = ejs.MaxAggregation('myagg'),
      ta1 = ejs.TermsAggregation('ta1').field('f1'),
      expected,
      doTest = function () {
        test.deepEqual(agg.toJSON(), expected);
      };

    expected = {
      myagg: {max: {}}
    };

    test.ok(agg, 'MaxAggregation exists');
    test.ok(agg.toJSON(), 'toJSON() works');
    doTest();

    agg.field('f1');
    expected.myagg.max.field = 'f1';
    doTest();

    agg.script('s1');
    expected.myagg.max.script = 's1';
    doTest();

    agg.lang('mvel');
    expected.myagg.max.lang = 'mvel';
    doTest();

    agg.scriptValuesSorted(false);
    expected.myagg.max.script_values_sorted = false;
    doTest();

    agg.params({p1: 'v1'});
    expected.myagg.max.params = {p1: 'v1'};
    doTest();

    test.strictEqual(agg._type(), 'aggregation');

    test.done();
  },
  CardinalityAggregation: function (test) {
    test.expect(10);

    var agg = ejs.CardinalityAggregation('myagg'),
      ta1 = ejs.TermsAggregation('ta1').field('f1'),
      expected,
      doTest = function () {
        test.deepEqual(agg.toJSON(), expected);
      };

    expected = {
      myagg: {cardinality: {}}
    };

    test.ok(agg, 'CardinalityAggregation exists');
    test.ok(agg.toJSON(), 'toJSON() works');
    doTest();

    agg.field('f1');
    expected.myagg.cardinality.field = 'f1';
    doTest();

    agg.script('s1');
    expected.myagg.cardinality.script = 's1';
    doTest();

    agg.lang('mvel');
    expected.myagg.cardinality.lang = 'mvel';
    doTest();

    agg.params({p1: 'v1'});
    expected.myagg.cardinality.params = {p1: 'v1'};
    doTest();

    agg.rehash(false);
    expected.myagg.cardinality.rehash = false;
    doTest();

    agg.precisionThreshold(100);
    expected.myagg.cardinality.precision_threshold = 100;
    doTest();

    test.strictEqual(agg._type(), 'aggregation');

    test.done();
  },
  AvgAggregation: function (test) {
    test.expect(9);

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

    test.strictEqual(agg._type(), 'aggregation');

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
  GeoDistanceAggregation: function (test) {
    test.expect(30);

    var agg = ejs.GeoDistanceAggregation('myagg'),
      point1 = ejs.GeoPoint([40, -70]),
      point2 = ejs.GeoPoint([52.3760, 4.894]),
      point3 = ejs.GeoPoint([52.3760, -70]),
      ta1 = ejs.TermsAggregation('ta1').field('f1'),
      expected,
      doTest = function () {
        test.deepEqual(agg.toJSON(), expected);
      };

    expected = {
      myagg: {geo_distance: {}}
    };

    test.ok(agg, 'GeoDistanceAggregation exists');
    test.ok(agg.toJSON(), 'toJSON() works');
    doTest();

    agg.field('location');
    expected.myagg.geo_distance.field = 'location';
    doTest();

    agg.unit('in');
    expected.myagg.geo_distance.unit = 'in';
    doTest();

    agg.unit('INVALID');
    doTest();

    agg.unit('yd');
    expected.myagg.geo_distance.unit = 'yd';
    doTest();

    agg.unit('ft');
    expected.myagg.geo_distance.unit = 'ft';
    doTest();

    agg.unit('km');
    expected.myagg.geo_distance.unit = 'km';
    doTest();

    agg.unit('NM');
    expected.myagg.geo_distance.unit = 'NM';
    doTest();

    agg.unit('mm');
    expected.myagg.geo_distance.unit = 'mm';
    doTest();

    agg.unit('cm');
    expected.myagg.geo_distance.unit = 'cm';
    doTest();

    agg.unit('mi');
    expected.myagg.geo_distance.unit = 'mi';
    doTest();

    agg.unit('m');
    expected.myagg.geo_distance.unit = 'm';
    doTest();

    agg.distanceType('plane');
    expected.myagg.geo_distance.distance_type = 'plane';
    doTest();

    agg.distanceType('INVALID');
    doTest();

    agg.distanceType('arc');
    expected.myagg.geo_distance.distance_type = 'arc';
    doTest();

    agg.distanceType('sloppy_arc');
    expected.myagg.geo_distance.distance_type = 'sloppy_arc';
    doTest();

    agg.distanceType('FACTOR');
    expected.myagg.geo_distance.distance_type = 'factor';
    doTest();

    agg.origin(point1);
    expected.myagg.geo_distance.origin = point1.toJSON();
    doTest();

    agg.point(point2);
    expected.myagg.geo_distance.point = point2.toJSON();
    doTest();

    agg.center(point3);
    expected.myagg.geo_distance.center = point3.toJSON();
    doTest();

    agg.range(2, 4);
    expected.myagg.geo_distance.ranges = [{from: 2, to: 4}];
    doTest();

    agg.range(null, 8, 'eight');
    expected.myagg.geo_distance.ranges.push({to: 8, key: 'eight'});
    doTest();

    agg.range(9);
    expected.myagg.geo_distance.ranges.push({from: 9});
    doTest();

    agg.range('start', null, 'strfrom');
    expected.myagg.geo_distance.ranges.push({from: 'start', key: 'strfrom'});
    doTest();

    agg.keyed(true);
    expected.myagg.geo_distance.keyed = true;
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
  IPv4RangeAggregation: function (test) {
    test.expect(16);

    var agg = ejs.IPv4RangeAggregation('myagg'),
      ta1 = ejs.TermsAggregation('ta1').field('f1'),
      expected,
      doTest = function () {
        test.deepEqual(agg.toJSON(), expected);
      };

    expected = {
      myagg: {ip_range: {}}
    };

    test.ok(agg, 'IPv4RangeAggregation exists');
    test.ok(agg.toJSON(), 'toJSON() works');
    doTest();

    agg.field('f1');
    expected.myagg.ip_range.field = 'f1';
    doTest();

    agg.script('s1');
    expected.myagg.ip_range.script = 's1';
    doTest();

    agg.lang('mvel');
    expected.myagg.ip_range.lang = 'mvel';
    doTest();

    agg.range('10.0.0.5', '10.0.0.6');
    expected.myagg.ip_range.ranges = [{from: '10.0.0.5', to: '10.0.0.6'}];
    doTest();

    agg.range(null, '10.0.0.5', null, 'mykey');
    expected.myagg.ip_range.ranges.push({to: '10.0.0.5', key: 'mykey'});
    doTest();

    agg.range('10.0.0.5');
    expected.myagg.ip_range.ranges.push({from: '10.0.0.5'});
    doTest();

    agg.range(null, null, '10.0.0.0/25', 'usingmask');
    expected.myagg.ip_range.ranges.push({mask: '10.0.0.0/25', key: 'usingmask'});
    doTest();

    agg.keyed(true);
    expected.myagg.ip_range.keyed = true;
    doTest();

    agg.scriptValuesSorted(false);
    expected.myagg.ip_range.script_values_sorted = false;
    doTest();

    agg.params({p1: 'v1'});
    expected.myagg.ip_range.params = {p1: 'v1'};
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
  DateRangeAggregation: function (test) {
    test.expect(17);

    var agg = ejs.DateRangeAggregation('myagg'),
      ta1 = ejs.TermsAggregation('ta1').field('f1'),
      expected,
      doTest = function () {
        test.deepEqual(agg.toJSON(), expected);
      };

    expected = {
      myagg: {date_range: {}}
    };

    test.ok(agg, 'DateRangeAggregation exists');
    test.ok(agg.toJSON(), 'toJSON() works');
    doTest();

    agg.field('f1');
    expected.myagg.date_range.field = 'f1';
    doTest();

    agg.script('s1');
    expected.myagg.date_range.script = 's1';
    doTest();

    agg.lang('mvel');
    expected.myagg.date_range.lang = 'mvel';
    doTest();

    agg.format('%Y-%m-%d');
    expected.myagg.date_range.format = '%Y-%m-%d';
    doTest();

    agg.range('now-10M/M', 'now-10M/M');
    expected.myagg.date_range.ranges = [{from: 'now-10M/M', to: 'now-10M/M'}];
    doTest();

    agg.range(null, 'now-2M/M', 'twomonths');
    expected.myagg.date_range.ranges.push({to: 'now-2M/M', key: 'twomonths'});
    doTest();

    agg.range('now/d-2d/d');
    expected.myagg.date_range.ranges.push({from: 'now/d-2d/d'});
    doTest();

    agg.range('now/d', null, 'today');
    expected.myagg.date_range.ranges.push({from: 'now/d', key: 'today'});
    doTest();

    agg.keyed(true);
    expected.myagg.date_range.keyed = true;
    doTest();

    agg.scriptValuesSorted(false);
    expected.myagg.date_range.script_values_sorted = false;
    doTest();

    agg.params({p1: 'v1'});
    expected.myagg.date_range.params = {p1: 'v1'};
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
  DateHistogramAggregation: function (test) {
    test.expect(26);

    var agg = ejs.DateHistogramAggregation('myagg'),
      ta1 = ejs.TermsAggregation('ta1').field('f1'),
      expected,
      doTest = function () {
        test.deepEqual(agg.toJSON(), expected);
      };

    expected = {
      myagg: {date_histogram: {}}
    };

    test.ok(agg, 'DateHistogramAggregation exists');
    test.ok(agg.toJSON(), 'toJSON() works');
    doTest();

    agg.field('f1');
    expected.myagg.date_histogram.field = 'f1';
    doTest();

    agg.script('s1');
    expected.myagg.date_histogram.script = 's1';
    doTest();

    agg.lang('mvel');
    expected.myagg.date_histogram.lang = 'mvel';
    doTest();

    agg.timeZone('-02:30');
    expected.myagg.date_histogram.time_zone = '-02:30';
    doTest();

    agg.preZone('-02:00');
    expected.myagg.date_histogram.pre_zone = '-02:00';
    doTest();

    agg.postZone(-2);
    expected.myagg.date_histogram.post_zone = -2;
    doTest();

    agg.preOffset('1h');
    expected.myagg.date_histogram.pre_offset = '1h';
    doTest();

    agg.postOffset('1d');
    expected.myagg.date_histogram.post_offset = '1d';
    doTest();

    agg.format('%Y-%m-%d');
    expected.myagg.date_histogram.format = '%Y-%m-%d';
    doTest();

    agg.extendedBounds('now/d-3d', 'now/d');
    expected.myagg.date_histogram.extended_bounds = {min: 'now/d-3d', max: 'now/d'};
    doTest();

    agg.extendedBounds('now/d-3d');
    expected.myagg.date_histogram.extended_bounds = {min: 'now/d-3d'};
    doTest();

    agg.extendedBounds(null, 'now/d');
    expected.myagg.date_histogram.extended_bounds = {max: 'now/d'};
    doTest();

    agg.interval('1d');
    expected.myagg.date_histogram.interval = '1d';
    doTest();

    agg.minDocCount(0);
    expected.myagg.date_histogram.min_doc_count = 0;
    doTest();

    agg.keyed(true);
    expected.myagg.date_histogram.keyed = true;
    doTest();

    agg.scriptValuesSorted(false);
    expected.myagg.date_histogram.script_values_sorted = false;
    doTest();

    agg.preZoneAdjustLargeInterval(true);
    expected.myagg.date_histogram.pre_zone_adjust_large_interval = true;
    doTest();

    agg.params({p1: 'v1'});
    expected.myagg.date_histogram.params = {p1: 'v1'};
    doTest();

    agg.order('_count', 'asc');
    expected.myagg.date_histogram.order = {'_count': 'asc'};
    doTest();

    agg.order('_key', 'invalid');
    expected.myagg.date_histogram.order = {'_key': 'desc'};
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
    test.expect(20);

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

    agg.extendedBounds(0, 100);
    expected.myagg.histogram.extended_bounds = {min: 0, max: 100};
    doTest();

    agg.extendedBounds(0);
    expected.myagg.histogram.extended_bounds = {min: 0};
    doTest();

    agg.extendedBounds(null, 100);
    expected.myagg.histogram.extended_bounds = {max: 100};
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
