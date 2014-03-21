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

exports.queries = {
  setUp: function (done) {
    done();
  },
  exists: function (test) {
    test.expect(40);

    test.ok(ejs.CommonTermsQuery, 'CommonTermsQuery');
    test.ok(ejs.RegexpQuery, 'RegexpQuery');
    test.ok(ejs.GeoShapeQuery, 'GeoShapeQuery');
    test.ok(ejs.IndicesQuery, 'IndicesQuery');
    test.ok(ejs.WildcardQuery, 'WildcardQuery');
    test.ok(ejs.TopChildrenQuery, 'TopChildrenQuery');
    test.ok(ejs.TermsQuery, 'TermsQuery');
    test.ok(ejs.RangeQuery, 'RangeQuery');
    test.ok(ejs.PrefixQuery, 'PrefixQuery');
    test.ok(ejs.MoreLikeThisFieldQuery, 'MoreLikeThisFieldQuery');
    test.ok(ejs.MoreLikeThisQuery, 'MoreLikeThisQuery');
    test.ok(ejs.HasParentQuery, 'HasParentQuery');
    test.ok(ejs.HasChildQuery, 'HasChildQuery');
    test.ok(ejs.FuzzyQuery, 'FuzzyQuery');
    test.ok(ejs.FuzzyLikeThisFieldQuery, 'FuzzyLikeThisFieldQuery');
    test.ok(ejs.FuzzyLikeThisQuery, 'FuzzyLikeThisQuery');
    test.ok(ejs.IdsQuery, 'IdsQuery');
    test.ok(ejs.BoostingQuery, 'BoostingQuery');
    test.ok(ejs.MatchQuery, 'MatchQuery');
    test.ok(ejs.MultiMatchQuery, 'MultiMatchQuery');
    test.ok(ejs.TermQuery, 'TermQuery');
    test.ok(ejs.BoolQuery, 'BoolQuery');
    test.ok(ejs.DisMaxQuery, 'DisMaxQuery');
    test.ok(ejs.QueryStringQuery, 'QueryStringQuery');
    test.ok(ejs.FilteredQuery, 'FilteredQuery');
    test.ok(ejs.NestedQuery, 'NestedQuery');
    test.ok(ejs.ConstantScoreQuery, 'ConstantScoreQuery');
    test.ok(ejs.MatchAllQuery, 'MatchAllQuery');
    test.ok(ejs.SpanTermQuery, 'SpanTermQuery');
    test.ok(ejs.SpanNearQuery, 'SpanNearQuery');
    test.ok(ejs.SpanNotQuery, 'SpanNotQuery');
    test.ok(ejs.SpanOrQuery, 'SpanOrQuery');
    test.ok(ejs.SpanFirstQuery, 'SpanFirstQuery');
    test.ok(ejs.SpanMultiTermQuery, 'SpanMultiTermQuery');
    test.ok(ejs.FieldMaskingSpanQuery, 'FieldMaskingSpanQuery');
    test.ok(ejs.FunctionScoreQuery, 'FunctionScoreQuery');

    // scoring functions for FunctionScoreQuery
    test.ok(ejs.BoostFactorScoreFunction, 'BoostFactorScoreFunction');
    test.ok(ejs.DecayScoreFunction, 'DecayScoreFunction');
    test.ok(ejs.RandomScoreFunction, 'RandomScoreFunction');
    test.ok(ejs.ScriptScoreFunction, 'ScriptScoreFunction');

    test.done();
  },
  DecayScoreFunction: function (test) {
    test.expect(16);

    var scoreFunc = ejs.DecayScoreFunction('f'),
      termFilter1 = ejs.TermFilter('tf1', 'fv1'),
      geoPoint = ejs.GeoPoint([37.7819288, -122.396480]),
      expected,
      doTest = function () {
        test.deepEqual(scoreFunc.toJSON(), expected);
      };

    expected = {
      gauss: {f: {}}
    };

    test.ok(scoreFunc, 'DecayScoreFunction exists');
    test.ok(scoreFunc.toJSON(), 'toJSON() works');
    doTest();

    scoreFunc.field('f2');
    expected.gauss = {f2: {}};
    doTest();

    scoreFunc.decay(0.5);
    expected.gauss.f2.decay = 0.5;
    doTest();

    scoreFunc.linear();
    expected.linear = expected.gauss;
    delete expected.gauss;
    doTest();

    scoreFunc.exp();
    expected.exp = expected.linear;
    delete expected.linear;
    doTest();

    scoreFunc.gauss();
    expected.gauss = expected.exp;
    delete expected.exp;
    doTest();

    scoreFunc.scale('10d');
    expected.gauss.f2.scale = '10d';
    doTest();

    scoreFunc.origin('2013-09-17');
    expected.gauss.f2.origin = '2013-09-17';
    doTest();

    scoreFunc.origin(geoPoint);
    expected.gauss.f2.origin = geoPoint.toJSON();
    doTest();

    scoreFunc.offset('2d');
    expected.gauss.f2.offset = '2d';
    doTest();

    scoreFunc.filter(termFilter1);
    expected.filter = termFilter1.toJSON();
    doTest();

    test.strictEqual(scoreFunc._type(), 'score function');

    test.throws(function () {
      scoreFunc.filter('invalid');
    }, TypeError);

    test.throws(function () {
      scoreFunc.origin(termFilter1);
    }, TypeError);

    test.done();
  },
  ScriptScoreFunction: function (test) {
    test.expect(9);

    var scoreFunc = ejs.ScriptScoreFunction(),
      termFilter1 = ejs.TermFilter('tf1', 'fv1'),
      expected,
      doTest = function () {
        test.deepEqual(scoreFunc.toJSON(), expected);
      };

    expected = {
      script_score: {}
    };

    test.ok(scoreFunc, 'ScriptScoreFunction exists');
    test.ok(scoreFunc.toJSON(), 'toJSON() works');
    doTest();

    scoreFunc.script('s1');
    expected.script_score.script = 's1';
    doTest();

    scoreFunc.lang('mvel');
    expected.script_score.lang = 'mvel';
    doTest();

    scoreFunc.params({p1: 'v1'});
    expected.script_score.params = {p1: 'v1'};
    doTest();

    scoreFunc.filter(termFilter1);
    expected.filter = termFilter1.toJSON();
    doTest();

    test.strictEqual(scoreFunc._type(), 'score function');

    test.throws(function () {
      scoreFunc.filter('invalid');
    }, TypeError);

    test.done();
  },
  RandomScoreFunction: function (test) {
    test.expect(7);

    var scoreFunc = ejs.RandomScoreFunction(),
      termFilter1 = ejs.TermFilter('tf1', 'fv1'),
      expected,
      doTest = function () {
        test.deepEqual(scoreFunc.toJSON(), expected);
      };

    expected = {
      random_score: {}
    };

    test.ok(scoreFunc, 'RandomScoreFunction exists');
    test.ok(scoreFunc.toJSON(), 'toJSON() works');
    doTest();

    scoreFunc.seed(123);
    expected.random_score.seed = 123;
    doTest();

    scoreFunc.filter(termFilter1);
    expected.filter = termFilter1.toJSON();
    doTest();

    test.strictEqual(scoreFunc._type(), 'score function');

    test.throws(function () {
      scoreFunc.filter('invalid');
    }, TypeError);

    test.done();
  },
  BoostFactorScoreFunction: function (test) {
    test.expect(7);

    var scoreFunc = ejs.BoostFactorScoreFunction(2),
      termFilter1 = ejs.TermFilter('tf1', 'fv1'),
      expected,
      doTest = function () {
        test.deepEqual(scoreFunc.toJSON(), expected);
      };

    expected = {
      boost_factor: 2
    };

    test.ok(scoreFunc, 'BoostFactorScoreFunction exists');
    test.ok(scoreFunc.toJSON(), 'toJSON() works');
    doTest();

    scoreFunc.boost(3);
    expected.boost_factor = 3;
    doTest();

    scoreFunc.filter(termFilter1);
    expected.filter = termFilter1.toJSON();
    doTest();

    test.strictEqual(scoreFunc._type(), 'score function');

    test.throws(function () {
      scoreFunc.filter('invalid');
    }, TypeError);

    test.done();
  },
  FunctionScoreQuery: function (test) {
    test.expect(30);

    var termQuery1 = ejs.TermQuery('t1', 'v1'),
      termFilter1 = ejs.TermFilter('tf1', 'fv1'),
      randomScore = ejs.RandomScoreFunction(),
      randomScore2 = ejs.RandomScoreFunction().seed(3),
      boostFactor = ejs.BoostFactorScoreFunction(1.1).filter(termFilter1),
      funcQuery = ejs.FunctionScoreQuery(),
      expected,
      doTest = function () {
        test.deepEqual(funcQuery.toJSON(), expected);
      };

    expected = {
      function_score: {}
    };

    test.ok(funcQuery, 'FunctionScoreQuery exists');
    test.ok(funcQuery.toJSON(), 'toJSON() works');
    doTest();

    funcQuery.query(termQuery1);
    expected.function_score.query = termQuery1.toJSON();
    doTest();

    funcQuery.filter(termFilter1);
    expected.function_score.filter = termFilter1.toJSON();
    doTest();

    funcQuery.scoreMode('avg');
    expected.function_score.score_mode = 'avg';
    doTest();

    funcQuery.scoreMode('invalid');
    doTest();

    funcQuery.scoreMode('MAX');
    expected.function_score.score_mode = 'max';
    doTest();

    funcQuery.scoreMode('mIN');
    expected.function_score.score_mode = 'min';
    doTest();

    funcQuery.scoreMode('sum');
    expected.function_score.score_mode = 'sum';
    doTest();

    funcQuery.scoreMode('multiply');
    expected.function_score.score_mode = 'multiply';
    doTest();

    funcQuery.scoreMode('FIRST');
    expected.function_score.score_mode = 'first';
    doTest();

    funcQuery.boostMode('multiply');
    expected.function_score.boost_mode = 'multiply';
    doTest();

    funcQuery.boostMode('invalid');
    doTest();

    funcQuery.boostMode('REPLACE');
    expected.function_score.boost_mode = 'replace';
    doTest();

    funcQuery.boostMode('Sum');
    expected.function_score.boost_mode = 'sum';
    doTest();

    funcQuery.boostMode('avg');
    expected.function_score.boost_mode = 'avg';
    doTest();

    funcQuery.boostMode('MAX');
    expected.function_score.boost_mode = 'max';
    doTest();

    funcQuery.boostMode('min');
    expected.function_score.boost_mode = 'min';
    doTest();

    funcQuery.boost(2);
    expected.function_score.boost = 2;
    doTest();

    funcQuery.function(randomScore);
    expected.function_score.functions = [randomScore.toJSON()];
    doTest();

    funcQuery.function(boostFactor);
    expected.function_score.functions.push(boostFactor.toJSON());
    doTest();

    funcQuery.functions([boostFactor, randomScore2]);
    expected.function_score.functions = [boostFactor.toJSON(), randomScore2.toJSON()];
    doTest();

    funcQuery.function(randomScore.filter(termFilter1));
    expected.function_score.functions.push(randomScore.toJSON());
    doTest();

    test.strictEqual(funcQuery._type(), 'query');

    test.throws(function () {
      funcQuery.query('invalid');
    }, TypeError);

    test.throws(function () {
      funcQuery.filter('invalid');
    }, TypeError);

    test.throws(function () {
      funcQuery.function('invalid');
    }, TypeError);

    test.throws(function () {
      funcQuery.functions('invalid');
    }, TypeError);

    test.throws(function () {
      funcQuery.functions([randomScore, 'invalid']);
    }, TypeError);

    test.done();
  },
  CommonTermsQuery: function (test) {
    test.expect(21);

    var commonQuery = ejs.CommonTermsQuery(),
      expected,
      doTest = function () {
        test.deepEqual(commonQuery.toJSON(), expected);
      };

    expected = {
      common: {
        no_field_set: {}
      }
    };

    test.ok(commonQuery, 'CommonTermsQuery exists');
    test.ok(commonQuery.toJSON(), 'toJSON() works');
    doTest();

    commonQuery = ejs.CommonTermsQuery('field');
    expected = {
      common: {
        field: {}
      }
    };
    doTest();

    commonQuery = ejs.CommonTermsQuery('field', 'qstr');
    expected = {
      common: {
        field: {
          query: 'qstr'
        }
      }
    };
    doTest();

    commonQuery.field('field2');
    expected = {
      common: {
        field2: {
          query: 'qstr'
        }
      }
    };
    doTest();

    commonQuery.query('qstr2');
    expected.common.field2.query = 'qstr2';
    doTest();

    commonQuery.boost(1.5);
    expected.common.field2.boost = 1.5;
    doTest();

    commonQuery.disableCoord(true);
    expected.common.field2.disable_coord = true;
    doTest();

    commonQuery.cutoffFrequency(0.65);
    expected.common.field2.cutoff_frequency = 0.65;
    doTest();

    commonQuery.highFreqOperator('and');
    expected.common.field2.high_freq_operator = 'and';
    doTest();

    commonQuery.highFreqOperator('junk');
    doTest();

    commonQuery.highFreqOperator('or');
    expected.common.field2.high_freq_operator = 'or';
    doTest();

    commonQuery.lowFreqOperator('and');
    expected.common.field2.low_freq_operator = 'and';
    doTest();

    commonQuery.lowFreqOperator('junk');
    doTest();

    commonQuery.lowFreqOperator('or');
    expected.common.field2.low_freq_operator = 'or';
    doTest();

    commonQuery.analyzer('the analyzer');
    expected.common.field2.analyzer = 'the analyzer';
    doTest();

    commonQuery.minimumShouldMatch(10);
    expected.common.field2.minimum_should_match = {low_freq: 10};
    doTest();

    commonQuery.minimumShouldMatchLowFreq(5);
    expected.common.field2.minimum_should_match.low_freq = 5;
    doTest();

    commonQuery.minimumShouldMatchHighFreq(10);
    expected.common.field2.minimum_should_match.high_freq = 10;
    doTest();

    test.strictEqual(commonQuery._type(), 'query');


    test.done();
  },
  RegexpQuery: function (test) {
    test.expect(16);

    var regexQuery = ejs.RegexpQuery('f1', 'regex'),
      expected,
      doTest = function () {
        test.deepEqual(regexQuery.toJSON(), expected);
      };

    expected = {
      regexp: {
        f1: {
          value: 'regex'
        }
      }
    };

    test.ok(regexQuery, 'RegexpQuery exists');
    test.ok(regexQuery.toJSON(), 'toJSON() works');
    doTest();

    regexQuery.value('regex2');
    expected.regexp.f1.value = 'regex2';
    doTest();

    regexQuery.field('f2');
    expected = {
      regexp: {
        f2: {
          value: 'regex2'
        }
      }
    };
    doTest();

    regexQuery.boost(1.2);
    expected.regexp.f2.boost = 1.2;
    doTest();

    regexQuery.rewrite('constant_score_auto');
    expected.regexp.f2.rewrite = 'constant_score_auto';
    doTest();

    regexQuery.rewrite('invalid');
    doTest();

    regexQuery.rewrite('scoring_boolean');
    expected.regexp.f2.rewrite = 'scoring_boolean';
    doTest();

    regexQuery.rewrite('constant_score_boolean');
    expected.regexp.f2.rewrite = 'constant_score_boolean';
    doTest();

    regexQuery.rewrite('constant_score_filter');
    expected.regexp.f2.rewrite = 'constant_score_filter';
    doTest();

    regexQuery.rewrite('top_terms_boost_5');
    expected.regexp.f2.rewrite = 'top_terms_boost_5';
    doTest();

    regexQuery.rewrite('top_terms_9');
    expected.regexp.f2.rewrite = 'top_terms_9';
    doTest();

    regexQuery.flags('INTERSECTION|EMPTY');
    expected.regexp.f2.flags = 'INTERSECTION|EMPTY';
    doTest();

    regexQuery.flagsValue(-1);
    expected.regexp.f2.flags_value = -1;
    doTest();

    test.strictEqual(regexQuery._type(), 'query');


    test.done();
  },
  GeoShapeQuery: function (test) {
    test.expect(17);

    var geoShapeQuery = ejs.GeoShapeQuery('f1'),
      shape1 = ejs.Shape('envelope', [[-45.0, 45.0], [45.0, -45.0]]),
      shape2 = ejs.Shape('polygon', [[-180.0, 10.0], [20.0, 90.0],
        [180.0, -5.0], [-30.0, -90.0]]),
      iShape1 = ejs.IndexedShape('countries', 'New Zealand'),
      iShape2 = ejs.IndexedShape('state', 'CA')
        .index('states')
        .shapeFieldName('stateShape'),
      expected,
      doTest = function () {
        test.deepEqual(geoShapeQuery.toJSON(), expected);
      };

    expected = {
      geo_shape: {
        f1: {}
      }
    };

    test.ok(geoShapeQuery, 'GeoShapeQuery exists');
    test.ok(geoShapeQuery.toJSON(), 'toJSON() works');
    doTest();

    geoShapeQuery.shape(shape1);
    expected.geo_shape.f1.shape = shape1.toJSON();
    doTest();

    geoShapeQuery.field('f2');
    expected = {
      geo_shape: {
        f2: {
          shape: shape1.toJSON()
        }
      }
    };
    doTest();

    geoShapeQuery.shape(shape2);
    expected.geo_shape.f2.shape = shape2.toJSON();
    doTest();

    geoShapeQuery.relation('intersects');
    expected.geo_shape.f2.relation = 'intersects';
    doTest();

    geoShapeQuery.relation('INVALID');
    doTest();

    geoShapeQuery.relation('DisJoint');
    expected.geo_shape.f2.relation = 'disjoint';
    doTest();

    geoShapeQuery.relation('WITHIN');
    expected.geo_shape.f2.relation = 'within';
    doTest();

    geoShapeQuery.indexedShape(iShape1);
    delete expected.geo_shape.f2.shape;
    expected.geo_shape.f2.indexed_shape = iShape1.toJSON();
    doTest();

    geoShapeQuery.indexedShape(iShape2);
    expected.geo_shape.f2.indexed_shape = iShape2.toJSON();
    doTest();

    geoShapeQuery.strategy('recursive');
    expected.geo_shape.f2.strategy = 'recursive';
    doTest();

    geoShapeQuery.strategy('INVALID');
    doTest();

    geoShapeQuery.strategy('TERM');
    expected.geo_shape.f2.strategy = 'term';
    doTest();

    geoShapeQuery.boost(1.5);
    expected.geo_shape.f2.boost = 1.5;
    doTest();

    test.strictEqual(geoShapeQuery._type(), 'query');


    test.done();
  },
  IndicesQuery: function (test) {
    test.expect(19);

    var termQuery = ejs.TermQuery('t1', 'v1'),
      termQuery2 = ejs.TermQuery('t2', 'v2'),
      termQuery3 = ejs.TermQuery('t3', 'v3'),
      indicesQuery = ejs.IndicesQuery(termQuery, 'i1'),
      expected,
      doTest = function () {
        test.deepEqual(indicesQuery.toJSON(), expected);
      };

    expected = {
      indices: {
        query: termQuery.toJSON(),
        indices: ['i1']
      }
    };

    test.ok(indicesQuery, 'IndicesQuery exists');
    test.ok(indicesQuery.toJSON(), 'toJSON() works');
    doTest();

    indicesQuery = ejs.IndicesQuery(termQuery, ['i2', 'i3']);
    expected.indices.indices = ['i2', 'i3'];
    doTest();

    indicesQuery.indices('i4');
    expected.indices.indices.push('i4');
    doTest();

    indicesQuery.indices(['i5']);
    expected.indices.indices = ['i5'];
    doTest();

    indicesQuery.query(termQuery2);
    expected.indices.query = termQuery2.toJSON();
    doTest();

    indicesQuery.noMatchQuery('invalid');
    doTest();

    indicesQuery.noMatchQuery('none');
    expected.indices.no_match_query = 'none';
    doTest();

    indicesQuery.noMatchQuery('ALL');
    expected.indices.no_match_query = 'all';
    doTest();

    indicesQuery.noMatchQuery(termQuery3);
    expected.indices.no_match_query = termQuery3.toJSON();
    doTest();

    indicesQuery.boost(1.5);
    expected.indices.boost = 1.5;
    doTest();

    indicesQuery.query(termQuery2);
    expected.indices.query = termQuery2.toJSON();
    doTest();

    test.strictEqual(indicesQuery._type(), 'query');


    test.throws(function () {
      ejs.IndicesQuery('invalid', 'index1');
    }, TypeError);

    test.throws(function () {
      ejs.IndicesQuery(termQuery2, 3);
    }, TypeError);

    test.throws(function () {
      indicesQuery.query('invalid');
    }, TypeError);

    test.throws(function () {
      indicesQuery.noMatchQuery(2);
    }, TypeError);

    test.throws(function () {
      indicesQuery.indices(1);
    }, TypeError);

    test.done();
  },
  WildcardQuery: function (test) {
    test.expect(14);

    var wildcardQuery = ejs.WildcardQuery('f1', 'wild*card'),
      expected,
      doTest = function () {
        test.deepEqual(wildcardQuery.toJSON(), expected);
      };

    expected = {
      wildcard: {
        f1: {
          value: 'wild*card'
        }
      }
    };

    test.ok(wildcardQuery, 'WildcardQuery exists');
    test.ok(wildcardQuery.toJSON(), 'toJSON() works');
    doTest();

    wildcardQuery.boost(1.5);
    expected.wildcard.f1.boost = 1.5;
    doTest();

    wildcardQuery.rewrite('constant_score_auto');
    expected.wildcard.f1.rewrite = 'constant_score_auto';
    doTest();

    wildcardQuery.rewrite('invalid');
    doTest();

    wildcardQuery.rewrite('scoring_boolean');
    expected.wildcard.f1.rewrite = 'scoring_boolean';
    doTest();

    wildcardQuery.rewrite('constant_score_boolean');
    expected.wildcard.f1.rewrite = 'constant_score_boolean';
    doTest();

    wildcardQuery.rewrite('constant_score_filter');
    expected.wildcard.f1.rewrite = 'constant_score_filter';
    doTest();

    wildcardQuery.rewrite('top_terms_boost_5');
    expected.wildcard.f1.rewrite = 'top_terms_boost_5';
    doTest();

    wildcardQuery.rewrite('top_terms_9');
    expected.wildcard.f1.rewrite = 'top_terms_9';
    doTest();

    wildcardQuery.field('f2');
    expected = {
      wildcard: {
        f2: {
          value: 'wild*card',
          boost: 1.5,
          rewrite: 'top_terms_9'
        }
      }
    };
    doTest();

    wildcardQuery.value('wild?card');
    expected.wildcard.f2.value = 'wild?card';
    doTest();

    test.strictEqual(wildcardQuery._type(), 'query');


    test.done();
  },
  TopChildrenQuery: function (test) {
    test.expect(21);

    var termQuery = ejs.TermQuery('t1', 'v1'),
      termQuery2 = ejs.TermQuery('t2', 'v2'),
      topChildren = ejs.TopChildrenQuery(termQuery, 't1'),
      expected,
      doTest = function () {
        test.deepEqual(topChildren.toJSON(), expected);
      };

    expected = {
      top_children: {
        query: termQuery.toJSON(),
        type: 't1'
      }
    };

    test.ok(topChildren, 'TopChildrenQuery exists');
    test.ok(topChildren.toJSON(), 'toJSON() works');
    doTest();

    topChildren.query(termQuery2);
    expected.top_children.query = termQuery2.toJSON();
    doTest();

    topChildren.type('t2');
    expected.top_children.type = 't2';
    doTest();

    topChildren.boost(1.2);
    expected.top_children.boost = 1.2;
    doTest();

    topChildren.score('silently fail');
    doTest();

    topChildren.score('max');
    expected.top_children.score = 'max';
    doTest();

    topChildren.score('SUM');
    expected.top_children.score = 'sum';
    doTest();

    topChildren.score('avg');
    expected.top_children.score = 'avg';
    doTest();

    topChildren.score('total');
    expected.top_children.score = 'total';
    doTest();

    topChildren.scoreMode('silently fail');
    doTest();

    topChildren.scoreMode('max');
    expected.top_children.score_mode = 'max';
    doTest();

    topChildren.scoreMode('SUM');
    expected.top_children.score_mode = 'sum';
    doTest();

    topChildren.scoreMode('avg');
    expected.top_children.score_mode = 'avg';
    doTest();

    topChildren.scoreMode('total');
    expected.top_children.score_mode = 'total';
    doTest();

    topChildren.factor(7);
    expected.top_children.factor = 7;
    doTest();

    topChildren.incrementalFactor(3);
    expected.top_children.incremental_factor = 3;
    doTest();

    test.strictEqual(topChildren._type(), 'query');


    test.throws(function () {
      ejs.TopChildrenQuery('invalid', 'type');
    }, TypeError);

    test.throws(function () {
      topChildren.query('invalid');
    }, TypeError);

    test.done();
  },
  TermsQuery: function (test) {
    test.expect(13);

    var termsQuery = ejs.TermsQuery('f1', ['t1', 't2']),
      expected,
      doTest = function () {
        test.deepEqual(termsQuery.toJSON(), expected);
      };

    expected = {
      terms: {
        f1: ['t1', 't2']
      }
    };

    test.ok(termsQuery, 'TermsQuery exists');
    test.ok(termsQuery.toJSON(), 'toJSON() works');
    doTest();

    termsQuery = ejs.TermsQuery('f1', 't3');
    expected = {
      terms: {
        f1: ['t3']
      }
    };
    doTest();

    termsQuery.boost(1.5);
    expected.terms.boost = 1.5;
    doTest();

    termsQuery.minimumShouldMatch(2);
    expected.terms.minimum_should_match = 2;
    doTest();

    termsQuery.field('f2');
    expected = {
      terms: {
        boost: 1.5,
        minimum_should_match: 2,
        f2: ['t3']
      }
    };
    doTest();

    termsQuery.terms('t4');
    expected.terms.f2.push('t4');
    doTest();

    termsQuery.terms(['t5', 't6']);
    expected.terms.f2 = ['t5', 't6'];
    doTest();

    termsQuery.disableCoord(true);
    expected.terms.disable_coord = true;
    doTest();

    test.strictEqual(termsQuery._type(), 'query');


    test.throws(function () {
      ejs.TermsQuery('f1', 3);
    }, TypeError);

    test.throws(function () {
      termsQuery.terms(2);
    }, TypeError);

    test.done();
  },
  RangeQuery: function (test) {
    test.expect(14);

    var rangeQuery = ejs.RangeQuery('f1'),
      expected,
      doTest = function () {
        test.deepEqual(rangeQuery.toJSON(), expected);
      };

    expected = {
      range: {
        f1: {}
      }
    };

    test.ok(rangeQuery, 'RangeQuery exists');
    test.ok(rangeQuery.toJSON(), 'toJSON() works');
    doTest();

    rangeQuery.from(1);
    expected.range.f1.from = 1;
    doTest();

    rangeQuery.field('f2');
    expected = {
      range: {
        f2: {
          from: 1
        }
      }
    };
    doTest();

    rangeQuery.to(3);
    expected.range.f2.to = 3;
    doTest();

    rangeQuery.includeLower(false);
    expected.range.f2.include_lower = false;
    doTest();

    rangeQuery.includeUpper(true);
    expected.range.f2.include_upper = true;
    doTest();

    rangeQuery.gt(4);
    expected.range.f2.gt = 4;
    doTest();

    rangeQuery.gte(4);
    expected.range.f2.gte = 4;
    doTest();

    rangeQuery.lt(6);
    expected.range.f2.lt = 6;
    doTest();

    rangeQuery.lte(6);
    expected.range.f2.lte = 6;
    doTest();

    rangeQuery.boost(1.2);
    expected.range.f2.boost = 1.2;
    doTest();

    test.strictEqual(rangeQuery._type(), 'query');


    test.done();
  },
  PrefixQuery: function (test) {
    test.expect(14);

    var prefixQuery = ejs.PrefixQuery('f1', 'prefix'),
      expected,
      doTest = function () {
        test.deepEqual(prefixQuery.toJSON(), expected);
      };

    expected = {
      prefix: {
        f1: {
          value: 'prefix'
        }
      }
    };

    test.ok(prefixQuery, 'PrefixQuery exists');
    test.ok(prefixQuery.toJSON(), 'toJSON() works');
    doTest();

    prefixQuery.value('prefix2');
    expected.prefix.f1.value = 'prefix2';
    doTest();

    prefixQuery.field('f2');
    expected = {
      prefix: {
        f2: {
          value: 'prefix2'
        }
      }
    };
    doTest();

    prefixQuery.boost(1.2);
    expected.prefix.f2.boost = 1.2;
    doTest();

    prefixQuery.rewrite('constant_score_auto');
    expected.prefix.f2.rewrite = 'constant_score_auto';
    doTest();

    prefixQuery.rewrite('invalid');
    doTest();

    prefixQuery.rewrite('scoring_boolean');
    expected.prefix.f2.rewrite = 'scoring_boolean';
    doTest();

    prefixQuery.rewrite('constant_score_boolean');
    expected.prefix.f2.rewrite = 'constant_score_boolean';
    doTest();

    prefixQuery.rewrite('constant_score_filter');
    expected.prefix.f2.rewrite = 'constant_score_filter';
    doTest();

    prefixQuery.rewrite('top_terms_boost_5');
    expected.prefix.f2.rewrite = 'top_terms_boost_5';
    doTest();

    prefixQuery.rewrite('top_terms_9');
    expected.prefix.f2.rewrite = 'top_terms_9';
    doTest();

    test.strictEqual(prefixQuery._type(), 'query');


    test.done();
  },
  MoreLikeThisFieldQuery: function (test) {
    test.expect(18);

    var mltQuery = ejs.MoreLikeThisFieldQuery('f1', 'like text'),
      expected,
      doTest = function () {
        test.deepEqual(mltQuery.toJSON(), expected);
      };

    expected = {
      mlt_field: {
        f1: {
          like_text: 'like text'
        }
      }
    };

    test.ok(mltQuery, 'MoreLikeThisFieldQuery exists');
    test.ok(mltQuery.toJSON(), 'toJSON() works');
    doTest();

    mltQuery.likeText('like text 2');
    expected.mlt_field.f1.like_text = 'like text 2';
    doTest();

    mltQuery.field('f2');
    expected = {
      mlt_field: {
        f2: {
          like_text: 'like text 2'
        }
      }
    };
    doTest();

    mltQuery.percentTermsToMatch(0.7);
    expected.mlt_field.f2.percent_terms_to_match = 0.7;
    doTest();

    mltQuery.minTermFreq(3);
    expected.mlt_field.f2.min_term_freq = 3;
    doTest();

    mltQuery.maxQueryTerms(6);
    expected.mlt_field.f2.max_query_terms = 6;
    doTest();

    mltQuery.stopWords(['s1', 's2']);
    expected.mlt_field.f2.stop_words = ['s1', 's2'];
    doTest();

    mltQuery.minDocFreq(2);
    expected.mlt_field.f2.min_doc_freq = 2;
    doTest();

    mltQuery.maxDocFreq(4);
    expected.mlt_field.f2.max_doc_freq = 4;
    doTest();

    mltQuery.minWordLen(3);
    expected.mlt_field.f2.min_word_len = 3;
    doTest();

    mltQuery.maxWordLen(6);
    expected.mlt_field.f2.max_word_len = 6;
    doTest();

    mltQuery.boostTerms(1.3);
    expected.mlt_field.f2.boost_terms = 1.3;
    doTest();

    mltQuery.failOnUnsupportedField(false);
    expected.mlt_field.f2.fail_on_unsupported_field = false;
    doTest();

    mltQuery.analyzer('some analyzer');
    expected.mlt_field.f2.analyzer = 'some analyzer';
    doTest();

    mltQuery.boost(1.2);
    expected.mlt_field.f2.boost = 1.2;
    doTest();

    test.strictEqual(mltQuery._type(), 'query');


    test.done();
  },
  MoreLikeThisQuery: function (test) {
    test.expect(22);

    var mltQuery = ejs.MoreLikeThisQuery(['f', 'f2'], 'like text'),
      expected,
      doTest = function () {
        test.deepEqual(mltQuery.toJSON(), expected);
      };

    expected = {
      mlt: {
        like_text: 'like text',
        fields: ['f', 'f2']
      }
    };

    test.ok(mltQuery, 'MoreLikeThisQuery exists');
    test.ok(mltQuery.toJSON(), 'toJSON() works');
    doTest();

    mltQuery = ejs.MoreLikeThisQuery('f', 'like text');
    expected = {
      mlt: {
        like_text: 'like text',
        fields: ['f']
      }
    };
    doTest();

    mltQuery.fields('f2');
    expected.mlt.fields.push('f2');
    doTest();

    mltQuery.fields(['f3', 'f4']);
    expected.mlt.fields = ['f3', 'f4'];
    doTest();

    mltQuery.likeText('like text 2');
    expected.mlt.like_text = 'like text 2';
    doTest();

    mltQuery.percentTermsToMatch(0.7);
    expected.mlt.percent_terms_to_match = 0.7;
    doTest();

    mltQuery.minTermFreq(3);
    expected.mlt.min_term_freq = 3;
    doTest();

    mltQuery.maxQueryTerms(6);
    expected.mlt.max_query_terms = 6;
    doTest();

    mltQuery.stopWords(['s1', 's2']);
    expected.mlt.stop_words = ['s1', 's2'];
    doTest();

    mltQuery.minDocFreq(2);
    expected.mlt.min_doc_freq = 2;
    doTest();

    mltQuery.maxDocFreq(4);
    expected.mlt.max_doc_freq = 4;
    doTest();

    mltQuery.minWordLen(3);
    expected.mlt.min_word_len = 3;
    doTest();

    mltQuery.maxWordLen(6);
    expected.mlt.max_word_len = 6;
    doTest();

    mltQuery.boostTerms(1.3);
    expected.mlt.boost_terms = 1.3;
    doTest();

    mltQuery.failOnUnsupportedField(false);
    expected.mlt.fail_on_unsupported_field = false;
    doTest();

    mltQuery.analyzer('some analyzer');
    expected.mlt.analyzer = 'some analyzer';
    doTest();

    mltQuery.boost(1.2);
    expected.mlt.boost = 1.2;
    doTest();

    test.strictEqual(mltQuery._type(), 'query');


    test.throws(function () {
      ejs.MoreLikeThisQuery(9, 'like');
    }, TypeError);

    test.throws(function () {
      mltQuery.fields(3);
    }, TypeError);

    test.done();
  },
  HasParentQuery: function (test) {
    test.expect(15);

    var termQuery = ejs.TermQuery('t1', 'v1'),
      termQuery2 = ejs.TermQuery('t2', 'v2'),
      hasParentQuery = ejs.HasParentQuery(termQuery, 't1'),
      expected,
      doTest = function () {
        test.deepEqual(hasParentQuery.toJSON(), expected);
      };

    expected = {
      has_parent: {
        query: termQuery.toJSON(),
        parent_type: 't1'
      }
    };

    test.ok(hasParentQuery, 'HasParentQuery exists');
    test.ok(hasParentQuery.toJSON(), 'toJSON() works');
    doTest();

    hasParentQuery.query(termQuery2);
    expected.has_parent.query = termQuery2.toJSON();
    doTest();

    hasParentQuery.parentType('t2');
    expected.has_parent.parent_type = 't2';
    doTest();

    hasParentQuery.scoreType('none');
    expected.has_parent.score_type = 'none';
    doTest();

    hasParentQuery.scoreType('INVALID');
    doTest();

    hasParentQuery.scoreType('SCORE');
    expected.has_parent.score_type = 'score';
    doTest();

    hasParentQuery.scoreMode('none');
    expected.has_parent.score_mode = 'none';
    doTest();

    hasParentQuery.scoreMode('INVALID');
    doTest();

    hasParentQuery.scoreMode('SCORE');
    expected.has_parent.score_mode = 'score';
    doTest();

    hasParentQuery.boost(1.2);
    expected.has_parent.boost = 1.2;
    doTest();

    test.strictEqual(hasParentQuery._type(), 'query');


    test.throws(function () {
      ejs.HasParentQuery('invalid', 'type');
    }, TypeError);

    test.throws(function () {
      hasParentQuery.query('invalid');
    }, TypeError);

    test.done();
  },
  HasChildQuery: function (test) {
    test.expect(20);

    var termQuery = ejs.TermQuery('t1', 'v1'),
      termQuery2 = ejs.TermQuery('t2', 'v2'),
      hasChildQuery = ejs.HasChildQuery(termQuery, 't1'),
      expected,
      doTest = function () {
        test.deepEqual(hasChildQuery.toJSON(), expected);
      };

    expected = {
      has_child: {
        query: termQuery.toJSON(),
        type: 't1'
      }
    };

    test.ok(hasChildQuery, 'HasChildQuery exists');
    test.ok(hasChildQuery.toJSON(), 'toJSON() works');
    doTest();

    hasChildQuery.query(termQuery2);
    expected.has_child.query = termQuery2.toJSON();
    doTest();

    hasChildQuery.type('t2');
    expected.has_child.type = 't2';
    doTest();

    hasChildQuery.scoreType('none');
    expected.has_child.score_type = 'none';
    doTest();

    hasChildQuery.scoreType('INVALID');
    doTest();

    hasChildQuery.scoreType('MAX');
    expected.has_child.score_type = 'max';
    doTest();

    hasChildQuery.scoreType('Avg');
    expected.has_child.score_type = 'avg';
    doTest();

    hasChildQuery.scoreType('sum');
    expected.has_child.score_type = 'sum';
    doTest();

    hasChildQuery.scoreMode('none');
    expected.has_child.score_mode = 'none';
    doTest();

    hasChildQuery.scoreMode('INVALID');
    doTest();

    hasChildQuery.scoreMode('MAX');
    expected.has_child.score_mode = 'max';
    doTest();

    hasChildQuery.scoreMode('Avg');
    expected.has_child.score_mode = 'avg';
    doTest();

    hasChildQuery.scoreMode('sum');
    expected.has_child.score_mode = 'sum';
    doTest();

    hasChildQuery.shortCircuitCutoff(8192);
    expected.has_child.short_circuit_cutoff = 8192;
    doTest();

    hasChildQuery.boost(1.2);
    expected.has_child.boost = 1.2;
    doTest();

    test.strictEqual(hasChildQuery._type(), 'query');


    test.throws(function () {
      ejs.HasChildQuery('invalid', 'type');
    }, TypeError);

    test.throws(function () {
      hasChildQuery.query('invalid');
    }, TypeError);

    test.done();
  },
  FuzzyQuery: function (test) {
    test.expect(18);

    var fuzzyQuery = ejs.FuzzyQuery('f1', 'fuzz'),
      expected,
      doTest = function () {
        test.deepEqual(fuzzyQuery.toJSON(), expected);
      };

    expected = {
      fuzzy: {
        f1: {
          value: 'fuzz'
        }
      }
    };

    test.ok(fuzzyQuery, 'FuzzyQuery exists');
    test.ok(fuzzyQuery.toJSON(), 'toJSON() works');
    doTest();

    fuzzyQuery.value('fuzz2');
    expected.fuzzy.f1.value = 'fuzz2';
    doTest();

    fuzzyQuery.field('f2');
    expected = {
      fuzzy: {
        f2: {
          value: 'fuzz2'
        }
      }
    };
    doTest();

    fuzzyQuery.transpositions(false);
    expected.fuzzy.f2.transpositions = false;
    doTest();

    fuzzyQuery.maxExpansions(10);
    expected.fuzzy.f2.max_expansions = 10;
    doTest();

    fuzzyQuery.minSimilarity(0.6);
    expected.fuzzy.f2.min_similarity = 0.6;
    doTest();

    fuzzyQuery.prefixLength(4);
    expected.fuzzy.f2.prefix_length = 4;
    doTest();

    fuzzyQuery.rewrite('constant_score_auto');
    expected.fuzzy.f2.rewrite = 'constant_score_auto';
    doTest();

    fuzzyQuery.rewrite('invalid');
    doTest();

    fuzzyQuery.rewrite('scoring_boolean');
    expected.fuzzy.f2.rewrite = 'scoring_boolean';
    doTest();

    fuzzyQuery.rewrite('constant_score_boolean');
    expected.fuzzy.f2.rewrite = 'constant_score_boolean';
    doTest();

    fuzzyQuery.rewrite('constant_score_filter');
    expected.fuzzy.f2.rewrite = 'constant_score_filter';
    doTest();

    fuzzyQuery.rewrite('top_terms_boost_5');
    expected.fuzzy.f2.rewrite = 'top_terms_boost_5';
    doTest();

    fuzzyQuery.rewrite('top_terms_9');
    expected.fuzzy.f2.rewrite = 'top_terms_9';
    doTest();

    fuzzyQuery.boost(1.2);
    expected.fuzzy.f2.boost = 1.2;
    doTest();

    test.strictEqual(fuzzyQuery._type(), 'query');


    test.done();
  },
  FuzzyLikeThisFieldQuery: function (test) {
    test.expect(13);

    var fltQuery = ejs.FuzzyLikeThisFieldQuery('f1', 'like text'),
      expected,
      doTest = function () {
        test.deepEqual(fltQuery.toJSON(), expected);
      };

    expected = {
      flt_field: {
        f1: {
          like_text: 'like text'
        }
      }
    };

    test.ok(fltQuery, 'FuzzyLikeThisFieldQuery exists');
    test.ok(fltQuery.toJSON(), 'toJSON() works');
    doTest();

    fltQuery.likeText('like text 2');
    expected.flt_field.f1.like_text = 'like text 2';
    doTest();

    fltQuery.field('f2');
    expected = {
      flt_field: {
        f2: {
          like_text: 'like text 2'
        }
      }
    };
    doTest();

    fltQuery.ignoreTf(false);
    expected.flt_field.f2.ignore_tf = false;
    doTest();

    fltQuery.maxQueryTerms(10);
    expected.flt_field.f2.max_query_terms = 10;
    doTest();

    fltQuery.minSimilarity(0.6);
    expected.flt_field.f2.min_similarity = 0.6;
    doTest();

    fltQuery.prefixLength(4);
    expected.flt_field.f2.prefix_length = 4;
    doTest();

    fltQuery.analyzer('some analyzer');
    expected.flt_field.f2.analyzer = 'some analyzer';
    doTest();

    fltQuery.failOnUnsupportedField(false);
    expected.flt_field.f2.fail_on_unsupported_field = false;
    doTest();

    fltQuery.boost(1.2);
    expected.flt_field.f2.boost = 1.2;
    doTest();

    test.strictEqual(fltQuery._type(), 'query');


    test.done();
  },
  FuzzyLikeThisQuery: function (test) {
    test.expect(16);

    var fltQuery = ejs.FuzzyLikeThisQuery('like text'),
      expected,
      doTest = function () {
        test.deepEqual(fltQuery.toJSON(), expected);
      };

    expected = {
      flt: {
        like_text: 'like text'
      }
    };

    test.ok(fltQuery, 'FuzzyLikeThisQuery exists');
    test.ok(fltQuery.toJSON(), 'toJSON() works');
    doTest();

    fltQuery.fields('f1');
    expected.flt.fields = ['f1'];
    doTest();

    fltQuery.fields('f2');
    expected.flt.fields.push('f2');
    doTest();

    fltQuery.fields(['f3', 'f4']);
    expected.flt.fields = ['f3', 'f4'];
    doTest();

    fltQuery.likeText('like text 2');
    expected.flt.like_text = 'like text 2';
    doTest();

    fltQuery.ignoreTf(false);
    expected.flt.ignore_tf = false;
    doTest();

    fltQuery.maxQueryTerms(10);
    expected.flt.max_query_terms = 10;
    doTest();

    fltQuery.minSimilarity(0.6);
    expected.flt.min_similarity = 0.6;
    doTest();

    fltQuery.prefixLength(4);
    expected.flt.prefix_length = 4;
    doTest();

    fltQuery.analyzer('some analyzer');
    expected.flt.analyzer = 'some analyzer';
    doTest();

    fltQuery.failOnUnsupportedField(false);
    expected.flt.fail_on_unsupported_field = false;
    doTest();

    fltQuery.boost(1.2);
    expected.flt.boost = 1.2;
    doTest();

    test.strictEqual(fltQuery._type(), 'query');


    test.throws(function () {
      fltQuery.fields(2);
    }, TypeError);

    test.done();
  },
  IdsQuery: function (test) {
    test.expect(14);

    var idsQuery = ejs.IdsQuery('id1'),
      expected,
      doTest = function () {
        test.deepEqual(idsQuery.toJSON(), expected);
      };

    expected = {
      ids: {
        values: ['id1']
      }
    };

    test.ok(idsQuery, 'IdsQuery exists');
    test.ok(idsQuery.toJSON(), 'toJSON() works');
    doTest();

    idsQuery = ejs.IdsQuery(['id2', 'id3']);
    expected.ids.values = ['id2', 'id3'];
    doTest();

    idsQuery.values('id4');
    expected.ids.values.push('id4');
    doTest();

    idsQuery.values(['id5', 'id6']);
    expected.ids.values = ['id5', 'id6'];
    doTest();

    idsQuery.type('type1');
    expected.ids.type = ['type1'];
    doTest();

    idsQuery.type('type2');
    expected.ids.type.push('type2');
    doTest();

    idsQuery.type(['type3', 'type4']);
    expected.ids.type = ['type3', 'type4'];
    doTest();

    idsQuery.boost(0.5);
    expected.ids.boost = 0.5;
    doTest();

    test.strictEqual(idsQuery._type(), 'query');


    test.throws(function () {
      ejs.IdsQuery(2);
    }, TypeError);

    test.throws(function () {
      idsQuery.values(5);
    }, TypeError);

    test.throws(function () {
      idsQuery.type(9);
    }, TypeError);

    test.done();
  },
  BoostingQuery: function (test) {
    test.expect(12);

    var termQuery1 = ejs.TermQuery('t1', 'v1'),
      termQuery2 = ejs.TermQuery('t2', 'v2'),
      boostingQuery = ejs.BoostingQuery(termQuery1, termQuery2, 0.2),
      expected,
      doTest = function () {
        test.deepEqual(boostingQuery.toJSON(), expected);
      };

    expected = {
      boosting: {
        positive: termQuery1.toJSON(),
        negative: termQuery2.toJSON(),
        negative_boost: 0.2
      }
    };

    test.ok(boostingQuery, 'BoostingQuery exists');
    test.ok(boostingQuery.toJSON(), 'toJSON() works');
    doTest();

    boostingQuery.positive(termQuery2);
    expected.boosting.positive = termQuery2.toJSON();
    doTest();

    boostingQuery.negative(termQuery1);
    expected.boosting.negative = termQuery1.toJSON();
    doTest();

    boostingQuery.negativeBoost(0.6);
    expected.boosting.negative_boost = 0.6;
    doTest();

    boostingQuery.boost(3);
    expected.boosting.boost = 3;
    doTest();

    test.strictEqual(boostingQuery._type(), 'query');


    test.throws(function () {
      ejs.BoostingQuery('invalid', termQuery1, 0.2);
    }, TypeError);

    test.throws(function () {
      ejs.BoostingQuery(termQuery1, 'invalid', 0.2);
    }, TypeError);

    test.throws(function () {
      boostingQuery.positive('invalid');
    }, TypeError);

    test.throws(function () {
      boostingQuery.negative('invalid');
    }, TypeError);

    test.done();
  },
  MatchQuery: function (test) {
    test.expect(39);

    var matchQuery = ejs.MatchQuery('t1', 'v1'),
      expected,
      doTest = function () {
        test.deepEqual(matchQuery.toJSON(), expected);
      };

    expected = {
      match: {
        t1: {
          query: 'v1'
        }
      }
    };

    test.ok(matchQuery, 'MatchQuery exists');
    test.ok(matchQuery.toJSON(), 'toJSON() works');
    doTest();

    matchQuery.boost(1.5);
    expected.match.t1.boost = 1.5;
    doTest();

    matchQuery.query('v2');
    expected.match.t1.query = 'v2';
    doTest();

    matchQuery.type('boolean');
    expected.match.t1.type = 'boolean';
    doTest();

    matchQuery.type('junk');
    doTest();

    matchQuery.type('phrase');
    expected.match.t1.type = 'phrase';
    doTest();

    matchQuery.type('phrase_prefix');
    expected.match.t1.type = 'phrase_prefix';
    doTest();

    matchQuery.cutoffFrequency(0.6);
    expected.match.t1.cutoff_frequency = 0.6;
    doTest();

    matchQuery.fuzziness(0.5);
    expected.match.t1.fuzziness = 0.5;
    doTest();

    matchQuery.prefixLength(2);
    expected.match.t1.prefix_length = 2;
    doTest();

    matchQuery.maxExpansions(5);
    expected.match.t1.max_expansions = 5;
    doTest();

    matchQuery.operator('and');
    expected.match.t1.operator = 'and';
    doTest();

    matchQuery.operator('junk');
    doTest();

    matchQuery.operator('or');
    expected.match.t1.operator = 'or';
    doTest();

    matchQuery.slop(15);
    expected.match.t1.slop = 15;
    doTest();

    matchQuery.analyzer('the analyzer');
    expected.match.t1.analyzer = 'the analyzer';
    doTest();

    matchQuery.minimumShouldMatch(10);
    expected.match.t1.minimum_should_match = 10;
    doTest();

    matchQuery.fuzzyRewrite('constant_score_auto');
    expected.match.t1.fuzzy_rewrite = 'constant_score_auto';
    doTest();

    matchQuery.fuzzyRewrite('invalid');
    doTest();

    matchQuery.fuzzyRewrite('scoring_boolean');
    expected.match.t1.fuzzy_rewrite = 'scoring_boolean';
    doTest();

    matchQuery.fuzzyRewrite('constant_score_boolean');
    expected.match.t1.fuzzy_rewrite = 'constant_score_boolean';
    doTest();

    matchQuery.fuzzyRewrite('constant_score_filter');
    expected.match.t1.fuzzy_rewrite = 'constant_score_filter';
    doTest();

    matchQuery.fuzzyRewrite('top_terms_boost_5');
    expected.match.t1.fuzzy_rewrite = 'top_terms_boost_5';
    doTest();

    matchQuery.fuzzyRewrite('top_terms_9');
    expected.match.t1.fuzzy_rewrite = 'top_terms_9';
    doTest();

    matchQuery.rewrite('constant_score_auto');
    expected.match.t1.rewrite = 'constant_score_auto';
    doTest();

    matchQuery.rewrite('invalid');
    doTest();

    matchQuery.rewrite('scoring_boolean');
    expected.match.t1.rewrite = 'scoring_boolean';
    doTest();

    matchQuery.rewrite('constant_score_boolean');
    expected.match.t1.rewrite = 'constant_score_boolean';
    doTest();

    matchQuery.rewrite('constant_score_filter');
    expected.match.t1.rewrite = 'constant_score_filter';
    doTest();

    matchQuery.rewrite('top_terms_boost_5');
    expected.match.t1.rewrite = 'top_terms_boost_5';
    doTest();

    matchQuery.rewrite('top_terms_9');
    expected.match.t1.rewrite = 'top_terms_9';
    doTest();

    matchQuery.fuzzyTranspositions(true);
    expected.match.t1.fuzzy_transpositions = true;
    doTest();

    matchQuery.lenient(true);
    expected.match.t1.lenient = true;
    doTest();

    matchQuery.zeroTermsQuery('all');
    expected.match.t1.zero_terms_query = 'all';
    doTest();

    matchQuery.zeroTermsQuery('invalid');
    doTest();

    matchQuery.zeroTermsQuery('NONE');
    expected.match.t1.zero_terms_query = 'none';
    doTest();

    test.strictEqual(matchQuery._type(), 'query');


    test.done();
  },
  MultiMatchQuery: function (test) {
    test.expect(45);

    var mmQuery = ejs.MultiMatchQuery('t', 'v1'),
      expected,
      doTest = function () {
        test.deepEqual(mmQuery.toJSON(), expected);
      };

    expected = {
      multi_match: {
        query: 'v1',
        fields: ['t']
      }
    };

    mmQuery = ejs.MultiMatchQuery(['t1', 't2'], 'v1');
    expected.multi_match.fields = ['t1', 't2'];
    doTest();

    test.ok(mmQuery, 'MultiMatchQuery exists');
    test.ok(mmQuery.toJSON(), 'toJSON() works');
    doTest();

    mmQuery.boost(1.5);
    expected.multi_match.boost = 1.5;
    doTest();

    mmQuery.query('v2');
    expected.multi_match.query = 'v2';
    doTest();

    mmQuery.fields(['f3', 'f4']);
    expected.multi_match.fields = ['f3', 'f4'];
    doTest();

    mmQuery.fields('f5');
    expected.multi_match.fields.push('f5');
    doTest();

    mmQuery.useDisMax(true);
    expected.multi_match.use_dis_max = true;
    doTest();

    mmQuery.tieBreaker(0.6);
    expected.multi_match.tie_breaker = 0.6;
    doTest();

    mmQuery.type('boolean');
    expected.multi_match.type = 'boolean';
    doTest();

    mmQuery.type('junk');
    doTest();

    mmQuery.type('phrase');
    expected.multi_match.type = 'phrase';
    doTest();

    mmQuery.type('phrase_prefix');
    expected.multi_match.type = 'phrase_prefix';
    doTest();

    mmQuery.cutoffFrequency(0.6);
    expected.multi_match.cutoff_frequency = 0.6;
    doTest();

    mmQuery.fuzziness(0.5);
    expected.multi_match.fuzziness = 0.5;
    doTest();

    mmQuery.prefixLength(2);
    expected.multi_match.prefix_length = 2;
    doTest();

    mmQuery.maxExpansions(5);
    expected.multi_match.max_expansions = 5;
    doTest();

    mmQuery.operator('and');
    expected.multi_match.operator = 'and';
    doTest();

    mmQuery.operator('junk');
    doTest();

    mmQuery.operator('or');
    expected.multi_match.operator = 'or';
    doTest();

    mmQuery.slop(15);
    expected.multi_match.slop = 15;
    doTest();

    mmQuery.analyzer('the analyzer');
    expected.multi_match.analyzer = 'the analyzer';
    doTest();

    mmQuery.minimumShouldMatch(10);
    expected.multi_match.minimum_should_match = 10;
    doTest();

    mmQuery.fuzzyRewrite('constant_score_auto');
    expected.multi_match.fuzzy_rewrite = 'constant_score_auto';
    doTest();

    mmQuery.fuzzyRewrite('invalid');
    doTest();

    mmQuery.fuzzyRewrite('scoring_boolean');
    expected.multi_match.fuzzy_rewrite = 'scoring_boolean';
    doTest();

    mmQuery.fuzzyRewrite('constant_score_boolean');
    expected.multi_match.fuzzy_rewrite = 'constant_score_boolean';
    doTest();

    mmQuery.fuzzyRewrite('constant_score_filter');
    expected.multi_match.fuzzy_rewrite = 'constant_score_filter';
    doTest();

    mmQuery.fuzzyRewrite('top_terms_boost_5');
    expected.multi_match.fuzzy_rewrite = 'top_terms_boost_5';
    doTest();

    mmQuery.fuzzyRewrite('top_terms_9');
    expected.multi_match.fuzzy_rewrite = 'top_terms_9';
    doTest();

    mmQuery.rewrite('constant_score_auto');
    expected.multi_match.rewrite = 'constant_score_auto';
    doTest();

    mmQuery.rewrite('invalid');
    doTest();

    mmQuery.rewrite('scoring_boolean');
    expected.multi_match.rewrite = 'scoring_boolean';
    doTest();

    mmQuery.rewrite('constant_score_boolean');
    expected.multi_match.rewrite = 'constant_score_boolean';
    doTest();

    mmQuery.rewrite('constant_score_filter');
    expected.multi_match.rewrite = 'constant_score_filter';
    doTest();

    mmQuery.rewrite('top_terms_boost_5');
    expected.multi_match.rewrite = 'top_terms_boost_5';
    doTest();

    mmQuery.rewrite('top_terms_9');
    expected.multi_match.rewrite = 'top_terms_9';
    doTest();

    mmQuery.lenient(true);
    expected.multi_match.lenient = true;
    doTest();

    mmQuery.zeroTermsQuery('all');
    expected.multi_match.zero_terms_query = 'all';
    doTest();

    mmQuery.zeroTermsQuery('invalid');
    doTest();

    mmQuery.zeroTermsQuery('NONE');
    expected.multi_match.zero_terms_query = 'none';
    doTest();

    test.strictEqual(mmQuery._type(), 'query');


    test.throws(function () {
      ejs.MultiMatchQuery(3, 'v');
    }, TypeError);

    test.throws(function () {
      mmQuery.fields(2);
    }, TypeError);

    test.done();
  },
  TermQuery: function (test) {
    test.expect(7);

    var termQuery = ejs.TermQuery('f1', 't1'),
      expected,
      doTest = function () {
        test.deepEqual(termQuery.toJSON(), expected);
      };

    expected = {
      term: {
        f1: {
          term: 't1'
        }
      }
    };

    test.ok(termQuery, 'TermQuery exists');
    test.ok(termQuery.toJSON(), 'toJSON() works');
    doTest();

    termQuery.boost(1.5);
    expected.term.f1.boost = 1.5;
    doTest();

    termQuery.field('f2');
    expected = {
      term: {
        f2: {
          term: 't1',
          boost: 1.5
        }
      }
    };
    doTest();

    termQuery.term('t2');
    expected.term.f2.term = 't2';
    doTest();

    test.strictEqual(termQuery._type(), 'query');


    test.done();
  },
  BoolQuery: function (test) {
    test.expect(21);

    var termQuery1 = ejs.TermQuery('t1', 'v1'),
      termQuery2 = ejs.TermQuery('t2', 'v2'),
      termQuery3 = ejs.TermQuery('t3', 'v3'),
      termQuery4 = ejs.TermQuery('t4', 'v4'),
      boolQuery = ejs.BoolQuery(),
      expected,
      doTest = function () {
        test.deepEqual(boolQuery.toJSON(), expected);
      };

    expected = {
      bool: {}
    };

    test.ok(boolQuery, 'BoolQuery exists');
    test.ok(boolQuery.toJSON(), 'toJSON() works');
    doTest();

    boolQuery.must(termQuery1);
    expected.bool.must = [termQuery1.toJSON()];
    doTest();

    boolQuery.must([termQuery2, termQuery3]);
    expected.bool.must = [termQuery2.toJSON(), termQuery3.toJSON()];
    doTest();

    boolQuery.mustNot(termQuery2);
    expected.bool.must_not = [termQuery2.toJSON()];
    doTest();

    boolQuery.mustNot([termQuery3, termQuery4]);
    expected.bool.must_not = [termQuery3.toJSON(), termQuery4.toJSON()];
    doTest();

    boolQuery.should(termQuery3);
    expected.bool.should = [termQuery3.toJSON()];
    doTest();

    boolQuery.should(termQuery4);
    expected.bool.should.push(termQuery4.toJSON());
    doTest();

    boolQuery.should([termQuery1, termQuery3]);
    expected.bool.should = [termQuery1.toJSON(), termQuery3.toJSON()];
    doTest();

    boolQuery.boost(1.5);
    expected.bool.boost = 1.5;
    doTest();

    boolQuery.adjustPureNegative(false);
    expected.bool.adjust_pure_negative = false;
    doTest();

    boolQuery.disableCoord(false);
    expected.bool.disable_coord = false;
    doTest();

    boolQuery.minimumNumberShouldMatch(2);
    expected.bool.minimum_number_should_match = 2;
    doTest();

    test.strictEqual(boolQuery._type(), 'query');


    test.throws(function () {
      boolQuery.must('junk');
    }, TypeError);

    test.throws(function () {
      boolQuery.must([termQuery1, 'junk']);
    }, TypeError);

    test.throws(function () {
      boolQuery.mustNot('junk');
    }, TypeError);

    test.throws(function () {
      boolQuery.mustNot([termQuery1, 'junk']);
    }, TypeError);

    test.throws(function () {
      boolQuery.should('junk');
    }, TypeError);

    test.throws(function () {
      boolQuery.should([termQuery1, 'junk']);
    }, TypeError);

    test.done();
  },
  DisMaxQuery: function (test) {
    test.expect(11);

    var disMaxQuery = ejs.DisMaxQuery(),
      termQuery1 = ejs.TermQuery('t1', 'v1').boost(1.5),
      termQuery2 = ejs.TermQuery('t2', 'v2'),
      boolQuery1 = ejs.BoolQuery().must(termQuery1).boost(2),
      expected,
      doTest = function () {
        test.deepEqual(disMaxQuery.toJSON(), expected);
      };

    expected = {
      dis_max: {}
    };

    test.ok(disMaxQuery, 'DisMaxQuery exists');
    test.ok(disMaxQuery.toJSON(), 'toJSON() works');
    doTest();

    disMaxQuery.queries(termQuery2);
    expected.dis_max.queries = [termQuery2.toJSON()];
    doTest();

    disMaxQuery.queries(boolQuery1);
    expected.dis_max.queries.push(boolQuery1.toJSON());
    doTest();

    disMaxQuery.queries([termQuery1, boolQuery1]);
    expected.dis_max.queries = [termQuery1.toJSON(), boolQuery1.toJSON()];
    doTest();

    disMaxQuery.boost(3);
    expected.dis_max.boost = 3;
    doTest();

    disMaxQuery.tieBreaker(4.4);
    expected.dis_max.tie_breaker = 4.4;
    doTest();

    test.strictEqual(disMaxQuery._type(), 'query');


    test.throws(function () {
      disMaxQuery.queries('invalid');
    }, TypeError);

    test.throws(function () {
      disMaxQuery.queries([termQuery1, 'invalid']);
    }, TypeError);

    test.done();
  },
  QueryStringQuery: function (test) {
    test.expect(44);

    var queryString = ejs.QueryStringQuery('this AND that'),
      expected,
      doTest = function () {
        test.deepEqual(queryString.toJSON(), expected);
      };

    expected = {
      query_string: {
        query: 'this AND that'
      }
    };

    test.ok(queryString, 'QueryString exists');
    test.ok(queryString, 'toJSON() works');
    doTest();

    queryString.query('that OR this');
    expected.query_string.query = 'that OR this';
    doTest();

    queryString.defaultField('somefield');
    expected.query_string.default_field = 'somefield';
    doTest();

    queryString.fields(['field1', 'field2']);
    expected.query_string.fields = ['field1', 'field2'];
    doTest();

    queryString.fields('field3');
    expected.query_string.fields.push('field3');
    doTest();

    queryString.useDisMax(true);
    expected.query_string.use_dis_max = true;
    doTest();

    queryString.defaultOperator('and');
    expected.query_string.default_operator = 'AND';
    doTest();

    queryString.defaultOperator('or');
    expected.query_string.default_operator = 'OR';
    doTest();

    queryString.defaultOperator('junkoperator');
    doTest();

    queryString.analyzer('theanalyzer');
    expected.query_string.analyzer = 'theanalyzer';
    doTest();

    queryString.allowLeadingWildcard(false);
    expected.query_string.allow_leading_wildcard = false;
    doTest();

    queryString.lowercaseExpandedTerms(true);
    expected.query_string.lowercase_expanded_terms = true;
    doTest();

    queryString.enablePositionIncrements(false);
    expected.query_string.enable_position_increments = false;
    doTest();

    queryString.fuzzyPrefixLength(2);
    expected.query_string.fuzzy_prefix_length = 2;
    doTest();

    queryString.fuzzyMinSim(0.6);
    expected.query_string.fuzzy_min_sim = 0.6;
    doTest();

    queryString.phraseSlop(6);
    expected.query_string.phrase_slop = 6;
    doTest();

    queryString.boost(2.3);
    expected.query_string.boost = 2.3;
    doTest();

    queryString.analyzeWildcard(true);
    expected.query_string.analyze_wildcard = true;
    doTest();

    queryString.autoGeneratePhraseQueries(false);
    expected.query_string.auto_generate_phrase_queries = false;
    doTest();

    queryString.minimumShouldMatch(1);
    expected.query_string.minimum_should_match = 1;
    doTest();

    queryString.tieBreaker(1.1);
    expected.query_string.tie_breaker = 1.1;
    doTest();

    queryString.fuzzyMaxExpansions(6);
    expected.query_string.fuzzy_max_expansions = 6;
    doTest();

    queryString.fuzzyRewrite('constant_score_auto');
    expected.query_string.fuzzy_rewrite = 'constant_score_auto';
    doTest();

    queryString.fuzzyRewrite('invalid');
    doTest();

    queryString.fuzzyRewrite('scoring_boolean');
    expected.query_string.fuzzy_rewrite = 'scoring_boolean';
    doTest();

    queryString.fuzzyRewrite('constant_score_boolean');
    expected.query_string.fuzzy_rewrite = 'constant_score_boolean';
    doTest();

    queryString.fuzzyRewrite('constant_score_filter');
    expected.query_string.fuzzy_rewrite = 'constant_score_filter';
    doTest();

    queryString.fuzzyRewrite('top_terms_boost_5');
    expected.query_string.fuzzy_rewrite = 'top_terms_boost_5';
    doTest();

    queryString.fuzzyRewrite('top_terms_9');
    expected.query_string.fuzzy_rewrite = 'top_terms_9';
    doTest();

    queryString.rewrite('constant_score_auto');
    expected.query_string.rewrite = 'constant_score_auto';
    doTest();

    queryString.rewrite('invalid');
    doTest();

    queryString.rewrite('scoring_boolean');
    expected.query_string.rewrite = 'scoring_boolean';
    doTest();

    queryString.rewrite('constant_score_boolean');
    expected.query_string.rewrite = 'constant_score_boolean';
    doTest();

    queryString.rewrite('constant_score_filter');
    expected.query_string.rewrite = 'constant_score_filter';
    doTest();

    queryString.rewrite('top_terms_boost_5');
    expected.query_string.rewrite = 'top_terms_boost_5';
    doTest();

    queryString.rewrite('top_terms_9');
    expected.query_string.rewrite = 'top_terms_9';
    doTest();

    queryString.quoteFieldSuffix('s');
    expected.query_string.quote_field_suffix = 's';
    doTest();

    queryString.escape(true);
    expected.query_string.escape = true;
    doTest();

    queryString.quoteAnalyzer('qAnalyzer');
    expected.query_string.quote_analyzer = 'qAnalyzer';
    doTest();

    queryString.lenient(true);
    expected.query_string.lenient = true;
    doTest();

    test.strictEqual(queryString._type(), 'query');


    test.throws(function () {
      queryString.fields(2);
    }, TypeError);

    test.done();
  },
  FilteredQuery: function (test) {
    test.expect(20);

    var termQuery1 = ejs.TermQuery('t1', 'v1'),
      termQuery2 = ejs.TermQuery('t2', 'v2'),
      termQuery3 = ejs.TermQuery('t3', 'v3'),
      termFilter1 = ejs.TermFilter('tf1', 'fv1'),
      termFilter2 = ejs.TermFilter('tf2', 'fv2'),
      filterQuery = ejs.FilteredQuery(termQuery1, termFilter1),
      expected,
      doTest = function () {
        test.deepEqual(filterQuery.toJSON(), expected);
      };

    expected = {
      filtered: {
        query: termQuery1.toJSON(),
        filter: termFilter1.toJSON()
      }
    };

    test.ok(filterQuery, 'FilteredQuery exists');
    test.ok(filterQuery.toJSON(), 'toJSON() works');
    doTest();

    filterQuery = ejs.FilteredQuery(termQuery2);
    expected = {
      filtered: {
        query: termQuery2.toJSON()
      }
    };
    doTest();

    filterQuery.filter(termFilter2);
    expected.filtered.filter = termFilter2.toJSON();
    doTest();

    filterQuery.query(termQuery3);
    expected.filtered.query = termQuery3.toJSON();
    doTest();

    filterQuery.strategy('query_first');
    expected.filtered.strategy = 'query_first';
    doTest();

    filterQuery.strategy('INVALID');
    doTest();

    filterQuery.strategy('random_access_always');
    expected.filtered.strategy = 'random_access_always';
    doTest();

    filterQuery.strategy('LEAP_FROG');
    expected.filtered.strategy = 'leap_frog';
    doTest();

    filterQuery.strategy('leap_frog_filter_first');
    expected.filtered.strategy = 'leap_frog_filter_first';
    doTest();

    filterQuery.strategy('random_access_5');
    expected.filtered.strategy = 'random_access_5';
    doTest();

    filterQuery.cache(true);
    expected.filtered._cache = true;
    doTest();

    filterQuery.cacheKey('filter_cache_key');
    expected.filtered._cache_key = 'filter_cache_key';
    doTest();

    filterQuery.boost(2.6);
    expected.filtered.boost = 2.6;
    doTest();

    test.strictEqual(filterQuery._type(), 'query');


    test.throws(function () {
      ejs.FilteredQuery('invalid', termFilter1);
    }, TypeError);

    test.throws(function () {
      ejs.FilteredQuery(termQuery1, 'invalid');
    }, TypeError);

    test.throws(function () {
      filterQuery.query('invalid');
    }, TypeError);

    test.throws(function () {
      filterQuery.filter('invalid');
    }, TypeError);

    test.done();
  },
  NestedQuery: function (test) {
    test.expect(18);

    var termQuery1 = ejs.TermQuery('t1', 'v1'),
      termQuery2 = ejs.TermQuery('t2', 'v2'),
      termFilter1 = ejs.TermFilter('tf1', 'v1'),
      termFilter2 = ejs.TermFilter('tf2', 'v2'),
      nestedQuery = ejs.NestedQuery('root'),
      expected,
      doTest = function () {
        test.deepEqual(nestedQuery.toJSON(), expected);
      };

    expected = {
      nested: {
        path: 'root'
      }
    };

    test.ok(nestedQuery, 'NestedQuery exists');
    test.ok(nestedQuery.toJSON(), 'toJSON() works');
    doTest();

    nestedQuery.path('root/path');
    expected.nested.path = 'root/path';
    doTest();

    nestedQuery.query(termQuery1);
    expected.nested.query = termQuery1.toJSON();
    doTest();

    nestedQuery.filter(termFilter1);
    expected.nested.filter = termFilter1.toJSON();
    doTest();

    nestedQuery.query(termQuery2);
    expected.nested.query = termQuery2.toJSON();
    doTest();

    nestedQuery.filter(termFilter2);
    expected.nested.filter = termFilter2.toJSON();
    doTest();

    nestedQuery.scoreMode('avg');
    expected.nested.score_mode = 'avg';
    doTest();

    nestedQuery.scoreMode('INVALID');
    doTest();

    nestedQuery.scoreMode('TOTAL');
    expected.nested.score_mode = 'total';
    doTest();

    nestedQuery.scoreMode('Max');
    expected.nested.score_mode = 'max';
    doTest();

    nestedQuery.scoreMode('none');
    expected.nested.score_mode = 'none';
    doTest();

    nestedQuery.scoreMode('sum');
    expected.nested.score_mode = 'sum';
    doTest();

    nestedQuery.boost(3.2);
    expected.nested.boost = 3.2;
    doTest();

    test.strictEqual(nestedQuery._type(), 'query');


    test.throws(function () {
      nestedQuery.query('invalid');
    }, TypeError);

    test.throws(function () {
      nestedQuery.filter('invalid');
    }, TypeError);

    test.done();
  },
  ConstantScoreQuery: function (test) {
    test.expect(10);

    var termQuery1 = ejs.TermQuery('t1', 'v1'),
      termFilter1 = ejs.TermFilter('tf1', 'fv1'),
      constantScoreQuery = ejs.ConstantScoreQuery(),
      expected,
      doTest = function () {
        test.deepEqual(constantScoreQuery.toJSON(), expected);
      };

    expected = {
      constant_score: {}
    };

    test.ok(constantScoreQuery, 'ConstantScoreQuery exists');
    test.ok(constantScoreQuery.toJSON(), 'toJSON() works');
    doTest();

    constantScoreQuery.query(termQuery1);
    expected.constant_score.query = termQuery1.toJSON();
    doTest();

    test.strictEqual(constantScoreQuery._type(), 'query');


    constantScoreQuery = ejs.ConstantScoreQuery();
    constantScoreQuery.filter(termFilter1);
    expected = {
      constant_score: {
        filter: termFilter1.toJSON()
      }
    };
    doTest();

    constantScoreQuery.cache(true);
    expected.constant_score._cache = true;
    doTest();

    constantScoreQuery.cacheKey('key');
    expected.constant_score._cache_key = 'key';
    doTest();



    test.throws(function () {
      constantScoreQuery.query('invalid');
    }, TypeError);

    test.throws(function () {
      constantScoreQuery.filter('invalid');
    }, TypeError);

    test.done();
  },
  MatchAllQuery: function (test) {
    test.expect(5);

    var matchAllQuery = ejs.MatchAllQuery(),
      expected,
      doTest = function () {
        test.deepEqual(matchAllQuery.toJSON(), expected);
      };

    expected = {
      match_all: {}
    };

    test.ok(matchAllQuery, 'MatchAllQuery exists');
    test.ok(matchAllQuery.toJSON(), 'toJSON() works');
    doTest();

    matchAllQuery.boost(2.2);
    expected.match_all.boost = 2.2;
    doTest();

    test.strictEqual(matchAllQuery._type(), 'query');


    test.done();
  },
  SpanTermQuery: function (test) {
    test.expect(7);

    var spanTermQuery = ejs.SpanTermQuery('t1', 'v1'),
      expected,
      doTest = function () {
        test.deepEqual(spanTermQuery.toJSON(), expected);
      };

    expected = {
      span_term: {
        t1: {
          term: 'v1'
        }
      }
    };

    test.ok(spanTermQuery, 'SpanTermQuery exists');
    test.ok(spanTermQuery.toJSON(), 'toJSON() works');
    doTest();

    spanTermQuery.field('t2');
    expected = {
      span_term: {
        t2: {
          term: 'v1'
        }
      }
    };
    doTest();

    spanTermQuery.term('v2');
    expected.span_term.t2.term = 'v2';
    doTest();

    spanTermQuery.boost(1.5);
    expected.span_term.t2.boost = 1.5;
    doTest();

    test.strictEqual(spanTermQuery._type(), 'query');


    test.done();
  },
  SpanNearQuery: function (test) {
    test.expect(15);

    var spanTermQuery1 = ejs.SpanTermQuery('t1', 'v1'),
      spanTermQuery2 = ejs.SpanTermQuery('t2', 'v2'),
      spanTermQuery3 = ejs.SpanTermQuery('t3', 'v3'),
      spanTermQuery4 = ejs.SpanTermQuery('t4', 'v4'),
      spanNearQuery = ejs.SpanNearQuery(spanTermQuery1, 4),
      expected,
      doTest = function () {
        test.deepEqual(spanNearQuery.toJSON(), expected);
      };

    expected = {
      span_near: {
        clauses: [spanTermQuery1.toJSON()],
        slop: 4
      }
    };

    test.ok(spanNearQuery, 'SpanNearQuery exists');
    test.ok(spanNearQuery.toJSON(), 'toJSON() works');
    doTest();

    spanNearQuery.clauses(spanTermQuery2);
    expected.span_near.clauses.push(spanTermQuery2.toJSON());
    doTest();

    spanNearQuery.clauses([spanTermQuery1, spanTermQuery3]);
    expected.span_near.clauses = [spanTermQuery1.toJSON(), spanTermQuery3.toJSON()];
    doTest();

    spanNearQuery = ejs.SpanNearQuery([spanTermQuery4, spanTermQuery2], 10);
    expected = {
      span_near: {
        clauses: [spanTermQuery4.toJSON(), spanTermQuery2.toJSON()],
        slop: 10
      }
    };
    doTest();

    spanNearQuery.slop(3);
    expected.span_near.slop = 3;
    doTest();

    spanNearQuery.inOrder(true);
    expected.span_near.in_order = true;
    doTest();

    spanNearQuery.collectPayloads(false);
    expected.span_near.collect_payloads = false;
    doTest();

    spanNearQuery.boost(4.1);
    expected.span_near.boost = 4.1;
    doTest();

    test.strictEqual(spanNearQuery._type(), 'query');


    test.throws(function () {
      ejs.SpanNearQuery('invalid', 2);
    }, TypeError);

    test.throws(function () {
      ejs.SpanNearQuery([spanTermQuery1, 'invalid'], 4);
    }, TypeError);

    test.throws(function () {
      spanNearQuery.clauses('invalid');
    }, TypeError);

    test.throws(function () {
      spanNearQuery.clauses([spanTermQuery2, 'invalid']);
    }, TypeError);

    test.done();
  },
  SpanNotQuery: function (test) {
    test.expect(11);

    var spanTermQuery1 = ejs.SpanTermQuery('t1', 'v1'),
      spanTermQuery2 = ejs.SpanTermQuery('t2', 'v2'),
      spanTermQuery3 = ejs.SpanTermQuery('t3', 'v3'),
      spanTermQuery4 = ejs.SpanTermQuery('t4', 'v4'),
      spanNotQuery = ejs.SpanNotQuery(spanTermQuery1, spanTermQuery2),
      expected,
      doTest = function () {
        test.deepEqual(spanNotQuery.toJSON(), expected);
      };

    expected = {
      span_not: {
        include: spanTermQuery1.toJSON(),
        exclude: spanTermQuery2.toJSON()
      }
    };

    test.ok(spanNotQuery, 'SpanNotQuery exists');
    test.ok(spanNotQuery.toJSON(), 'toJSON() works');
    doTest();

    spanNotQuery.include(spanTermQuery3);
    expected.span_not.include = spanTermQuery3.toJSON();
    doTest();

    spanNotQuery.exclude(spanTermQuery4);
    expected.span_not.exclude = spanTermQuery4.toJSON();
    doTest();

    spanNotQuery.boost(4.1);
    expected.span_not.boost = 4.1;
    doTest();

    test.strictEqual(spanNotQuery._type(), 'query');


    test.throws(function () {
      ejs.SpanNotQuery('invalid', spanTermQuery1);
    }, TypeError);

    test.throws(function () {
      ejs.SpanNotQuery(spanTermQuery1, 'invalid');
    }, TypeError);

    test.throws(function () {
      spanNotQuery.include('invalid');
    }, TypeError);

    test.throws(function () {
      spanNotQuery.exclude('invalid');
    }, TypeError);

    test.done();
  },
  SpanOrQuery: function (test) {
    test.expect(12);

    var spanTermQuery1 = ejs.SpanTermQuery('t1', 'v1'),
      spanTermQuery2 = ejs.SpanTermQuery('t2', 'v2'),
      spanTermQuery3 = ejs.SpanTermQuery('t3', 'v3'),
      spanTermQuery4 = ejs.SpanTermQuery('t4', 'v4'),
      spanTermQuery5 = ejs.SpanTermQuery('t5', 'v5'),
      spanOrQuery = ejs.SpanOrQuery(spanTermQuery1),
      expected,
      doTest = function () {
        test.deepEqual(spanOrQuery.toJSON(), expected);
      };

    expected = {
      span_or: {
        clauses: [spanTermQuery1.toJSON()]
      }
    };

    test.ok(spanOrQuery, 'SpanOrQuery exists');
    test.ok(spanOrQuery.toJSON(), 'toJSON() works');
    doTest();

    spanOrQuery = ejs.SpanOrQuery([spanTermQuery2, spanTermQuery3]);
    expected.span_or.clauses = [spanTermQuery2.toJSON(), spanTermQuery3.toJSON()];
    doTest();

    spanOrQuery.clauses(spanTermQuery4);
    expected.span_or.clauses.push(spanTermQuery4.toJSON());
    doTest();

    spanOrQuery.clauses([spanTermQuery1, spanTermQuery5]);
    expected.span_or.clauses = [spanTermQuery1.toJSON(), spanTermQuery5.toJSON()];
    doTest();

    spanOrQuery.boost(1.1);
    expected.span_or.boost = 1.1;
    doTest();

    test.strictEqual(spanOrQuery._type(), 'query');


    test.throws(function () {
      ejs.SpanOrQuery('invalid');
    }, TypeError);

    test.throws(function () {
      ejs.SpanOrQuery([spanTermQuery1, 'invalid']);
    }, TypeError);

    test.throws(function () {
      spanOrQuery.clauses('invalid');
    }, TypeError);

    test.throws(function () {
      spanOrQuery.clauses([spanTermQuery1, 'invalid']);
    }, TypeError);

    test.done();
  },
  SpanFirstQuery: function (test) {
    test.expect(9);

    var spanTermQuery1 = ejs.SpanTermQuery('t1', 'v1'),
      spanTermQuery2 = ejs.SpanTermQuery('t2', 'v2'),
      spanFirstQuery = ejs.SpanFirstQuery(spanTermQuery1, 10),
      expected,
      doTest = function () {
        test.deepEqual(spanFirstQuery.toJSON(), expected);
      };

    expected = {
      span_first: {
        match: spanTermQuery1.toJSON(),
        end: 10
      }
    };

    test.ok(spanFirstQuery, 'SpanFirstQuery exists');
    test.ok(spanFirstQuery.toJSON(), 'toJSON() works');
    doTest();

    spanFirstQuery.match(spanTermQuery2);
    expected.span_first.match = spanTermQuery2.toJSON();
    doTest();

    spanFirstQuery.end(5);
    expected.span_first.end = 5;
    doTest();

    spanFirstQuery.boost(3.1);
    expected.span_first.boost = 3.1;
    doTest();

    test.strictEqual(spanFirstQuery._type(), 'query');


    test.throws(function () {
      ejs.SpanFirstQuery('invalid', 3);
    }, TypeError);

    test.throws(function () {
      spanFirstQuery.match('invalid');
    }, TypeError);

    test.done();
  },
  SpanMultiTermQuery: function (test) {
    test.expect(8);

    var mtQuery1 = ejs.FuzzyQuery('t1', 'v1'),
      mtQuery2 = ejs.WildcardQuery('t2', 'v2*'),
      spanMultiTermQuery = ejs.SpanMultiTermQuery(),
      expected,
      doTest = function () {
        test.deepEqual(spanMultiTermQuery.toJSON(), expected);
      };

    expected = {
      span_multi: {
        match: {}
      }
    };

    test.ok(spanMultiTermQuery, 'SpanMultiTermQuery exists');
    test.ok(spanMultiTermQuery.toJSON(), 'toJSON() works');
    doTest();

    spanMultiTermQuery = ejs.SpanMultiTermQuery(mtQuery1);
    expected.span_multi.match = mtQuery1.toJSON();
    doTest();

    spanMultiTermQuery.match(mtQuery2);
    expected.span_multi.match = mtQuery2.toJSON();
    doTest();

    test.strictEqual(spanMultiTermQuery._type(), 'query');


    test.throws(function () {
      ejs.SpanMultiTermQuery('invalid');
    }, TypeError);

    test.throws(function () {
      spanMultiTermQuery.match('invalid');
    }, TypeError);

    test.done();
  },
  FieldMaskingSpanQuery: function (test) {
    test.expect(9);

    var spanTermQuery1 = ejs.SpanTermQuery('t1', 'v1'),
      spanTermQuery2 = ejs.SpanTermQuery('t2', 'v2'),
      fieldMaskingSpanQuery = ejs.FieldMaskingSpanQuery(spanTermQuery1, 'mf1'),
      expected,
      doTest = function () {
        test.deepEqual(fieldMaskingSpanQuery.toJSON(), expected);
      };

    expected = {
      field_masking_span: {
        query: spanTermQuery1.toJSON(),
        field: 'mf1'
      }
    };

    test.ok(fieldMaskingSpanQuery, 'FieldMaskingSpanQuery exists');
    test.ok(fieldMaskingSpanQuery.toJSON(), 'toJSON() works');
    doTest();

    fieldMaskingSpanQuery.query(spanTermQuery2);
    expected.field_masking_span.query = spanTermQuery2.toJSON();
    doTest();

    fieldMaskingSpanQuery.field('mf2');
    expected.field_masking_span.field = 'mf2';
    doTest();

    fieldMaskingSpanQuery.boost(5.1);
    expected.field_masking_span.boost = 5.1;
    doTest();

    test.strictEqual(fieldMaskingSpanQuery._type(), 'query');


    test.throws(function () {
      ejs.FieldMaskingSpanQuery('invalid', 'mf');
    }, TypeError);

    test.throws(function () {
      fieldMaskingSpanQuery.query('invalid');
    }, TypeError);

    test.done();
  }
};
