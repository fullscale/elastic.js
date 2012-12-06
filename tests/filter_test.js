/*global require:true */
'use strict';

var ejs = require('../dist/elastic.js');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.test.expect(numAssertions)
    test.done()
  Test assertions:
    test.test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.test.deepEqual(actual, expected, [message])
    test.nottest.deepEqual(actual, expected, [message])
    test.test.strictEqual(actual, expected, [message])
    test.nottest.strictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.filters = {
  setUp: function (done) {
    done();
  },
  exists: function (test) {
    test.expect(25);

    test.ok(ejs.TermsFilter, 'TermsFilter');
    test.ok(ejs.NestedFilter, 'NestedFilter');
    test.ok(ejs.ScriptFilter, 'ScriptFilter');
    test.ok(ejs.RangeFilter, 'RangeFilter');
    test.ok(ejs.QueryFilter, 'QueryFilter');
    test.ok(ejs.MatchAllFilter, 'MatchAllFilter');
    test.ok(ejs.HasParentFilter, 'HasParentFilter');
    test.ok(ejs.HasChildFilter, 'HasChildFilter');
    test.ok(ejs.LimitFilter, 'LimitFilter');
    test.ok(ejs.IdsFilter, 'IdsFilter');
    test.ok(ejs.BoolFilter, 'BoolFilter');
    test.ok(ejs.GeoShapeFilter, 'GeoShapeFilter');
    test.ok(ejs.TermFilter, 'TermFilter');
    test.ok(ejs.TypeFilter, 'TypeFilter');
    test.ok(ejs.NotFilter, 'NotFilter');
    test.ok(ejs.AndFilter, 'AndFilter');
    test.ok(ejs.NumericRangeFilter, 'NumericRangeFilter');
    test.ok(ejs.GeoPolygonFilter, 'GeoPolygonFilter');
    test.ok(ejs.GeoBboxFilter, 'GeoBboxFilter');
    test.ok(ejs.GeoDistanceFilter, 'GeoDistanceFilter');
    test.ok(ejs.GeoDistanceRangeFilter, 'GeoDistanceRangeFilter');
    test.ok(ejs.ExistsFilter, 'ExistsFilter');
    test.ok(ejs.PrefixFilter, 'PrefixFilter');
    test.ok(ejs.MissingFilter, 'MissingFilter');
    test.ok(ejs.OrFilter, 'OrFilter');

    test.done();
  },
  TermsFilter: function (test) {
    test.expect(18);

    var termsFilter = ejs.TermsFilter('f1', ['t1', 't2']),
      expected,
      doTest = function () {
        test.deepEqual(termsFilter.get(), expected);
      };

    expected = {
      terms: {
        f1: ['t1', 't2']
      }
    };

    test.ok(termsFilter, 'TermsFilter exists');
    test.ok(termsFilter.get(), 'get() works');
    doTest();

    termsFilter.field('f2');
    expected = {
      terms: {
        f2: ['t1', 't2']
      }
    };
    doTest();
    
    termsFilter.terms('t3');
    expected.terms.f2.push('t3');
    doTest();
    
    termsFilter.terms(['t4']);
    expected.terms.f2 = ['t4'];
    doTest();
    
    termsFilter.execution('plain');
    expected.terms.execution = 'plain';
    doTest();
    
    termsFilter.execution('INVALID');
    doTest();
    
    termsFilter.execution('AND');
    expected.terms.execution = 'and';
    doTest();
    
    termsFilter.execution('and_NOCACHE');
    expected.terms.execution = 'and_nocache';
    doTest();
    
    termsFilter.execution('or');
    expected.terms.execution = 'or';
    doTest();
    
    termsFilter.execution('or_nocache');
    expected.terms.execution = 'or_nocache';
    doTest();
    
    termsFilter.execution('BOOL');
    expected.terms.execution = 'bool';
    doTest();
    
    termsFilter.execution('BOOL_nocache');
    expected.terms.execution = 'bool_nocache';
    doTest();
    
    termsFilter.name('filter_name');
    expected.terms._name = 'filter_name';
    doTest();
    
    termsFilter.cache(true);
    expected.terms._cache = true;
    doTest();
    
    termsFilter.cacheKey('filter_cache_key');
    expected.terms._cache_key = 'filter_cache_key';
    doTest();
    
    test.strictEqual(termsFilter.toString(), JSON.stringify(expected));

    test.done();
  },
  NestedFilter: function (test) {
    test.expect(12);

    var termQuery = ejs.TermQuery('tq1', 'v1'),
      termFilter = ejs.TermFilter('tf1', 'v1'),
      nestedFilter = ejs.NestedFilter('root'),
      expected,
      doTest = function () {
        test.deepEqual(nestedFilter.get(), expected);
      };

    expected = {
      nested: {
        path: 'root'
      }
    };

    test.ok(nestedFilter, 'NestedFilter exists');
    test.ok(nestedFilter.get(), 'get() works');
    doTest();

    nestedFilter.path('new.root');
    expected.nested.path = 'new.root';
    doTest();
    
    nestedFilter.query(termQuery);
    expected.nested.query = termQuery.get();
    doTest();
    
    nestedFilter.filter(termFilter);
    expected.nested.filter = termFilter.get();
    doTest();
    
    nestedFilter.scope('my_scope');
    expected.nested._scope = 'my_scope';
    doTest();
    
    nestedFilter.boost(2.2);
    expected.nested.boost = 2.2;
    doTest();
    
    nestedFilter.name('filter_name');
    expected.nested._name = 'filter_name';
    doTest();
    
    nestedFilter.cache(true);
    expected.nested._cache = true;
    doTest();
    
    nestedFilter.cacheKey('filter_cache_key');
    expected.nested._cache_key = 'filter_cache_key';
    doTest();
    
    test.strictEqual(nestedFilter.toString(), JSON.stringify(expected));

    test.done();
  },
  ScriptFilter: function (test) {
    test.expect(10);

    var scriptFilter = ejs.ScriptFilter('the script'),
      expected,
      doTest = function () {
        test.deepEqual(scriptFilter.get(), expected);
      };

    expected = {
      script: {
        script: 'the script'
      }
    };

    test.ok(scriptFilter, 'ScriptFilter exists');
    test.ok(scriptFilter.get(), 'get() works');
    doTest();

    scriptFilter.params({param1: 1});
    expected.script.params = {param1: 1};
    doTest();
    
    scriptFilter.params({param1: 2, param2: 3});
    expected.script.params = {param1: 2, param2: 3};
    doTest();
    
    scriptFilter.lang('python');
    expected.script.lang = 'python';
    doTest();
    
    scriptFilter.name('script_filter');
    expected.script._name = 'script_filter';
    doTest();
    
    scriptFilter.cache(true);
    expected.script._cache = true;
    doTest();
    
    scriptFilter.cacheKey('script_filter_key');
    expected.script._cache_key = 'script_filter_key';
    doTest();
    
    test.strictEqual(scriptFilter.toString(), JSON.stringify(expected));

    test.done();
  },
  RangeFilter: function (test) {
    test.expect(16);

    var rangeFilter = ejs.RangeFilter('f1'),
      expected,
      doTest = function () {
        test.deepEqual(rangeFilter.get(), expected);
      };

    expected = {
      range: {
        f1: {}
      }
    };

    test.ok(rangeFilter, 'RangeFilter exists');
    test.ok(rangeFilter.get(), 'get() works');
    doTest();
    
    rangeFilter.from(1);
    expected.range.f1.from = 1;
    doTest();
    
    rangeFilter.field('f2');
    expected = {
      range: {
        f2: {
          from: 1
        }
      }
    };
    doTest();
    
    rangeFilter.to(3);
    expected.range.f2.to = 3;
    doTest();
    
    rangeFilter.includeLower(false);
    expected.range.f2.include_lower = false;
    doTest();
    
    rangeFilter.includeUpper(true);
    expected.range.f2.include_upper = true;
    doTest();
    
    rangeFilter.gt(4);
    expected.range.f2.gt = 4;
    doTest();
    
    rangeFilter.gte(4);
    expected.range.f2.gte = 4;
    doTest();
    
    rangeFilter.lt(6);
    expected.range.f2.lt = 6;
    doTest();
    
    rangeFilter.lte(6);
    expected.range.f2.lte = 6;
    doTest();
    
    rangeFilter.name('range_filter');
    expected.range._name = 'range_filter';
    doTest();
    
    rangeFilter.cache(true);
    expected.range._cache = true;
    doTest();
    
    rangeFilter.cacheKey('range_filter_key');
    expected.range._cache_key = 'range_filter_key';
    doTest();
    
    test.strictEqual(rangeFilter.toString(), JSON.stringify(expected));

    test.done();
  },
  QueryFilter: function (test) {
    test.expect(8);

    var termQuery = ejs.TermQuery('t1', 'v1'),
      termQuery2 = ejs.TermQuery('t2', 'v2'),
      queryFilter = ejs.QueryFilter(termQuery),
      expected,
      doTest = function () {
        test.deepEqual(queryFilter.get(), expected);
      };

    expected = {
      fquery: {
        query: termQuery.get()
      }
    };

    test.ok(queryFilter, 'QueryFilter exists');
    test.ok(queryFilter.get(), 'get() works');
    doTest();
    
    queryFilter.query(termQuery2);
    expected.fquery.query = termQuery2.get();
    doTest();
    
    queryFilter.name('fquery');
    expected.fquery._name = 'fquery';
    doTest();
    
    queryFilter.cache(true);
    expected.fquery._cache = true;
    doTest();
    
    queryFilter.cacheKey('fquery_cached');
    expected.fquery._cache_key = 'fquery_cached';
    doTest();
    
    test.strictEqual(queryFilter.toString(), JSON.stringify(expected));

    test.done();
  },
  MatchAllFilter: function (test) {
    test.expect(4);

    var matchAllFilter = ejs.MatchAllFilter(),
      expected,
      doTest = function () {
        test.deepEqual(matchAllFilter.get(), expected);
      };

    expected = {
      match_all: {}
    };

    test.ok(matchAllFilter, 'MatchAllFilter exists');
    test.ok(matchAllFilter.get(), 'get() works');
    doTest();

    test.strictEqual(matchAllFilter.toString(), JSON.stringify(expected));

    test.done();
  },
  HasParentFilter: function (test) {
    test.expect(8);

    var termFilter = ejs.TermFilter('t1', 'v1'),
      termFilter2 = ejs.TermFilter('t2', 'v2'),
      hasParentFilter = ejs.HasParentFilter(termFilter, 't1'),
      expected,
      doTest = function () {
        test.deepEqual(hasParentFilter.get(), expected);
      };

    expected = {
      has_parent: {
        query: termFilter.get(),
        parent_type: 't1'
      }
    };

    test.ok(hasParentFilter, 'HasParentFilter exists');
    test.ok(hasParentFilter.get(), 'get() works');
    doTest();
    
    hasParentFilter.query(termFilter2);
    expected.has_parent.query = termFilter2.get();
    doTest();
    
    hasParentFilter.parentType('t2');
    expected.has_parent.parent_type = 't2';
    doTest();
    
    hasParentFilter.scope('my_scope');
    expected.has_parent._scope = 'my_scope';
    doTest();
    
    hasParentFilter.name('has_parent');
    expected.has_parent._name = 'has_parent';
    doTest();
    
    test.strictEqual(hasParentFilter.toString(), JSON.stringify(expected));

    test.done();
  },
  HasChildFilter: function (test) {
    test.expect(8);

    var termFilter = ejs.TermFilter('t1', 'v1'),
      termFilter2 = ejs.TermFilter('t2', 'v2'),
      hasChildFilter = ejs.HasChildFilter(termFilter, 't1'),
      expected,
      doTest = function () {
        test.deepEqual(hasChildFilter.get(), expected);
      };

    expected = {
      has_child: {
        query: termFilter.get(),
        type: 't1'
      }
    };

    test.ok(hasChildFilter, 'HasChildFilter exists');
    test.ok(hasChildFilter.get(), 'get() works');
    doTest();
    
    hasChildFilter.query(termFilter2);
    expected.has_child.query = termFilter2.get();
    doTest();
    
    hasChildFilter.type('t2');
    expected.has_child.type = 't2';
    doTest();
    
    hasChildFilter.scope('my_scope');
    expected.has_child._scope = 'my_scope';
    doTest();
    
    hasChildFilter.name('haschild');
    expected.has_child._name = 'haschild';
    doTest();
    
    test.strictEqual(hasChildFilter.toString(), JSON.stringify(expected));

    test.done();
  },
  LimitFilter: function (test) {
    test.expect(5);

    var limitFilter = ejs.LimitFilter(100),
      expected,
      doTest = function () {
        test.deepEqual(limitFilter.get(), expected);
      };

    expected = {
      limit: {
        value: 100
      }
    };

    test.ok(limitFilter, 'LimitFilter exists');
    test.ok(limitFilter.get(), 'get() works');
    doTest();
    
    limitFilter.value(1000);
    expected.limit.value = 1000;
    doTest();

    test.strictEqual(limitFilter.toString(), JSON.stringify(expected));

    test.done();
  },
  IdsFilter: function (test) {
    test.expect(11);

    var idsFilter = ejs.IdsFilter('id1'),
      expected,
      doTest = function () {
        test.deepEqual(idsFilter.get(), expected);
      };

    expected = {
      ids: {
        values: ['id1']
      }
    };

    test.ok(idsFilter, 'IdsFilter exists');
    test.ok(idsFilter.get(), 'get() works');
    doTest();
    
    idsFilter = ejs.IdsFilter(['id2', 'id3']);
    expected.ids.values = ['id2', 'id3'];
    doTest();
    
    idsFilter.values('id4');
    expected.ids.values.push('id4');
    doTest();
    
    idsFilter.values(['id5', 'id6']);
    expected.ids.values = ['id5', 'id6'];
    doTest();
    
    idsFilter.type('type1');
    expected.ids.type = ['type1'];
    doTest();
    
    idsFilter.type('type2');
    expected.ids.type.push('type2');
    doTest();
    
    idsFilter.type(['type3', 'type4']);
    expected.ids.type = ['type3', 'type4'];
    doTest();
    
    idsFilter.name('idsfilter');
    expected.ids._name = 'idsfilter';
    doTest();
    
    test.strictEqual(idsFilter.toString(), JSON.stringify(expected));

    test.done();
  },
  BoolFilter: function (test) {
    test.expect(14);

    var termFilter = ejs.TermFilter('t1', 'v1'),
      termFilter2 = ejs.TermFilter('t2', 'v2'),
      termFilter3 = ejs.TermFilter('t3', 'v3'),
      termFilter4 = ejs.TermFilter('t4', 'v4'),
      boolFilter = ejs.BoolFilter(),
      expected,
      doTest = function () {
        test.deepEqual(boolFilter.get(), expected);
      };

    expected = {
      bool: {}
    };

    test.ok(boolFilter, 'BoolFilter exists');
    test.ok(boolFilter.get(), 'get() works');
    doTest();

    boolFilter.must(termFilter);
    expected.bool.must = [termFilter.get()];
    doTest();

    boolFilter.mustNot(termFilter2);
    expected.bool.must_not = [termFilter2.get()];
    doTest();

    boolFilter.should(termFilter3);
    expected.bool.should = [termFilter3.get()];
    doTest();

    boolFilter.should(termFilter4);
    expected.bool.should.push(termFilter4.get());
    doTest();

    boolFilter.name('boolfilter');
    expected.bool._name = 'boolfilter';
    doTest();
    
    boolFilter.cache(true);
    expected.bool._cache = true;
    doTest();
    
    boolFilter.cacheKey('testkey');
    expected.bool._cache_key = 'testkey';
    doTest();
    
    test.strictEqual(boolFilter.toString(), JSON.stringify(expected));

    test.throws(function () {
      boolFilter.must('junk');
    }, TypeError);
    
    test.throws(function () {
      boolFilter.mustNot('junk');
    }, TypeError);
    
    test.throws(function () {
      boolFilter.should('junk');
    }, TypeError);
    
    test.done();
  },
  GeoShapeFilter: function (test) {
    test.expect(16);

    var geoShapeFilter = ejs.GeoShapeFilter('f1'),
      shape1 = ejs.Shape('envelope', [[-45.0, 45.0], [45.0, -45.0]]),
      shape2 = ejs.Shape('polygon', [[-180.0, 10.0], [20.0, 90.0], 
        [180.0, -5.0], [-30.0, -90.0]]),
      iShape1 = ejs.IndexedShape('countries', 'New Zealand'),
      iShape2 = ejs.IndexedShape('state', 'CA')
        .index('states')
        .shapeFieldName('stateShape'),
      expected,
      doTest = function () {
        test.deepEqual(geoShapeFilter.get(), expected);
      };

    expected = {
      geo_shape: {
        f1: {}
      }
    };

    test.ok(geoShapeFilter, 'GeoShapeFilter exists');
    test.ok(geoShapeFilter.get(), 'get() works');
    doTest();

    geoShapeFilter.shape(shape1);
    expected.geo_shape.f1.shape = shape1.get();
    doTest();
    
    geoShapeFilter.field('f2');
    expected = {
      geo_shape: {
        f2: {
          shape: shape1.get()
        }
      }
    };
    doTest();
    
    geoShapeFilter.shape(shape2);
    expected.geo_shape.f2.shape = shape2.get();
    doTest();
    
    geoShapeFilter.relation('intersects');
    expected.geo_shape.f2.relation = 'intersects';
    doTest();
    
    geoShapeFilter.relation('INVALID');
    doTest();
    
    geoShapeFilter.relation('DisJoint');
    expected.geo_shape.f2.relation = 'disjoint';
    doTest();
    
    geoShapeFilter.relation('WITHIN');
    expected.geo_shape.f2.relation = 'within';
    doTest();
    
    geoShapeFilter.indexedShape(iShape1);
    delete expected.geo_shape.f2.shape;
    expected.geo_shape.f2.indexed_shape = iShape1.get();
    doTest();
    
    geoShapeFilter.indexedShape(iShape2);
    expected.geo_shape.f2.indexed_shape = iShape2.get();
    doTest();
    
    
    geoShapeFilter.cache(true);
    expected.geo_shape._cache = true;
    doTest();
    
    geoShapeFilter.name('geofiltername');
    expected.geo_shape._name = 'geofiltername';
    doTest();
    
    geoShapeFilter.cacheKey('test_key');
    expected.geo_shape._cache_key = 'test_key';
    doTest();
    
    test.strictEqual(geoShapeFilter.toString(), JSON.stringify(expected));
    
    test.done();
  },
  TermFilter: function (test) {
    test.expect(6);

    var termFilter = ejs.TermFilter('t1', 'v1'),
      expected,
      doTest = function () {
        test.deepEqual(termFilter.get(), expected);
      };

    expected = {
      term: {
        t1: 'v1'
      }
    };

    test.ok(termFilter, 'TermFilter exists');
    test.ok(termFilter.get(), 'get() works');
    test.strictEqual(termFilter.key(), 't1');
    test.strictEqual(termFilter.value(), 'v1');
    doTest();

    test.strictEqual(termFilter.toString(), JSON.stringify(expected));

    test.done();
  },
  TypeFilter: function (test) {
    test.expect(5);

    var typeFilter = ejs.TypeFilter('type1'),
      expected,
      doTest = function () {
        test.deepEqual(typeFilter.get(), expected);
      };

    expected = {
      type: {
        value: 'type1'
      }
    };

    test.ok(typeFilter, 'TypeFilter exists');
    test.ok(typeFilter.get(), 'get() works');
    doTest();

    typeFilter.type('type2');
    expected.type.value = 'type2';
    doTest();

    test.strictEqual(typeFilter.toString(), JSON.stringify(expected));

    test.done();
  },
  GeoPolygonFilter: function (test) {
    test.expect(4);

    var geoPolygonFilter = ejs.GeoPolygonFilter('location').points([
      [-122.396480, 37.7819288],
      [-122.396181, 37.7817289]
    ]),
      expected,
      doTest = function () {
        test.deepEqual(geoPolygonFilter.get(), expected);
      };

    expected = {
      geo_polygon: {
        'location': {
          "points": [
            [-122.396480, 37.7819288],
            [-122.396181, 37.7817289]
          ]
        }
      }
    };

    test.ok(geoPolygonFilter, 'GeoPolygonFilter exists');
    test.ok(geoPolygonFilter.get(), 'get() works');
    doTest();

    test.strictEqual(geoPolygonFilter.toString(), JSON.stringify(expected));

    test.done();
  },
  GeoBboxFilter: function (test) {
    test.expect(14);

    var geoBboxFilter = ejs.GeoBboxFilter('location'),
      expected,
      doTest = function () {
        test.deepEqual(geoBboxFilter.get(), expected);
      };

    expected = {
      geo_bounding_box: {
        'location': {
        }
      }
    };

    test.ok(geoBboxFilter, 'GeoBboxFilter exists');
    test.ok(geoBboxFilter.get(), 'get() works');
    doTest();

    geoBboxFilter.topLeft(37.7819288, -122.396480);
    expected.geo_bounding_box.location.top_left = [-122.396480, 37.7819288];
    doTest(); 
    
    geoBboxFilter.bottomRight(37.7817289, -122.396181);
    expected.geo_bounding_box.location.bottom_right = [-122.396181, 37.7817289];
    doTest();
    
    geoBboxFilter.type('memory');
    expected.geo_bounding_box.type = 'memory';
    doTest();
    
    geoBboxFilter.type('INVALID');
    doTest();
    
    geoBboxFilter.type('Indexed');
    expected.geo_bounding_box.type = 'indexed';
    doTest();
    
    geoBboxFilter.field('location2');
    expected = {
      geo_bounding_box: {
        type: 'indexed',
        location2: {
          top_left: [-122.396480, 37.7819288],
          bottom_right: [-122.396181, 37.7817289]
        }
      }
    };
    doTest();
    
    geoBboxFilter.normalize(true);
    expected.geo_bounding_box.normalize = true;
    doTest();
    
    geoBboxFilter.name('filter_name');
    expected.geo_bounding_box._name = 'filter_name';
    doTest();
    
    geoBboxFilter.cache(true);
    expected.geo_bounding_box._cache = true;
    doTest();
    
    geoBboxFilter.cacheKey('filter_cache_key');
    expected.geo_bounding_box._cache_key = 'filter_cache_key';
    doTest();
    
    test.strictEqual(geoBboxFilter.toString(), JSON.stringify(expected));
    
    test.done();
  },
  GeoDistanceFilter: function (test) {
    test.expect(21);

    var geoDistanceFilter = ejs.GeoDistanceFilter('location'),
      expected,
      doTest = function () {
        test.deepEqual(geoDistanceFilter.get(), expected);
      };

    expected = {
      geo_distance: {
        location: {}
      }
    };
    
    test.ok(geoDistanceFilter, 'GeoDistanceFilter exists');
    test.ok(geoDistanceFilter.get(), 'get() works');
    doTest();

    geoDistanceFilter.distance(10);
    expected.geo_distance.distance = 10;
    doTest();
    
    geoDistanceFilter.point(37.7819288, -122.396480),
    expected.geo_distance.location.lat = 37.7819288;
    expected.geo_distance.location.lon = -122.396480;
    doTest();
    
    geoDistanceFilter.field('location2');
    expected = {
      geo_distance: {
        distance: 10,
        location2: {
          lat: 37.7819288,
          lon: -122.396480
        }
      }
    };
    doTest();
    
    geoDistanceFilter.unit('mi');
    expected.geo_distance.unit = 'mi';
    doTest();
    
    geoDistanceFilter.unit('INVALID');
    doTest();
    
    geoDistanceFilter.unit('Km');
    expected.geo_distance.unit = 'km';
    doTest();
    
    geoDistanceFilter.distanceType('arc');
    expected.geo_distance.distance_type = 'arc';
    doTest();
    
    geoDistanceFilter.distanceType('INVALID');
    doTest();
    
    geoDistanceFilter.distanceType('Plane');
    expected.geo_distance.distance_type = 'plane';
    doTest();
    
    geoDistanceFilter.normalize(true);
    expected.geo_distance.normalize = true;
    doTest();
    
    geoDistanceFilter.optimizeBbox('memory');
    expected.geo_distance.optimize_bbox = 'memory';
    doTest();
    
    geoDistanceFilter.optimizeBbox('INVALID');
    doTest();
    
    geoDistanceFilter.optimizeBbox('Indexed');
    expected.geo_distance.optimize_bbox = 'indexed';
    doTest();
    
    geoDistanceFilter.optimizeBbox('none');
    expected.geo_distance.optimize_bbox = 'none';
    doTest();
    
    geoDistanceFilter.name('filter_name');
    expected.geo_distance._name = 'filter_name';
    doTest();
    
    geoDistanceFilter.cache(true);
    expected.geo_distance._cache = true;
    doTest();
    
    geoDistanceFilter.cacheKey('filter_cache_key');
    expected.geo_distance._cache_key = 'filter_cache_key';
    doTest();
    
    test.strictEqual(geoDistanceFilter.toString(), JSON.stringify(expected));

    test.done();
  },
  GeoDistanceRangeFilter: function (test) {
    test.expect(4);

    var geoDistanceRangeFilter = ejs.GeoDistanceRangeFilter('location')
      .from(10)
      .to(20)
      .point(-122.396480, 37.7819288),
      expected,
      doTest = function () {
        test.deepEqual(geoDistanceRangeFilter.get(), expected);
      };

    expected = {
      geo_distance_range: {
        "distance_unit": "mi",
        "from": 10,
        "to": 20,
        "location": [-122.396480, 37.7819288]
      }
    };

    test.ok(geoDistanceRangeFilter, 'GeoDistanceFilter exists');
    test.ok(geoDistanceRangeFilter.get(), 'get() works');
    doTest();

    test.strictEqual(geoDistanceRangeFilter.toString(), JSON.stringify(expected));

    test.done();
  },
  NotFilter: function (test) {
    test.expect(5);

    var termFilter1 = ejs.TermFilter('t1', 'v1'),
      termFilter2 = ejs.TermFilter('t2', 'v2'),
      notFilter = ejs.NotFilter(termFilter1),
      expected,
      doTest = function () {
        test.deepEqual(notFilter.get(), expected);
      };

    expected = {
      not: termFilter1.get()
    };

    test.ok(notFilter, 'NotFilter exists');
    test.ok(notFilter.get(), 'get() works');
    doTest();

    notFilter.filter(termFilter2);
    expected.not = termFilter2.get();
    doTest();

    test.strictEqual(notFilter.toString(), JSON.stringify(expected));

    test.done();
  },
  AndFilter: function (test) {
    test.expect(13);

    var termFilter1 = ejs.TermFilter('t1', 'v1'),
      termFilter2 = ejs.TermFilter('t2', 'v2'),
      termFilter3 = ejs.TermFilter('t3', 'v3'),
      termFilter4 = ejs.TermFilter('t4', 'v4'),
      andFilter = ejs.AndFilter(termFilter1),
      expected,
      doTest = function () {
        test.deepEqual(andFilter.get(), expected);
      };

    expected = {
      and: {
        filters: [termFilter1.get()]
      }
    };

    test.ok(andFilter, 'AndFilter exists');
    test.ok(andFilter.get(), 'get() works');
    doTest();

    andFilter.filters(termFilter2);
    expected.and.filters.push(termFilter2.get());
    doTest();

    andFilter.filters([termFilter3, termFilter4]);
    expected.and.filters = [termFilter3.get(), termFilter4.get()];
    doTest();
    
    andFilter.name('filter_name');
    expected.and._name = 'filter_name';
    doTest();
    
    andFilter.cache(true);
    expected.and._cache = true;
    doTest();
    
    andFilter.cacheKey('filter_cache_key');
    expected.and._cache_key = 'filter_cache_key';
    doTest();
    
    test.strictEqual(andFilter.toString(), JSON.stringify(expected));

    test.throws(function () {
      ejs.AndFilter('junk');
    }, TypeError);
    
    test.throws(function () {
      ejs.AndFilter([termFilter1, 'junk']);
    }, TypeError);

    test.throws(function () {
      andFilter.filters('junk');
    }, TypeError);
    
    test.throws(function () {
      andFilter.filters([termFilter1, 'junk']);
    }, TypeError);
    
    test.done();
  },
  NumericRangeFilter: function (test) {
    test.expect(11);

    var numericRangeFilter = ejs.NumericRangeFilter('f1'),
      expected,
      start = new Date(1230768000000),
      end = new Date(start.getTime()),
      doTest = function () {
        test.deepEqual(numericRangeFilter.get(), expected);
      };

    expected = {
      numeric_range: {
        f1: {}
      }
    };
    end.setFullYear(start.getFullYear() + 1);

    test.ok(numericRangeFilter, 'NumericRangeFilter exists');
    test.ok(numericRangeFilter.get(), 'get() works');
    test.strictEqual(numericRangeFilter.field(), 'f1');
    test.strictEqual(numericRangeFilter.from(), '-1');
    test.strictEqual(numericRangeFilter.to(), '-1');
    doTest();

    numericRangeFilter.from(start.getTime());
    expected.numeric_range.f1.from = start.getTime();
    test.strictEqual(numericRangeFilter.from(), JSON.stringify(start.getTime()));
    doTest();

    numericRangeFilter.to(end.getTime());
    expected.numeric_range.f1.to = end.getTime();
    test.strictEqual(numericRangeFilter.to(), JSON.stringify(end.getTime()));
    doTest();

    test.strictEqual(numericRangeFilter.toString(), JSON.stringify(expected));

    test.done();
  },
  ExistsFilter: function (test) {
    test.expect(6);

    var existsFilter = ejs.ExistsFilter('title'),
      expected,
      doTest = function () {
        test.deepEqual(existsFilter.get(), expected);
      };

    expected = {
      exists: {
        field: 'title'
      }
    };

    test.ok(existsFilter, 'ExistsFilter exists');
    test.ok(existsFilter.get(), 'get() works');
    doTest();

    existsFilter.field('body');
    expected.exists.field = 'body';
    doTest();
    
    existsFilter.name('filter_name');
    expected.exists._name = 'filter_name';
    doTest();
    
    test.strictEqual(existsFilter.toString(), JSON.stringify(expected));

    test.done();
  },
  PrefixFilter: function (test) {
    test.expect(4);

    var prefixFilter = ejs.PrefixFilter('title').prefix('th'),
      expected,
      doTest = function () {
        test.deepEqual(prefixFilter.get(), expected);
      };

    expected = {
      prefix: {
        title: 'th'
      }
    };

    test.ok(prefixFilter, 'PrefixFilter exists');
    test.ok(prefixFilter.get(), 'get() works');
    doTest();

    test.strictEqual(prefixFilter.toString(), JSON.stringify(expected));

    test.done();
  },
  MissingFilter: function (test) {
    test.expect(8);

    var missingFilter = ejs.MissingFilter('title'),
      expected,
      doTest = function () {
        test.deepEqual(missingFilter.get(), expected);
      };

    expected = {
      missing: {
        field: 'title'
      }
    };

    test.ok(missingFilter, 'MissingFilter exists');
    test.ok(missingFilter.get(), 'get() works');
    doTest();

    missingFilter.field('body');
    expected.missing.field = 'body';
    doTest();
    
    missingFilter.existence(true);
    expected.missing.existence = true;
    doTest();
    
    missingFilter.nullValue(true);
    expected.missing.null_value = true;
    doTest();
    
    missingFilter.name('missing_filter');
    expected.missing._name = 'missing_filter';
    doTest();
    
    test.strictEqual(missingFilter.toString(), JSON.stringify(expected));

    test.done();
  },
  OrFilter: function (test) {
    test.expect(5);

    var termFilter1 = ejs.TermFilter('t1', 'v1'),
      termFilter2 = ejs.TermFilter('t2', 'v2'),
      termFilter3 = ejs.TermFilter('t3', 'v3'),
      orFilter = ejs.OrFilter([termFilter1, termFilter2]),
      expected,
      doTest = function () {
        test.deepEqual(orFilter.get(), expected);
      };

    expected = {
      or: [termFilter1.get(), termFilter2.get()]
    };

    test.ok(orFilter, 'OrFilter exists');
    test.ok(orFilter.get(), 'get() works');
    doTest();

    orFilter.add(termFilter3);
    expected.or.push(termFilter3.get());
    doTest();

    test.strictEqual(orFilter.toString(), JSON.stringify(expected));

    test.done();
  }
};
