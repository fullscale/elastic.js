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
    test.expect(5);

    test.ok(ejs.Request, 'Request');
    test.ok(ejs.ComputedProperty, 'ComputedProperty');
    test.ok(ejs.GeoPoint, 'GeoPoint');
    test.ok(ejs.IndexedShape, 'IndexedShape');
    test.ok(ejs.Shape, 'Shape');
    
    test.done();
  },
  Shape: function (test) {
    test.expect(12);
    
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
    
    test.strictEqual(shape.toString(), JSON.stringify(expected));
    
    test.done();
  },
  IndexedShape: function (test) {
    test.expect(8);
    
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
    
    test.strictEqual(indexedShape.toString(), JSON.stringify(expected));
    
    test.done();
  },
  GeoPoint: function (test) {
    test.expect(9);
    
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
    
    test.strictEqual(geoPoint.toString(), JSON.stringify(expected));
    
    test.done();
  },
  ComputedProperty: function (test) {
    test.expect(7);
    
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
    
    test.strictEqual(cp.toString(), JSON.stringify(expected));
    
    test.done();
  },
  Request: function (test) {
    test.expect(42);

    var req = ejs.Request({indices: ['index1'], types: ['type1']}),
      expected,
      expectedPath = '',
      doTest = function (path, data, cb) {
        if (expectedPath !== '') {
          test.deepEqual(path, expectedPath);
          expectedPath = '';
        }
        
        test.deepEqual(JSON.parse(data), expected);
      };

    // setup fake client to call doTest
    ejs.client = {post: doTest};
    
    expected = {
      size: 10,
      from: 0
    };

    test.deepEqual(req.indices(), ['index1']);
    test.deepEqual(req.types(), ['type1']);
    expectedPath = '/index1/type1/_search';
    req.search();

    req.indices([]);
    test.deepEqual(req.indices(), ['_all']);
    expectedPath = '/_all/type1/_search';
    req.search();

    req.types([]);
    test.deepEqual(req.types(), []);
    expectedPath = '/_all/_search';
    req.search();

    req.indices([]);
    test.deepEqual(req.indices(), []);
    expectedPath = '/_search';
    req.search();

    req.indices(['index1', 'index2']);
    test.deepEqual(req.indices(), ['index1', 'index2']);
    expectedPath = '/index1,index2/_search';
    req.search();

    req.types(['type1', 'type2']);
    test.deepEqual(req.types(), ['type1', 'type2']);
    expectedPath = '/index1,index2/type1,type2/_search';
    req.search();

    req = ejs.Request({});
    test.deepEqual(req.indices(), []);
    test.deepEqual(req.types(), []);
    expectedPath = '/_search';
    req.search();
    
    req = ejs.Request({
      indices: 'index1',
      types: 'type1'
    });
    test.deepEqual(req.indices(), ['index1']);
    test.deepEqual(req.types(), ['type1']);
    expectedPath = '/index1/type1/_search';
    req.search();

    req = ejs.Request({
      types: 'type1'
    });
    test.deepEqual(req.indices(), ['_all']);
    test.deepEqual(req.types(), ['type1']);
    expectedPath = '/_all/type1/_search';
    req.search();

    req = ejs.Request({routing: 'route1'});
    test.deepEqual(req.routing(), 'route1');
    expectedPath = '/_search?routing=route1';
    req.search();
    
    req.routing('');
    test.deepEqual(req.routing(), '');
    expectedPath = '/_search';
    req.search();
    
    req.routing('route2,route3');
    test.deepEqual(req.routing(), 'route2,route3');
    expectedPath = '/_search?routing=route2%2Croute3';
    req.search();
    
    req.timeout(5000);
    expected.timeout = 5000;
    req.search();
    
    test.strictEqual(req.toString(), JSON.stringify(expected));

    test.done();
  }
};
