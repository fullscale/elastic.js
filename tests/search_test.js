/*global require:true */
'use strict';

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
    test.expect(6);

    test.ok(ejs.Request, 'Request');
    test.ok(ejs.ComputedProperty, 'ComputedProperty');
    test.ok(ejs.GeoPoint, 'GeoPoint');
    test.ok(ejs.IndexedShape, 'IndexedShape');
    test.ok(ejs.Shape, 'Shape');
    test.ok(ejs.Sort, 'Sort');
    
    test.done();
  },
  Sort: function (test) {
    test.expect(29);
    
    var sort = ejs.Sort(),
      geoPoint = ejs.GeoPoint([37.7819288, -122.396480]),
      expected,
      doTest = function () {
        test.deepEqual(sort._self(), expected);
      };
    
    expected = {
      _score: {}
    };  
    
    test.ok(sort, 'Sort exists');
    test.ok(sort._self(), '_self() works');
    doTest();
    
    sort.field('title');
    expected = {
      title: {}
    };
    doTest();
    
    sort.order('asc');
    expected.title.order = 'asc';
    doTest();
    
    sort.order('INVALID');
    doTest();
    
    sort.order('DESC');
    expected.title.order = 'desc';
    doTest();
    
    sort.asc();
    expected.title.order = 'asc';
    doTest();
    
    sort.desc();
    expected.title.order = 'desc';
    doTest();
    
    sort.reverse(true);
    expected.title.reverse = true;
    doTest();
    
    sort.missing('_last');
    expected.title.missing = '_last';
    doTest();
    
    sort.ignoreUnmapped(true);
    expected.title.ignore_unmapped = true;
    doTest();
    
    // geo distance sorting tests
    sort = ejs.Sort('location').geoDistance(geoPoint);
    expected = {
      _geo_distance: {
        location: geoPoint._self()
      }
    };
    doTest();
    
    sort.unit('mi');
    expected._geo_distance.unit = 'mi';
    doTest();
    
    sort.unit('INVALID');
    doTest();
    
    sort.unit('KM');
    expected._geo_distance.unit = 'km';
    doTest();
    
    sort.normalize(true);
    expected._geo_distance.normalize = true;
    doTest();
    
    sort.distanceType('arc');
    expected._geo_distance.distance_type = 'arc';
    doTest();
    
    sort.distanceType('INVALID');
    doTest();
    
    sort.distanceType('PLANE');
    expected._geo_distance.distance_type = 'plane';
    doTest();
    
    // script sorting tests
    sort = ejs.Sort().script("doc['field_name'].value * factor");
    expected = {
      _script: {
        script: "doc['field_name'].value * factor"
      }
    };
    doTest();
    
    sort.lang('mvel');
    expected._script.lang = 'mvel';
    doTest();
    
    sort.params({p1: true, p2: 'v2'});
    expected._script.params = {p1: true, p2: 'v2'};
    doTest();
    
    sort.type('string');
    expected._script.type = 'string';
    doTest();
    
    sort.type('INVALID');
    doTest();
    
    sort.type('NUMBER');
    expected._script.type = 'number';
    doTest();
    
    test.strictEqual(sort._type(), 'sort');
    test.strictEqual(sort.toString(), JSON.stringify(expected));
    
    test.throws(function () {
      sort.geoDistance('invalid');
    }, TypeError);
    
    test.done();
  },
  Shape: function (test) {
    test.expect(13);
    
    var shape = ejs.Shape('envelope', [[-45.0, 45.0], [45.0, -45.0]]),
      expected,
      doTest = function () {
        test.deepEqual(shape._self(), expected);
      };
    
    expected = {
      type: 'envelope',
      coordinates: [[-45.0, 45.0], [45.0, -45.0]]
    };  
    
    test.ok(shape, 'Shape exists');
    test.ok(shape._self(), '_self() works');
    doTest();
    
    shape.type('point');
    expected.type = 'point';
    doTest();
    
    shape.type('INVALID');
    doTest();
    
    shape.type('LINESTRING');
    expected.type = 'linestring';
    doTest();
    
    shape.type('multipoint');
    expected.type = 'multipoint';
    doTest();
    
    shape.type('envelope');
    expected.type = 'envelope';
    doTest();
    
    shape.type('multiPolygon');
    expected.type = 'multipolygon';
    doTest();
    
    shape.type('polygon');
    expected.type = 'polygon';
    doTest();
    
    shape.coordinates([[-180.0, 10.0], [20.0, 90.0], [180.0, -5.0], 
      [-30.0, -90.0]]);
    expected.coordinates = [[-180.0, 10.0], [20.0, 90.0], [180.0, -5.0], 
      [-30.0, -90.0]];
    doTest();
    
    test.strictEqual(shape._type(), 'shape');
    test.strictEqual(shape.toString(), JSON.stringify(expected));
    
    test.done();
  },
  IndexedShape: function (test) {
    test.expect(9);
    
    var indexedShape = ejs.IndexedShape('countries', 'New Zealand'),
      expected,
      doTest = function () {
        test.deepEqual(indexedShape._self(), expected);
      };
    
    expected = {
      type: 'countries',
      id: 'New Zealand'
    };  
    
    test.ok(indexedShape, 'IndexedShape exists');
    test.ok(indexedShape._self(), '_self() works');
    doTest();
    
    indexedShape.type('state');
    expected.type = 'state';
    doTest();
    
    indexedShape.id('CA');
    expected.id = 'CA';
    doTest();
    
    indexedShape.index('states');
    expected.index = 'states';
    doTest();
    
    indexedShape.shapeFieldName('stateshape');
    expected.shape_field_name = 'stateshape';
    doTest();
    
    test.strictEqual(indexedShape._type(), 'indexed shape');
    test.strictEqual(indexedShape.toString(), JSON.stringify(expected));
    
    test.done();
  },
  GeoPoint: function (test) {
    test.expect(10);
    
    var geoPoint = ejs.GeoPoint(),
      expected,
      doTest = function () {
        test.deepEqual(geoPoint._self(), expected);
      };
    
    expected = [0, 0];
    
    test.ok(geoPoint, 'GeoPoint exists');
    test.ok(geoPoint._self(), '_self() works');
    doTest();
    
    // [lat, lon] constructor converted to GeoJSON [lon, lat]
    geoPoint = ejs.GeoPoint([37.7819288, -122.396480]);
    expected = [-122.396480, 37.7819288];
    doTest();
    
    geoPoint.properties({lat: 37.7817289, lon: -122.396181});
    expected = {lat: 37.7817289, lon: -122.396181};
    doTest();
    
    geoPoint.string("37.7819288,-122.396480");
    expected = "37.7819288,-122.396480";
    doTest();
    
    geoPoint.geohash('drn5x1g8cu2y');
    expected = 'drn5x1g8cu2y';
    doTest();
    
    // [lat, lon] array converted to GeoJSON [lon, lat]
    geoPoint.array([37.7817289, -122.396181]);
    expected = [-122.396181, 37.7817289];
    doTest();
    
    test.strictEqual(geoPoint._type(), 'geo point');
    test.strictEqual(geoPoint.toString(), JSON.stringify(expected));
    
    test.done();
  },
  ComputedProperty: function (test) {
    test.expect(8);
    
    var cp = ejs.ComputedProperty('f'),
      expected,
      doTest = function () {
        test.deepEqual(cp._self(), expected);
      };
    
    expected = {
      f: {}
    };  
    
    test.ok(cp, 'ComputedProperty exists');
    test.ok(cp._self(), '_self() works');
    doTest();
    
    cp.lang('mvel');
    expected.f.lang = 'mvel';
    doTest();
    
    cp.script('script src');
    expected.f.script = 'script src';
    doTest();
    
    cp.params({param1: 'p1', param2: 2});
    expected.f.params = {param1: 'p1', param2: 2};
    doTest();
    
    test.strictEqual(cp._type(), 'computed property');
    test.strictEqual(cp.toString(), JSON.stringify(expected));
    
    test.done();
  },
  Request: function (test) {
    test.expect(65);

    var req = ejs.Request({indices: ['index1'], types: ['type1']}),
      matchAll = ejs.MatchAllQuery(),
      expected,
      mockClient,
      expectedPath = '',
      expectedData = '',
      expectedMethod = '',
      doTest = function (method, path, data, cb) {
        if (expectedPath !== '') {
          test.strictEqual(path, expectedPath);
          expectedPath = '';
        }
        
        if (expectedData !== '') {
          test.deepEqual(data, expectedData);
          expectedData = '';
        }
        
        if (expectedMethod !== '') {
          test.strictEqual(method, expectedMethod);
          expectedMethod = '';
        }
        
        test.deepEqual(req._self(), expected);
      };

    // setup fake client to call doTest
    ejs.client = mockClient = {
      get: function (path, data, cb) {
        doTest('get', path, data, cb);
      },
      post: function (path, data, cb) {
        doTest('post', path, data, cb);
      },
      put: function (path, data, cb) {
        doTest('put', path, data, cb);
      },
      del: function (path, data, cb) {
        doTest('delete', path, data, cb);
      },
      head: function (path, data, cb) {
        doTest('head', path, data, cb);
      }
    };
    
    expected = {};

    test.deepEqual(req.indices(), ['index1']);
    test.deepEqual(req.types(), ['type1']);
    expectedMethod = 'post';
    expectedPath = '/index1/type1/_search';
    expectedData = JSON.stringify(expected);
    req.doSearch();

    req.indices([]);
    test.deepEqual(req.indices(), ['_all']);
    expectedPath = '/_all/type1/_search';
    req.doSearch();

    req.types([]);
    test.deepEqual(req.types(), []);
    expectedPath = '/_all/_search';
    req.doSearch();

    req.indices([]);
    test.deepEqual(req.indices(), []);
    expectedPath = '/_search';
    req.doSearch();

    req.indices(['index1', 'index2']);
    test.deepEqual(req.indices(), ['index1', 'index2']);
    expectedPath = '/index1,index2/_search';
    req.doSearch();

    req.types(['type1', 'type2']);
    test.deepEqual(req.types(), ['type1', 'type2']);
    expectedPath = '/index1,index2/type1,type2/_search';
    req.doSearch();

    req = ejs.Request({});
    test.deepEqual(req.indices(), []);
    test.deepEqual(req.types(), []);
    expectedPath = '/_search';
    req.doSearch();
    
    req = ejs.Request({
      indices: 'index1',
      types: 'type1'
    });
    test.deepEqual(req.indices(), ['index1']);
    test.deepEqual(req.types(), ['type1']);
    expectedPath = '/index1/type1/_search';
    req.doSearch();

    req = ejs.Request({
      types: 'type1'
    });
    test.deepEqual(req.indices(), ['_all']);
    test.deepEqual(req.types(), ['type1']);
    expectedPath = '/_all/type1/_search';
    req.doSearch();

    req = ejs.Request({routing: 'route1'});
    test.deepEqual(req.routing(), 'route1');
    expectedPath = '/_search?routing=route1';
    req.doSearch();
    
    req.routing('');
    test.deepEqual(req.routing(), '');
    expectedPath = '/_search';
    req.doSearch();
    
    req.routing('route2,route3');
    test.deepEqual(req.routing(), 'route2,route3');
    expectedPath = '/_search?routing=route2%2Croute3';
    req.doSearch();
    
    req.timeout(5000);
    expected.timeout = 5000;
    req.doSearch();
    
    req = ejs.Request({indices: 'index', types: 'type'}).query(matchAll);
    expected = {
      query: matchAll._self()
    };
    expectedPath = '/index/type/_search';
    expectedData = JSON.stringify(expected);
    req.doSearch();
    
    req.sort('field1');
    expected.sort = ['field1'];
    req.doSearch();
    
    req.sort('field2', 'asc');
    expected.sort.push({field2: {order: 'asc'}});
    req.doSearch();
    
    req.sort('field3', 'invalid');
    req.doSearch();
    
    req.sort('field3', 'DESC');
    expected.sort.push({field3: {order: 'desc'}});
    req.doSearch();
    
    req.sort(ejs.Sort('field4').asc());
    expected.sort.push({field4: {order: 'asc'}});
    req.doSearch();
    
    var geoSort = ejs.Sort('location')
      .geoDistance(ejs.GeoPoint([37.7819288, -122.396480]))
      .unit('mi').normalize(true);
    req.sort(geoSort);
    expected.sort.push(geoSort._self());
    req.doSearch();
    
    req.sort(['field5', geoSort]);
    expected.sort = ['field5', geoSort._self()];
    req.doSearch();
    
    test.deepEqual(req.sort(), expected.sort);
    
    req.trackScores(true);
    expected.track_scores = true;
    req.doSearch();
    
    test.strictEqual(req._type(), 'request');
    test.strictEqual(req.toString(), JSON.stringify(expected));

    test.throws(function () {
      req.query('invalid');
    }, TypeError);
    
    test.throws(function () {
      req.facet('invalid');
    }, TypeError);
    
    test.throws(function () {
      req.filter('invalid');
    }, TypeError);
    
    test.throws(function () {
      req.indices(2);
    }, TypeError);
    
    test.throws(function () {
      req.types(3);
    }, TypeError);
    
    test.throws(function () {
      req.computedProperty('invalid');
    }, TypeError);
    
    test.throws(function () {
      req.sort(2);
    }, TypeError);
    
    test.throws(function () {
      req.sort(['valid', 3]);
    }, TypeError);
    
    test.done();
  }
};
