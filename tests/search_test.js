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
    test.expect(15);

    test.ok(ejs.Request, 'Request');
    test.ok(ejs.ScriptField, 'ScriptField');
    test.ok(ejs.GeoPoint, 'GeoPoint');
    test.ok(ejs.IndexedShape, 'IndexedShape');
    test.ok(ejs.Shape, 'Shape');
    test.ok(ejs.Sort, 'Sort');
    test.ok(ejs.Highlight, 'Highlight');
    test.ok(ejs.TermSuggester, 'TermSuggester');
    test.ok(ejs.PhraseSuggester, 'PhraseSuggester');
    test.ok(ejs.DirectSettingsMixin, 'DirectSettingsMixin');
    test.ok(ejs.DirectGenerator, 'DirectGenerator');
    test.ok(ejs.SuggesterMixin, 'SuggesterMixin');
    test.ok(ejs.SuggestContextMixin, 'SuggestContextMixin');
    test.ok(ejs.CompletionSuggester, 'CompletionSuggester');
    test.ok(ejs.Rescore, 'Rescore');

    test.done();
  },
  Rescore: function (test) {
    test.expect(22);

    var rescore = ejs.Rescore(),
      termQuery1 = ejs.TermQuery('f1', 't1'),
      termQuery2 = ejs.TermQuery('f2', 't2'),
      expected,
      doTest = function () {
        test.deepEqual(rescore.toJSON(), expected);
      };

    expected = {
      query: {}
    };

    test.ok(rescore, 'Rescore exists');
    test.ok(rescore.toJSON(), 'toJSON() works');
    doTest();

    rescore = ejs.Rescore(100);
    expected.window_size = 100;
    doTest();

    rescore = ejs.Rescore(1000, termQuery1);
    expected.window_size = 1000;
    expected.query.rescore_query = termQuery1.toJSON();
    doTest();

    rescore.windowSize(100);
    expected.window_size = 100;
    doTest();

    rescore.rescoreQuery(termQuery2);
    expected.query.rescore_query = termQuery2.toJSON();
    doTest();

    rescore.queryWeight(2);
    expected.query.query_weight = 2;
    doTest();

    rescore.rescoreQueryWeight(3);
    expected.query.rescore_query_weight = 3;
    doTest();

    rescore.scoreMode('total');
    expected.query.score_mode = 'total';
    doTest();

    rescore.scoreMode('INVALID');
    doTest();

    rescore.scoreMode('MIN');
    expected.query.score_mode = 'min';
    doTest();

    rescore.scoreMode('Max');
    expected.query.score_mode = 'max';
    doTest();

    rescore.scoreMode('AvG');
    expected.query.score_mode = 'avg';
    doTest();

    rescore.scoreMode('multiply');
    expected.query.score_mode = 'multiply';
    doTest();

    test.strictEqual(rescore._type(), 'rescore');


    test.throws(function () {
      ejs.Rescore('invalid');
    }, TypeError);

    test.throws(function () {
      ejs.Rescore(2, 'invalid');
    }, TypeError);

    test.throws(function () {
      rescore.rescoreQuery('invalid');
    }, TypeError);

    test.throws(function () {
      rescore.rescoreQueryWeight('invalid');
    }, TypeError);

    test.throws(function () {
      rescore.queryWeight('invalid');
    }, TypeError);

    test.throws(function () {
      rescore.windowSize('invalid');
    }, TypeError);

    test.done();
  },
  DirectGenerator: function (test) {
    test.expect(28);

    var generator = ejs.DirectGenerator(),
      expected,
      doTest = function () {
        test.deepEqual(generator.toJSON(), expected);
      };

    expected = {};

    test.ok(generator, 'DirectGenerator exists');
    test.ok(generator.toJSON(), 'toJSON() works');
    doTest();

    generator.preFilter('pre analyzer');
    expected.pre_filter = 'pre analyzer';
    doTest();

    generator.postFilter('post analyzer');
    expected.post_filter = 'post analyzer';
    doTest();

    generator.field('f');
    expected.field = 'f';
    doTest();

    generator.size(5);
    expected.size = 5;
    doTest();

    generator.accuracy(0.6);
    expected.accuracy = 0.6;
    doTest(0.6);

    generator.suggestMode('missing');
    expected.suggest_mode = 'missing';
    doTest();

    generator.suggestMode('INVALID');
    doTest();

    generator.suggestMode('POPULAR');
    expected.suggest_mode = 'popular';
    doTest();

    generator.suggestMode('Always');
    expected.suggest_mode = 'always';
    doTest();

    generator.sort('score');
    expected.sort = 'score';
    doTest();

    generator.sort('INVALID');
    doTest();

    generator.sort('FREQUENCY');
    expected.sort = 'frequency';
    doTest();

    generator.stringDistance('internal');
    expected.string_distance = 'internal';
    doTest();

    generator.stringDistance('INVALID');
    doTest();

    generator.stringDistance('DAMERAU_LEVENSHTEIN');
    expected.string_distance = 'damerau_levenshtein';
    doTest();

    generator.stringDistance('Levenstein');
    expected.string_distance = 'levenstein';
    doTest();

    generator.stringDistance('jarowinkler');
    expected.string_distance = 'jarowinkler';
    doTest();

    generator.stringDistance('ngram');
    expected.string_distance = 'ngram';
    doTest();

    generator.maxEdits(3);
    expected.max_edits = 3;
    doTest();

    generator.maxInspections(10);
    expected.max_inspections = 10;
    doTest();

    generator.maxTermFreq(0.7);
    expected.max_term_freq = 0.7;
    doTest();

    generator.prefixLen(4);
    expected.prefix_len = 4;
    doTest();

    generator.minWordLen(3);
    expected.min_word_len = 3;
    doTest();

    generator.minDocFreq(0.1);
    expected.min_doc_freq = 0.1;
    doTest();

    test.strictEqual(generator._type(), 'generator');


    test.done();
  },
  TermSuggester: function (test) {
    test.expect(29);

    var suggester = ejs.TermSuggester('suggester'),
      expected,
      doTest = function () {
        test.deepEqual(suggester.toJSON(), expected);
      };

    expected = {
      suggester: {
        term: {}
      }
    };

    test.ok(suggester, 'TermSuggester exists');
    test.ok(suggester.toJSON(), 'toJSON() works');
    doTest();

    suggester.text('sugest termz');
    expected.suggester.text = 'sugest termz';
    doTest();

    suggester.analyzer('analyzer');
    expected.suggester.term.analyzer = 'analyzer';
    doTest();

    suggester.field('f');
    expected.suggester.term.field = 'f';
    doTest();

    suggester.size(5);
    expected.suggester.term.size = 5;
    doTest();

    suggester.shardSize(100);
    expected.suggester.term.shard_size = 100;
    doTest();

    suggester.accuracy(0.6);
    expected.suggester.term.accuracy = 0.6;
    doTest(0.6);

    suggester.suggestMode('missing');
    expected.suggester.term.suggest_mode = 'missing';
    doTest();

    suggester.suggestMode('INVALID');
    doTest();

    suggester.suggestMode('POPULAR');
    expected.suggester.term.suggest_mode = 'popular';
    doTest();

    suggester.suggestMode('Always');
    expected.suggester.term.suggest_mode = 'always';
    doTest();

    suggester.sort('score');
    expected.suggester.term.sort = 'score';
    doTest();

    suggester.sort('INVALID');
    doTest();

    suggester.sort('FREQUENCY');
    expected.suggester.term.sort = 'frequency';
    doTest();

    suggester.stringDistance('internal');
    expected.suggester.term.string_distance = 'internal';
    doTest();

    suggester.stringDistance('INVALID');
    doTest();

    suggester.stringDistance('DAMERAU_LEVENSHTEIN');
    expected.suggester.term.string_distance = 'damerau_levenshtein';
    doTest();

    suggester.stringDistance('Levenstein');
    expected.suggester.term.string_distance = 'levenstein';
    doTest();

    suggester.stringDistance('jarowinkler');
    expected.suggester.term.string_distance = 'jarowinkler';
    doTest();

    suggester.stringDistance('ngram');
    expected.suggester.term.string_distance = 'ngram';
    doTest();

    suggester.maxEdits(3);
    expected.suggester.term.max_edits = 3;
    doTest();

    suggester.maxInspections(10);
    expected.suggester.term.max_inspections = 10;
    doTest();

    suggester.maxTermFreq(0.7);
    expected.suggester.term.max_term_freq = 0.7;
    doTest();

    suggester.prefixLen(4);
    expected.suggester.term.prefix_len = 4;
    doTest();

    suggester.minWordLen(3);
    expected.suggester.term.min_word_len = 3;
    doTest();

    suggester.minDocFreq(0.1);
    expected.suggester.term.min_doc_freq = 0.1;
    doTest();

    test.strictEqual(suggester._type(), 'suggest');


    test.done();
  },
  PhraseSuggester: function (test) {
    test.expect(25);

    var suggester = ejs.PhraseSuggester('suggester'),
      gen1 = ejs.DirectGenerator().field('body')
        .suggestMode('always')
        .minWordLen(1),
      gen2 = ejs.DirectGenerator().field('reverse')
        .suggestMode('always')
        .minWordLen(1)
        .preFilter('reverse')
        .postFilter('reverse'),
      gen3 = ejs.DirectGenerator().field('body')
        .suggestMode('popular')
        .minWordLen(2)
        .prefixLen(3)
        .size(100),
      expected,
      doTest = function () {
        test.deepEqual(suggester.toJSON(), expected);
      };

    expected = {
      suggester: {
        phrase: {}
      }
    };

    test.ok(suggester, 'PhraseSuggester exists');
    test.ok(suggester.toJSON(), 'toJSON() works');
    doTest();

    suggester.text('sugest termz');
    expected.suggester.text = 'sugest termz';
    doTest();

    suggester.analyzer('analyzer');
    expected.suggester.phrase.analyzer = 'analyzer';
    doTest();

    suggester.field('f');
    expected.suggester.phrase.field = 'f';
    doTest();

    suggester.size(5);
    expected.suggester.phrase.size = 5;
    doTest();

    suggester.shardSize(100);
    expected.suggester.phrase.shard_size = 100;
    doTest();

    suggester.realWordErrorLikelihood(0.99);
    expected.suggester.phrase.real_word_error_likelihood = 0.99;
    doTest();

    suggester.confidence(0.6);
    expected.suggester.phrase.confidence = 0.6;
    doTest();

    suggester.separator('|');
    expected.suggester.phrase.separator = '|';
    doTest();

    suggester.maxErrors(0.5);
    expected.suggester.phrase.max_errors = 0.5;
    doTest();

    suggester.gramSize(2);
    expected.suggester.phrase.gram_size = 2;
    doTest();

    suggester.forceUnigrams(false);
    expected.suggester.phrase.force_unigrams = false;
    doTest();

    suggester.tokenLimit(10);
    expected.suggester.phrase.token_limit = 10;
    doTest();

    suggester.linearSmoothing(0.7, 0.2, 0.1);
    expected.suggester.phrase.smoothing = {
      linear: {
        trigram_lambda: 0.7,
        bigram_lambda: 0.2,
        unigram_lambda: 0.1
      }
    };
    doTest();

    suggester.laplaceSmoothing(0.7);
    expected.suggester.phrase.smoothing = {
      laplace: {
        alpha: 0.7
      }
    };
    doTest();

    suggester.stupidBackoffSmoothing(0.5);
    expected.suggester.phrase.smoothing = {
      stupid_backoff: {
        discount: 0.5
      }
    };
    doTest();

    suggester.highlight('<b>', '</b>');
    expected.suggester.phrase.highlight = {
      pre_tag: '<b>',
      post_tag: '</b>'
    };
    doTest();

    suggester.directGenerator(gen1);
    expected.suggester.phrase.direct_generator = [gen1.toJSON()];
    doTest();

    suggester.directGenerator(gen2);
    expected.suggester.phrase.direct_generator.push(gen2.toJSON());
    doTest();

    suggester.directGenerator([gen3, gen1]);
    expected.suggester.phrase.direct_generator = [gen3.toJSON(), gen1.toJSON()];
    doTest();

    test.strictEqual(suggester._type(), 'suggest');


    test.throws(function () {
      suggester.directGenerator('invalid');
    }, TypeError);

    test.throws(function () {
      suggester.directGenerator([gen1, gen2, 'invalid']);
    }, TypeError);

    test.done();
  },
  CompletionSuggester: function (test) {
    test.expect(17);

    var suggester = ejs.CompletionSuggester('suggester'),
      expected,
      doTest = function () {
        test.deepEqual(suggester.toJSON(), expected);
      };

    expected = {
      suggester: {
        completion: {}
      }
    };

    test.ok(suggester, 'CompletionSuggester exists');
    test.ok(suggester.toJSON(), 'toJSON() works');
    doTest();

    suggester.text('sugest termz');
    expected.suggester.text = 'sugest termz';
    doTest();

    suggester.analyzer('analyzer');
    expected.suggester.completion.analyzer = 'analyzer';
    doTest();

    suggester.field('f');
    expected.suggester.completion.field = 'f';
    doTest();

    suggester.size(5);
    expected.suggester.completion.size = 5;
    doTest();

    suggester.shardSize(100);
    expected.suggester.completion.shard_size = 100;
    doTest();

    suggester.fuzzy(true);
    expected.suggester.completion.fuzzy = {};
    doTest();

    suggester.fuzzy(false);
    delete expected.suggester.completion.fuzzy;
    doTest();

    suggester.transpositions(true);
    expected.suggester.completion.fuzzy = {transpositions: true};
    doTest();

    suggester.unicodeAware(false);
    expected.suggester.completion.fuzzy.unicode_aware = false;
    doTest();

    suggester.editDistance(4);
    expected.suggester.completion.fuzzy.edit_distance = 4;
    doTest();

    suggester.minLength(4);
    expected.suggester.completion.fuzzy.min_length = 4;
    doTest();

    suggester.prefixLength(2);
    expected.suggester.completion.fuzzy.prefix_length = 2;
    doTest();

    suggester.fuzzy(false);
    delete expected.suggester.completion.fuzzy;
    doTest();

    test.strictEqual(suggester._type(), 'suggest');

    test.done();
  },
  Highlight: function (test) {
    test.expect(47);

    var highlight = ejs.Highlight(['title', 'content']),
      expected,
      doTest = function () {
        test.deepEqual(highlight.toJSON(), expected);
      };

    expected = {
      fields: {
        title: {},
        content: {}
      }
    };

    test.ok(highlight, 'Highlight exists');
    test.ok(highlight.toJSON(), 'toJSON() works');
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

    highlight.type('Postings');
    expected.type = 'postings';
    doTest();

    highlight.fragmenter('simple');
    expected.fragmenter = 'simple';
    doTest();

    highlight.fragmenter('INVALID');
    doTest();

    highlight.fragmenter('SPAN', 'title');
    expected.fields.title.fragmenter = 'span';
    doTest();

    highlight.options({a: 1, b: 2});
    expected.options = {a: 1, b: 2};
    doTest();

    highlight.options({c: 3}, 'body');
    expected.fields.body.options = {c: 3};
    doTest();

    test.strictEqual(highlight._type(), 'highlight');


    test.throws(function () {
      highlight.options('invalid');
    }, TypeError);

    test.throws(function () {
      highlight.options(['invalid']);
    }, TypeError);

    test.throws(function () {
      highlight.options(ejs.GeoPoint());
    }, TypeError);

    test.done();
  },
  Sort: function (test) {
    test.expect(36);

    var sort = ejs.Sort(),
      termFilter = ejs.TermFilter('tf1', 'tv1'),
      geoPoint = ejs.GeoPoint([37.7819288, -122.396480]),
      expected,
      doTest = function () {
        test.deepEqual(sort.toJSON(), expected);
      };

    expected = {
      _score: {}
    };

    test.ok(sort, 'Sort exists');
    test.ok(sort.toJSON(), 'toJSON() works');
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

    sort.mode('min');
    expected.title.mode = 'min';
    doTest();

    sort.mode('INVALID');
    doTest();

    sort.mode('MAX');
    expected.title.mode = 'max';
    doTest();

    sort.mode('Avg');
    expected.title.mode = 'avg';
    doTest();

    sort.mode('sum');
    expected.title.mode = 'sum';
    doTest();

    sort.nestedPath('nested.path');
    expected.title.nested_path = 'nested.path';
    doTest();

    sort.nestedFilter(termFilter);
    expected.title.nested_filter = termFilter.toJSON();
    doTest();

    // geo distance sorting tests
    sort = ejs.Sort('location').geoDistance(geoPoint);
    expected = {
      _geo_distance: {
        location: geoPoint.toJSON()
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


    test.throws(function () {
      sort.geoDistance('invalid');
    }, TypeError);

    test.throws(function () {
      sort.nestedFilter('invalid');
    }, TypeError);

    test.done();
  },
  Shape: function (test) {
    test.expect(15);

    var shape = ejs.Shape('envelope', [[-45.0, 45.0], [45.0, -45.0]]),
      expected,
      doTest = function () {
        test.deepEqual(shape.toJSON(), expected);
      };

    expected = {
      type: 'envelope',
      coordinates: [[-45.0, 45.0], [45.0, -45.0]]
    };

    test.ok(shape, 'Shape exists');
    test.ok(shape.toJSON(), 'toJSON() works');
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

    shape.type('circle');
    expected.type = 'circle';
    doTest();

    shape.type('multilinestring');
    expected.type = 'multilinestring';
    doTest();

    shape.radius("20");
    expected.radius = "20";
    doTest();

    shape.coordinates([[-180.0, 10.0], [20.0, 90.0], [180.0, -5.0],
      [-30.0, -90.0]]);
    expected.coordinates = [[-180.0, 10.0], [20.0, 90.0], [180.0, -5.0],
      [-30.0, -90.0]];
    doTest();

    test.strictEqual(shape._type(), 'shape');


    test.done();
  },
  IndexedShape: function (test) {
    test.expect(8);

    var indexedShape = ejs.IndexedShape('countries', 'New Zealand'),
      expected,
      doTest = function () {
        test.deepEqual(indexedShape.toJSON(), expected);
      };

    expected = {
      type: 'countries',
      id: 'New Zealand'
    };

    test.ok(indexedShape, 'IndexedShape exists');
    test.ok(indexedShape.toJSON(), 'toJSON() works');
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


    test.done();
  },
  GeoPoint: function (test) {
    test.expect(10);

    var geoPoint = ejs.GeoPoint(),
      expected,
      doTest = function () {
        test.deepEqual(geoPoint.toJSON(), expected);
      };

    expected = [0, 0];

    test.ok(geoPoint, 'GeoPoint exists');
    test.ok(geoPoint.toJSON(), 'toJSON() works');
    doTest();

    // [lat, lon] constructor converted to GeoJSON [lon, lat]
    geoPoint = ejs.GeoPoint([37.7819288, -122.396480]);
    expected = [-122.396480, 37.7819288];
    doTest();

    geoPoint.properties({lat: 37.7817289, lon: -122.396181});
    expected = {lat: 37.7817289, lon: -122.396181};
    doTest();

    geoPoint.properties({geohash: "drm3btev3e86"});
    expected = {geohash: "drm3btev3e86"};
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


    test.done();
  },
  ScriptField: function (test) {
    test.expect(8);

    var cp = ejs.ScriptField('f'),
      expected,
      doTest = function () {
        test.deepEqual(cp.toJSON(), expected);
      };

    expected = {
      f: {}
    };

    test.ok(cp, 'ScriptField exists');
    test.ok(cp.toJSON(), 'toJSON() works');
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


    test.done();
  },
  Request: function (test) {
    test.expect(56);

    var req = ejs.Request(),
      matchAll = ejs.MatchAllQuery(),
      termQuery = ejs.TermQuery('t', 'v'),
      termFilter = ejs.TermFilter('tf', 'vf'),
      filterFacet = ejs.FilterFacet('my_filter_facet').filter(termFilter),
      termsFacet = ejs.TermsFacet('my_terms_facet').field('author'),
      globalAgg = ejs.GlobalAggregation('myglobal'),
      termsAgg = ejs.TermsAggregation('termsagg').field('afield'),
      filterAgg = ejs.FilterAggregation('filteragg').filter(termFilter),
      scriptField = ejs.ScriptField('my_script_field')
        .script('doc["my_field_name"].value * 2'),
      scriptField2 = ejs.ScriptField('my_script_field2')
        .script("doc['my_field_name'].value * factor")
        .params({'factor': 2.0}),
      termSuggest = ejs.TermSuggester('my_term_suggester')
        .text('sugest termsz'),
      phraseSuggest = ejs.PhraseSuggester('my_phrase_suggester'),
      rescore = ejs.Rescore(1000, termQuery).queryWeight(3),
      expected,
      doTest = function () {
        test.deepEqual(req.toJSON(), expected);
      };

    expected = {};

    req = ejs.Request().query(matchAll);
    expected = {
      query: matchAll.toJSON()
    };
    doTest();

    req.timeout(5000);
    expected.timeout = 5000;
    doTest();

    req.sort('field1');
    expected.sort = ['field1'];
    doTest();

    req.sort('field2', 'asc');
    expected.sort.push({field2: {order: 'asc'}});
    doTest();

    req.sort('field3', 'invalid');
    doTest();

    req.sort('field3', 'DESC');
    expected.sort.push({field3: {order: 'desc'}});
    doTest();

    req.sort(ejs.Sort('field4').asc());
    expected.sort.push({field4: {order: 'asc'}});
    doTest();

    var geoSort = ejs.Sort('location')
      .geoDistance(ejs.GeoPoint([37.7819288, -122.396480]))
      .unit('mi').normalize(true);
    req.sort(geoSort);
    expected.sort.push(geoSort.toJSON());
    doTest();

    req.sort(['field5', geoSort]);
    expected.sort = ['field5', geoSort.toJSON()];
    doTest();

    test.deepEqual(req.sort(), expected.sort);

    req.trackScores(true);
    expected.track_scores = true;
    doTest();

    req.fields('field1');
    expected.fields = ['field1'];
    doTest();

    req.fields('field2');
    expected.fields.push('field2');
    doTest();

    req.fields(['field3', 'field4']);
    expected.fields = ['field3', 'field4'];
    doTest();

    req.source('i1', 'e1');
    expected._source = {
      includes: 'i1',
      excludes: 'e1'
    };
    doTest();

    req.source(['i1', 'i2'], ['e1', 'e2']);
    expected._source = {
      includes: ['i1', 'i2'],
      excludes: ['e1', 'e2']
    };
    doTest();

    req.source(['i1', 'i2']);
    expected._source = {
      includes: ['i1', 'i2']
    };
    doTest();

    req.source(false);
    expected._source = false;
    doTest();

    var hlt = ejs.Highlight('body').fragmentSize(500, 'body');

    req.highlight(hlt);
    expected.highlight = hlt.toJSON();
    doTest();

    req.size(20);
    expected.size = 20;
    doTest();

    req.from(10);
    expected.from = 10;
    doTest();

    req.query(termQuery);
    expected.query = termQuery.toJSON();
    doTest();

    req.facet(filterFacet);
    expected.facets = filterFacet.toJSON();
    doTest();

    req.facet(termsFacet);
    // extend is not avaiable in tests so just set place the facet
    // value into the existing facets object
    expected.facets.my_terms_facet = termsFacet.toJSON().my_terms_facet;
    doTest();

    req.agg(filterAgg);
    expected.aggs = filterAgg.toJSON();
    doTest();

    req.aggregation(globalAgg.agg(termsAgg));
    expected.aggs.myglobal = globalAgg.toJSON().myglobal;
    doTest();

    req.filter(termFilter);
    expected.filter = termFilter.toJSON();
    doTest();

    req.suggest("global suggest text");
    expected.suggest = {text: 'global suggest text'};
    doTest();

    req.suggest(termSuggest);
    expected.suggest.my_term_suggester = termSuggest.toJSON().my_term_suggester;
    doTest();

    req.suggest(phraseSuggest);
    expected.suggest.my_phrase_suggester = phraseSuggest.toJSON().my_phrase_suggester;
    doTest();

    req.rescore(rescore);
    expected.rescore = rescore.toJSON();
    doTest();

    req.scriptField(scriptField);
    expected.script_fields = scriptField.toJSON();
    doTest();

    req.scriptField(scriptField2);
    expected.script_fields.my_script_field2 = scriptField2.toJSON().my_script_field2;
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

    test.throws(function () {
      req.query('invalid');
    }, TypeError);

    test.throws(function () {
      req.facet('invalid');
    }, TypeError);

    test.throws(function () {
      req.agg('invalid');
    }, TypeError);

    test.throws(function () {
      req.aggregation('invalid');
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

    test.throws(function () {
      req.suggest(3);
    }, TypeError);

    test.throws(function () {
      req.rescore('invalid');
    }, TypeError);

    test.throws(function () {
      req.source(1, "ok");
    }, TypeError);

    test.throws(function () {
      req.source("ok", 1);
    }, TypeError);

    test.throws(function () {
      req.source(null, "ok");
    }, TypeError);

    test.done();
  }
};
