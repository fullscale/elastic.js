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

exports.facets = {
  setUp: function (done) {
    done();
  },
  exists: function (test) {
    test.expect(9);

    test.ok(ejs.TermFacet, 'TermFacet');
    test.ok(ejs.DateHistogramFacet, 'DateHistogramFacet');
    test.ok(ejs.GeoDistanceFacet, 'GeoDistanceFacet');
    test.ok(ejs.StatisticalFacet, 'StatisticalFacet');
    test.ok(ejs.TermStatsFacet, 'TermStatsFacet');
    test.ok(ejs.QueryFacet, 'QueryFacet');
    test.ok(ejs.FilterFacet, 'FilterFacet');
    test.ok(ejs.HistogramFacet, 'HistogramFacet');
    test.ok(ejs.RangeFacet, 'RangeFacet');

    test.done();
  },
  TermFacet: function (test) {
    test.expect(8);

    var termFacet = ejs.TermFacet('somename'),
      termFilter = ejs.TermFilter('t1', 'v1'),
      expected,
      doTest = function () {
        test.deepEqual(termFacet.get(), expected);
      };

    expected = {
      somename: {
        terms: {}
      }
    };

    test.ok(termFacet, 'TermFacet exists');
    test.ok(termFacet.get(), 'get() works');
    doTest();

    termFacet.field('thefield');
    expected.somename.terms.field = 'thefield';
    doTest();

    termFacet.size(2);
    expected.somename.terms.size = 2;
    doTest();

    termFacet.order('count');
    expected.somename.terms.order = 'count';
    doTest();

    termFacet.filter(termFilter);
    expected.somename.facet_filter = termFilter.get();
    doTest();

    termFacet.allTerms(false);
    expected.somename.terms.all_terms = false;
    doTest();

    test.done();
  },
  GeoDistanceFacet: function (test) {
    test.expect(10);

    var geoDistanceFacet = ejs.GeoDistanceFacet('somename'),
      termFilter = ejs.TermFilter('t1', 'v1'),
      expected,
      doTest = function () {
        test.deepEqual(geoDistanceFacet.get(), expected);
      };

    expected = {
      somename: {
        'geo_distance': {
          'distance_unit': "mi",
          'ranges': []
        }
      }
    };

    test.ok(geoDistanceFacet, 'geoDistanceFacet exists');
    test.ok(geoDistanceFacet.get(), 'get() works');
    doTest();

    geoDistanceFacet.pointField('location');
    expected.somename.geo_distance['location'] = [0, 0];
    doTest();

    geoDistanceFacet.point(40, - 70);
    expected.somename.geo_distance['location'] = [40, - 70];
    doTest();

    geoDistanceFacet.addUnboundedTo(10);
    expected.somename.geo_distance.ranges.push({
      "to": 10
    });
    doTest();

    geoDistanceFacet.addRange(10, 20);
    expected.somename.geo_distance.ranges.push({
      "from": 10,
      "to": 20
    });
    doTest();

    geoDistanceFacet.addRange(20, 30);
    expected.somename.geo_distance.ranges.push({
      "from": 20,
      "to": 30
    });
    doTest();

    geoDistanceFacet.filter(termFilter);
    expected.somename.facet_filter = termFilter.get();
    doTest();

    geoDistanceFacet.addUnboundedFrom(30);
    expected.somename.geo_distance.ranges.push({
      "from": 30
    });
    doTest();

    test.done();
  },
  StatisticalFacet: function (test) {
    test.expect(7);

    var statisticalFacet = ejs.StatisticalFacet('somename'),
      termFilter = ejs.TermFilter('t1', 'v1'),
      expected,
      doTest = function () {
        test.deepEqual(statisticalFacet.get(), expected);
      };

    expected = {
      somename: {
        'statistical': {}
      }
    };

    test.ok(statisticalFacet, 'statisticalFacet exists');
    test.ok(statisticalFacet.get(), 'get() works');
    doTest();

    statisticalFacet.lang('js');
    expected.somename.statistical.lang = 'js';
    doTest();

    statisticalFacet.script('(_source.x + _source.y) * factor');
    expected.somename.statistical.script = '(_source.x + _source.y) * factor';
    doTest();

    statisticalFacet.filter(termFilter);
    expected.somename.facet_filter = termFilter.get();
    doTest();

    statisticalFacet.params({
      factor: 5
    });
    expected.somename.statistical.params = {
      "factor": 5
    };
    doTest();

    test.done();
  },
  TermStatsFacet: function (test) {
    test.expect(8);

    var termStatsFacet = ejs.TermStatsFacet('somename'),
      termFilter = ejs.TermFilter('t1', 'v1'),
      expected,
      doTest = function () {
        test.deepEqual(termStatsFacet.get(), expected);
      };

    expected = {
      somename: {
        'terms_stats': {}
      }
    };

    test.ok(termStatsFacet, 'termStatsFacet exists');
    test.ok(termStatsFacet.get(), 'get() works');
    doTest();

    termStatsFacet.keyField('product');
    expected.somename.terms_stats.key_field = 'product';
    doTest();

    termStatsFacet.valueField('quantity');
    expected.somename.terms_stats.value_field = 'quantity';
    doTest();

    termStatsFacet.order("total");
    expected.somename.terms_stats.order = "total";
    doTest();

    termStatsFacet.filter(termFilter);
    expected.somename.facet_filter = termFilter.get();
    doTest();

    termStatsFacet.size(5);
    expected.somename.terms_stats.size = 5;
    doTest();

    test.done();
  },
  DateHistogramFacet: function (test) {
    test.expect(7);

    var dateHistogramFacet = ejs.DateHistogramFacet('somename'),
      termFilter = ejs.TermFilter('t1', 'v1'),
      expected,
      doTest = function () {
        test.deepEqual(dateHistogramFacet.get(), expected);
      };

    expected = {
      somename: {
        'date_histogram': {}
      }
    };

    test.ok(dateHistogramFacet, 'dateHistogramFacet exists');
    test.ok(dateHistogramFacet.get(), 'get() works');
    doTest();

    dateHistogramFacet.field('pubdate');
    expected.somename.date_histogram.field = 'pubdate';
    doTest();

    dateHistogramFacet.interval('year');
    expected.somename.date_histogram.interval = 'year';
    doTest();

    dateHistogramFacet.filter(termFilter);
    expected.somename.facet_filter = termFilter.get();
    doTest();

    dateHistogramFacet.timeZone(5);
    expected.somename.date_histogram.time_zone = 5;
    doTest();

    test.done();
  },
  QueryFacet: function (test) {
    test.expect(5);

    var queryFacet = ejs.QueryFacet('somename'),
      termFilter = ejs.TermFilter('t1', 'v1'),
      termQuery = ejs.TermQuery('t2', 'v2'),
      expected,
      doTest = function () {
        test.deepEqual(queryFacet.get(), expected);
      };

    expected = {
      somename: {}
    };

    test.ok(queryFacet, 'QueryFacet exists');
    test.ok(queryFacet.get(), 'get() works');
    doTest();

    queryFacet.query(termQuery);
    expected.somename.query = termQuery.get();
    doTest();

    queryFacet.filter(termFilter);
    expected.somename.facet_filter = termFilter.get();
    doTest();

    test.done();
  },
  FilterFacet: function (test) {
    test.expect(5);

    var filterFacet = ejs.FilterFacet('somename'),
      termFilter1 = ejs.TermFilter('t1', 'v1'),
      termFilter2 = ejs.TermFilter('t2', 'v2'),
      expected,
      doTest = function () {
        test.deepEqual(filterFacet.get(), expected);
      };

    expected = {
      somename: {}
    };

    test.ok(filterFacet, 'FilterFacet exists');
    test.ok(filterFacet.get(), 'get() works');
    doTest();

    filterFacet.filter(termFilter1);
    expected.somename.filter = termFilter1.get();
    doTest();

    filterFacet.facetFilter(termFilter2);
    expected.somename.facet_filter = termFilter2.get();
    doTest();

    test.done();
  },
  HistogramFacet: function (test) {
    test.expect(6);

    var histogramFacet = ejs.HistogramFacet('somename'),
      termFilter = ejs.TermFilter('t1', 'v1'),
      expected,
      doTest = function () {
        test.deepEqual(histogramFacet.get(), expected);
      };

    expected = {
      somename: {
        'histogram': {}
      }
    };

    test.ok(histogramFacet, 'HistogramFacet exists');
    test.ok(histogramFacet.get(), 'get() works');
    doTest();

    histogramFacet.field('price');
    expected.somename.histogram.field = 'price';
    doTest();

    histogramFacet.interval(100);
    expected.somename.histogram.interval = 100;
    doTest();

    histogramFacet.filter(termFilter);
    expected.somename.facet_filter = termFilter.get();
    doTest();

    test.done();
  },
  RangeFacet: function (test) {
    test.expect(9);

    var rangeFacet = ejs.RangeFacet('somename'),
      termFilter = ejs.TermFilter('t1', 'v1'),
      expected,
      doTest = function () {
        test.deepEqual(rangeFacet.get(), expected);
      };

    expected = {
      somename: {
        'range': {
          'ranges': []
        }
      }
    };

    test.ok(rangeFacet, 'RangeFacet exists');
    test.ok(rangeFacet.get(), 'get() works');
    doTest();

    rangeFacet.field('price');
    expected.somename.range.field = 'price';
    doTest();

    rangeFacet.addUnboundedTo(10);
    expected.somename.range.ranges.push({
      "to": 10
    });
    doTest();

    rangeFacet.addRange(10, 20);
    expected.somename.range.ranges.push({
      "from": 10,
      "to": 20
    });
    doTest();

    rangeFacet.addRange(20, 30);
    expected.somename.range.ranges.push({
      "from": 20,
      "to": 30
    });
    doTest();

    rangeFacet.filter(termFilter);
    expected.somename.facet_filter = termFilter.get();
    doTest();

    rangeFacet.addUnboundedFrom(30);
    expected.somename.range.ranges.push({
      "from": 30
    });
    doTest();

    test.done();
  }
};
