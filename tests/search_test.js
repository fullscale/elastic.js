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
    test.expect(7);

    test.ok(ejs.Request, 'Request');
    test.ok(ejs.ScriptField, 'ScriptField');
    test.ok(ejs.GeoPoint, 'GeoPoint');
    test.ok(ejs.IndexedShape, 'IndexedShape');
    test.ok(ejs.Shape, 'Shape');
    test.ok(ejs.Sort, 'Sort');
    test.ok(ejs.Highlight, 'Highlight');
    
    test.done();
  },
  Highlight: function (test) {
    test.expect(42);
    
    var highlight = ejs.Highlight(['title', 'content']),
      expected,
      doTest = function () {
        test.deepEqual(highlight._self(), expected);
      };
    
    expected = {
      fields: {
        title: {},
        content: {}
      }
    };  
    
    test.ok(highlight, 'Highlight exists');
    test.ok(highlight._self(), '_self() works');
    doTest();
    
    highlight.fields('teaser');
    expected.fields.teaser = {};
    doTest();
    
    highlight.fields(['body', 'summary']);
    expected.fields.body = {};
    expected.fields.summary = {};
    doTest();
    
    highlight.preTags('<em>');
    expected.pre_tags = ['<em>'];
    doTest();
    
    highlight.preTags(['<tag1>', '<tag2>']);
    expected.pre_tags = ['<tag1>', '<tag2>'];
    doTest();
    
    highlight.preTags('<em>', 'content');
    expected.fields.content.pre_tags = ['<em>'];
    doTest();
    
    // test adding tags to field that does not exist
    // it should be added
    highlight.preTags(['<tag1>', '<tag2>'], 'my_field');
    expected.fields.my_field = {pre_tags: ['<tag1>', '<tag2>']};
    doTest();
    
    highlight.postTags('<em>');
    expected.post_tags = ['<em>'];
    doTest();
    
    highlight.postTags(['<tag1>', '<tag2>']);
    expected.post_tags = ['<tag1>', '<tag2>'];
    doTest();
    
    highlight.postTags('<em>', 'content');
    expected.fields.content.post_tags = ['<em>'];
    doTest();
    
    highlight.postTags(['<tag1>', '<tag2>'], 'my_field');
    expected.fields.my_field.post_tags = ['<tag1>', '<tag2>'];
    doTest();
    
    highlight.order('score');
    expected.order = 'score';
    doTest();
    
    highlight.order('INVALID');
    doTest();
    
    highlight.order('score', 'title');
    expected.fields.title.order = 'score';
    doTest();
    
    highlight.tagsSchema('styled');
    expected.tags_schema = 'styled';
    doTest();
    
    highlight.tagsSchema('INVALID');
    doTest();
    
    highlight.highlightFilter(true);
    expected.highlight_filter = true;
    doTest();
    
    highlight.highlightFilter(false, 'body');
    expected.fields.body.highlight_filter = false;
    doTest();
    
    // addings a field that already exists with options
    // should not change anything
    highlight.fields('body');
    doTest();
    
    highlight.fragmentSize(500);
    expected.fragment_size = 500;
    doTest();
    
    highlight.fragmentSize(300, 'title');
    expected.fields.title.fragment_size = 300;
    doTest();
    
    highlight.numberOfFragments(10);
    expected.number_of_fragments = 10;
    doTest();
    
    highlight.numberOfFragments(2, 'content');
    expected.fields.content.number_of_fragments = 2;
    doTest();
    
    highlight.encoder('default');
    expected.encoder = 'default';
    doTest();
    
    highlight.encoder('INVALID');
    doTest();
    
    highlight.encoder('HTML');
    expected.encoder = 'html';
    doTest();
    
    highlight.requireFieldMatch(true);
    expected.require_field_match = true;
    doTest();
    
    highlight.requireFieldMatch(true, 'title');
    expected.fields.title.require_field_match = true;
    doTest();
    
    highlight.boundaryMaxScan(30);
    expected.boundary_max_scan = 30;
    doTest();
    
    highlight.boundaryMaxScan(10, 'title');
    expected.fields.title.boundary_max_scan = 10;
    doTest();
    
    highlight.boundaryChars('$#{}');
    expected.boundary_chars = '$#{}';
    doTest();
    
    highlight.boundaryChars('#', 'content');
    expected.fields.content.boundary_chars = '#';
    doTest();
    
    highlight.type('highlighter');
    expected.type = 'highlighter';
    doTest();
    
    highlight.type('INVALID');
    doTest();
    
    highlight.type('FAST-VECTOR-HIGHLIGHTER', 'body');
    expected.fields.body.type = 'fast-vector-highlighter';
    doTest();
    
    highlight.fragmenter('simple');
    expected.fragmenter = 'simple';
    doTest();
    
    highlight.fragmenter('INVALID');
    doTest();
    
    highlight.fragmenter('SPAN', 'title');
    expected.fields.title.fragmenter = 'span';
    doTest();
    
    test.strictEqual(highlight._type(), 'highlight');
    test.strictEqual(highlight.toString(), JSON.stringify(expected));
    
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
  ScriptField: function (test) {
    test.expect(9);
    
    var cp = ejs.ScriptField('f'),
      expected,
      doTest = function () {
        test.deepEqual(cp._self(), expected);
      };
    
    expected = {
      f: {}
    };  
    
    test.ok(cp, 'ScriptField exists');
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
    
    cp.ignoreFailure(true);
    expected.f.ignore_failure = true;
    doTest();
    
    test.strictEqual(cp._type(), 'script field');
    test.strictEqual(cp.toString(), JSON.stringify(expected));
    
    test.done();
  },
  Request: function (test) {
    test.expect(86);

    var req = ejs.Request({indices: ['index1'], types: ['type1']}),
      matchAll = ejs.MatchAllQuery(),
      termQuery = ejs.TermQuery('t', 'v'),
      termFilter = ejs.TermFilter('tf', 'vf'),
      filterFacet = ejs.FilterFacet('my_filter_facet').filter(termFilter),
      termsFacet = ejs.TermsFacet('my_terms_facet').field('author'),
      scriptField = ejs.ScriptField('my_script_field')
        .script('doc["my_field_name"].value * 2'),
      scriptField2 = ejs.ScriptField('my_script_field2')
        .script("doc['my_field_name'].value * factor")
        .params({'factor': 2.0}),
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
    
    req.fields('field1');
    expected.fields = ['field1'];
    req.doSearch();
    
    req.fields('field2');
    expected.fields.push('field2');
    req.doSearch();
    
    req.fields(['field3', 'field4']);
    expected.fields = ['field3', 'field4'];
    req.doSearch();
    
    var hlt = ejs.Highlight('body').fragmentSize(500, 'body');
    
    req.highlight(hlt);
    expected.highlight = hlt._self();
    req.doSearch();
    
    req.size(20);
    expected.size = 20;
    doTest();
    
    req.from(10);
    expected.from = 10;
    doTest();
    
    req.timeout(1000);
    expected.timeout = 1000;
    doTest();
    
    req.query(termQuery);
    expected.query = termQuery._self();
    doTest();
    
    req.facet(filterFacet);
    expected.facets = filterFacet._self();
    doTest();
    
    req.facet(termsFacet);
    // extend is not avaiable in tests so just set place the facet
    // value into the existing facets object
    expected.facets.my_terms_facet = termsFacet._self().my_terms_facet;
    doTest();
    
    req.filter(termFilter);
    expected.filter = termFilter._self();
    doTest();
    
    req.scriptField(scriptField);
    expected.script_fields = scriptField._self();
    doTest();
    
    req.scriptField(scriptField2);
    expected.script_fields.my_script_field2 = scriptField2._self().my_script_field2;
    doTest();
    
    req.preference('_primary');
    expected.preference = '_primary';
    doTest();
    
    req.indexBoost('index', 5.0);
    expected.indices_boost = {index: 5.0};
    doTest();
    
    req.indexBoost('index2', 3.2);
    expected.indices_boost.index2 = 3.2;
    doTest();
    
    req.explain(true);
    expected.explain = true;
    doTest();
    
    req.version(false);
    expected.version = false;
    doTest();
    
    req.minScore(0.5);
    expected.min_score = 0.5;
    doTest();
    
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
      req.scriptField('invalid');
    }, TypeError);
    
    test.throws(function () {
      req.sort(2);
    }, TypeError);
    
    test.throws(function () {
      req.sort(['valid', 3]);
    }, TypeError);
    
    test.throws(function () {
      req.fields(3);
    }, TypeError);
    
    test.throws(function () {
      req.highlight('invalid');
    }, TypeError);
    
    test.done();
  }
};
