/*global require:true */
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
    test.expect(14);

    test.ok(ejs.TermQuery, 'TermQuery');
    test.ok(ejs.BoolQuery, 'BoolQuery');
    test.ok(ejs.FieldQuery, 'FieldQuery');
    test.ok(ejs.DisMaxQuery, 'DisMaxQuery');
    test.ok(ejs.QueryString, 'QueryString');
    test.ok(ejs.FilteredQuery, 'FilteredQuery');
    test.ok(ejs.NestedQuery, 'NestedQuery');
    test.ok(ejs.ConstantScoreQuery, 'ConstantScoreQuery');
    test.ok(ejs.MatchAllQuery, 'MatchAllQuery');
    test.ok(ejs.MatchAllQuery, 'SpanTermQuery');
    test.ok(ejs.MatchAllQuery, 'SpanNearQuery');
    test.ok(ejs.MatchAllQuery, 'SpanNotQuery');
    test.ok(ejs.MatchAllQuery, 'SpanOrQuery');
    test.ok(ejs.MatchAllQuery, 'SpanFirstQuery');

    test.done();
  },
  TextQuery: function (test) {
    test.expect(19);

    var textQuery = ejs.TextQuery('t1', 'v1'),
      expected,
      doTest = function () {
        test.deepEqual(textQuery.get(), expected);
      };

    expected = {
      text: {
        t1: {
          query: 'v1'
        }
      }
    };

    test.ok(textQuery, 'TextQuery exists');
    test.ok(textQuery.get(), 'get() works');
    doTest();

    textQuery.boost(1.5);
    expected.text.t1.boost = 1.5;
    doTest();

    textQuery.query('v2');
    expected.text.t1.query = 'v2';
    doTest();

    textQuery.type('boolean');
    expected.text.t1.type = 'boolean';
    doTest();

    textQuery.type('junk');
    doTest();

    textQuery.type('phrase');
    expected.text.t1.type = 'phrase';
    doTest();

    textQuery.type('phrase_prefix');
    expected.text.t1.type = 'phrase_prefix';
    doTest();

    textQuery.type('phrasePrefix');
    expected.text.t1.type = 'phrasePrefix';
    doTest();

    textQuery.fuzziness(0.5);
    expected.text.t1.fuzziness = 0.5;
    doTest();

    textQuery.prefixLength(2);
    expected.text.t1.prefix_length = 2;
    doTest();

    textQuery.maxExpansions(5);
    expected.text.t1.max_expansions = 5;
    doTest();

    textQuery.operator('and');
    expected.text.t1.operator = 'and';
    doTest();

    textQuery.operator('junk');
    doTest();

    textQuery.operator('or');
    expected.text.t1.operator = 'or';
    doTest();

    textQuery.slop(15);
    expected.text.t1.slop = 15;
    doTest();

    textQuery.analyzer('the analyzer');
    expected.text.t1.analyzer = 'the analyzer';
    doTest();

    test.strictEqual(textQuery.toString(), JSON.stringify(expected));

    test.done();
  },
  TermQuery: function (test) {
    test.expect(5);

    var termQuery = ejs.TermQuery('t1', 'v1'),
      expected,
      doTest = function () {
        test.deepEqual(termQuery.get(), expected);
      };

    expected = {
      term: {
        t1: 'v1'
      }
    };

    test.ok(termQuery, 'TermQuery exists');
    test.ok(termQuery.get(), 'get() works');
    doTest();

    termQuery.boost(1.5);
    expected.term.t1 = {
      value: 'v1',
      boost: 1.5
    };
    doTest();

    test.strictEqual(termQuery.toString(), JSON.stringify(expected));

    test.done();
  },
  BoolQuery: function (test) {
    test.expect(11);

    var termQuery1 = ejs.TermQuery('t1', 'v1'),
      termQuery2 = ejs.TermQuery('t2', 'v2'),
      termQuery3 = ejs.TermQuery('t3', 'v3'),
      termQuery4 = ejs.TermQuery('t4', 'v4'),
      boolQuery = ejs.BoolQuery(),
      expected,
      doTest = function () {
        test.deepEqual(boolQuery.get(), expected);
      };

    expected = {
      bool: {}
    };

    test.ok(boolQuery, 'BoolQuery exists');
    test.ok(boolQuery.get(), 'get() works');
    doTest();

    boolQuery.must(termQuery1);
    expected.bool.must = [termQuery1.get()];
    doTest();

    boolQuery.mustNot(termQuery2);
    expected.bool.mustNot = [termQuery2.get()];
    doTest();

    boolQuery.should(termQuery3);
    expected.bool.should = [termQuery3.get()];
    doTest();

    boolQuery.should(termQuery4);
    expected.bool.should.push(termQuery4.get());
    doTest();

    boolQuery.boost(1.5);
    expected.bool.boost = 1.5;
    doTest();

    boolQuery.disableCoord(false);
    expected.bool.disable_coord = false;
    doTest();

    boolQuery.minimumNumberShouldMatch(2);
    expected.bool.minimum_number_should_match = 2;
    doTest();

    test.strictEqual(boolQuery.toString(), JSON.stringify(expected));

    test.done();
  },
  FieldQuery: function (test) {
    test.expect(18);

    var fieldQuery = ejs.FieldQuery('f1', 'v1'),
      expected,
      doTest = function () {
        test.deepEqual(fieldQuery.get(), expected);
      };

    expected = {
      field: {
        f1: 'v1'
      }
    };

    test.ok(fieldQuery, 'FieldQuery exists');
    test.ok(fieldQuery.get(), 'get() works');
    doTest();

    fieldQuery.defaultOperator('and');
    expected.field.f1 = {
      query: 'v1'
    };
    expected.field.f1.default_operator = 'AND';
    doTest();

    fieldQuery.defaultOperator('or');
    expected.field.f1.default_operator = 'OR';
    doTest();

    fieldQuery.defaultOperator('invalid');
    doTest();

    fieldQuery.analyzer('someAnalyzer');
    expected.field.f1.analyzer = 'someAnalyzer';
    doTest();

    fieldQuery.autoGeneratePhraseQueries(false);
    expected.field.f1.auto_generate_phrase_queries = false;
    doTest();

    fieldQuery.allowLeadingWildcard(true);
    expected.field.f1.allow_leading_wildcard = true;
    doTest();

    fieldQuery.lowercaseExpandedTerms(false);
    expected.field.f1.lowercase_expanded_terms = false;
    doTest();

    fieldQuery.enablePositionIncrements(true);
    expected.field.f1.enable_position_increments = true;
    doTest();

    fieldQuery.fuzzyMinSim(0.2);
    expected.field.f1.fuzzy_min_sim = 0.2;
    doTest();

    fieldQuery.boost(1.5);
    expected.field.f1.boost = 1.5;
    doTest();

    fieldQuery.fuzzyPrefixLength(4);
    expected.field.f1.fuzzy_prefix_length = 4;
    doTest();

    fieldQuery.phraseSlop(2);
    expected.field.f1.phrase_slop = 2;
    doTest();

    fieldQuery.analyzeWildcard(false);
    expected.field.f1.analyze_wildcard = false;
    doTest();

    fieldQuery.minimumShouldMatch(5);
    expected.field.f1.minimum_should_match = 5;
    doTest();

    test.strictEqual(fieldQuery.toString(), JSON.stringify(expected));

    test.done();
  },
  DisMaxQuery: function (test) {
    test.expect(8);

    var disMaxQuery = ejs.DisMaxQuery(),
      termQuery1 = ejs.TermQuery('t1', 'v1'),
      fieldQuery1 = ejs.FieldQuery('f1', 'v1'),
      boolQuery1 = ejs.BoolQuery(),
      expected,
      doTest = function () {
        test.deepEqual(disMaxQuery.get(), expected);
      };

    expected = {
      dis_max: {}
    };
    termQuery1.boost(1.5);
    boolQuery1.must(termQuery1)
      .boost(2);

    test.ok(disMaxQuery, 'DisMaxQuery exists');
    test.ok(disMaxQuery.get(), 'get() works');
    doTest();

    disMaxQuery.add(fieldQuery1);
    expected.dis_max.queries = [fieldQuery1.get()];
    doTest();

    disMaxQuery.add(boolQuery1);
    expected.dis_max.queries.push(boolQuery1.get());
    doTest();

    disMaxQuery.boost(3);
    expected.dis_max.boost = 3;
    doTest();

    disMaxQuery.tieBreaker(4.4);
    expected.dis_max.tie_breaker = 4.4;
    doTest();

    test.strictEqual(disMaxQuery.toString(), JSON.stringify(expected));

    test.done();
  },
  QueryString: function (test) {
    test.expect(23);

    var queryString = ejs.QueryString('this AND that'),
      expected,
      doTest = function () {
        test.deepEqual(queryString.get(), expected);
      };

    expected = {
      query_string: {
        query: 'this AND that'
      }
    };

    test.ok(queryString, 'QueryString exists');
    test.ok(queryString, 'get() works');
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

    test.strictEqual(queryString.toString(), JSON.stringify(expected));

    test.done();
  },
  FilteredQuery: function (test) {
    test.expect(4);

    var termQuery1 = ejs.TermQuery('t1', 'v1'),
      termFilter1 = ejs.TermFilter('tf1', 'fv1'),
      filterQuery = ejs.FilteredQuery(termQuery1, termFilter1),
      expected,
      doTest = function () {
        test.deepEqual(filterQuery.get(), expected);
      };

    expected = {
      filtered: {
        query: termQuery1.get(),
        filter: termFilter1.get()
      }
    };

    test.ok(filterQuery, 'FilteredQuery exists');
    test.ok(filterQuery.get(), 'get() works');
    doTest();

    test.strictEqual(filterQuery.toString(), JSON.stringify(expected));

    test.done();
  },
  NestedQuery: function (test) {
    test.expect(8);

    var termQuery1 = ejs.TermQuery('t1', 'v1'),
      termQuery2 = ejs.TermQuery('t2', 'v2'),
      nestedQuery = ejs.NestedQuery(),
      expected,
      doTest = function () {
        test.deepEqual(nestedQuery.get(), expected);
      };

    expected = {
      nested: {}
    };

    test.ok(nestedQuery, 'NestedQuery exists');
    test.ok(nestedQuery.get(), 'get() works');
    doTest();

    nestedQuery = ejs.NestedQuery(termQuery1);
    expected.nested.query = termQuery1.get();
    doTest();

    nestedQuery.path('root/path');
    expected.nested.path = 'root/path';
    doTest();

    nestedQuery.scoreMode('avg');
    expected.nested.score_mode = 'avg';
    doTest();

    nestedQuery.query(termQuery2);
    expected.nested.query = termQuery2.get();
    doTest();

    test.strictEqual(nestedQuery.toString(), JSON.stringify(expected));

    test.done();
  },
  ConstantScoreQuery: function (test) {
    test.expect(7);

    var termQuery1 = ejs.TermQuery('t1', 'v1'),
      termFilter1 = ejs.TermFilter('tf1', 'fv1'),
      constantScoreQuery = ejs.ConstantScoreQuery(),
      expected,
      doTest = function () {
        test.deepEqual(constantScoreQuery.get(), expected);
      };

    expected = {
      constant_score: {}
    };

    test.ok(constantScoreQuery, 'ConstantScoreQuery exists');
    test.ok(constantScoreQuery.get(), 'get() works');
    doTest();

    constantScoreQuery.query(termQuery1);
    expected.constant_score.query = termQuery1.get();
    doTest();

    test.strictEqual(constantScoreQuery.toString(), JSON.stringify(expected));

    constantScoreQuery = ejs.ConstantScoreQuery();
    constantScoreQuery.filter(termFilter1);
    expected = {
      constant_score: {
        filter: termFilter1.get()
      }
    };
    doTest();

    test.strictEqual(constantScoreQuery.toString(), JSON.stringify(expected));

    test.done();
  },
  MatchAllQuery: function (test) {
    test.expect(4);

    var matchAllQuery = ejs.MatchAllQuery(),
      expected,
      doTest = function () {
        test.deepEqual(matchAllQuery.get(), expected);
      };

    expected = {
      match_all: {}
    };

    test.ok(matchAllQuery, 'MatchAllQuery exists');
    test.ok(matchAllQuery.get(), 'get() works');
    doTest();

    test.strictEqual(matchAllQuery.toString(), JSON.stringify(expected));

    test.done();
  },
  SpanTermQuery: function (test) {
    test.expect(5);

    var spanTermQuery = ejs.SpanTermQuery('t1', 'v1'),
      expected,
      doTest = function () {
        test.deepEqual(spanTermQuery.get(), expected);
      };

    expected = {
      span_term: {
        t1: 'v1'
      }
    };

    test.ok(spanTermQuery, 'SpanTermQuery exists');
    test.ok(spanTermQuery.get(), 'get() works');
    doTest();

    spanTermQuery.boost(1.5);
    expected.span_term.t1 = {
      value: 'v1',
      boost: 1.5
    };
    doTest();

    test.strictEqual(spanTermQuery.toString(), JSON.stringify(expected));

    test.done();
  },
  SpanNearQuery: function (test) {
    test.expect(10);

    var spanTermQuery1 = ejs.SpanTermQuery('t1', 'v1'),
      spanTermQuery2 = ejs.SpanTermQuery('t2', 'v2'),
      spanTermQuery3 = ejs.SpanTermQuery('t3', 'v3'),
      spanTermQuery4 = ejs.SpanTermQuery('t4', 'v4'),
      spanNearQuery = ejs.SpanNearQuery([spanTermQuery3, spanTermQuery4]),
      expected,
      doTest = function () {
        test.deepEqual(spanNearQuery.get(), expected);
      };

    expected = {
      span_near: {
        clauses: [{
          span_term: {
            t3: 'v3'
          }
        }, {
          span_term: {
            t4: 'v4'
          }
        }]
      }
    };

    test.ok(spanNearQuery, 'SpanNearQuery exists');
    test.ok(spanNearQuery.get(), 'get() works');
    doTest();

    spanNearQuery.addClause(spanTermQuery1);
    expected.span_near.clauses.push({
      span_term: {
        t1: 'v1'
      }
    });
    doTest();

    spanNearQuery.addClause(spanTermQuery2);
    expected.span_near.clauses.push({
      span_term: {
        t2: 'v2'
      }
    });
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

    spanNearQuery.clauses([spanTermQuery3, spanTermQuery4]);
    expected.span_near.clauses = [];
    expected.span_near.clauses.push({
      span_term: {
        t3: 'v3'
      }
    });
    expected.span_near.clauses.push({
      span_term: {
        t4: 'v4'
      }
    });
    doTest();

    test.strictEqual(spanNearQuery.toString(), JSON.stringify(expected));

    test.done();
  },
  SpanNotQuery: function (test) {
    test.expect(6);

    var spanTermQuery1 = ejs.SpanTermQuery('t1', 'v1'),
      spanTermQuery2 = ejs.SpanTermQuery('t2', 'v2'),
      spanNotQuery = ejs.SpanNotQuery(),
      expected,
      doTest = function () {
        test.deepEqual(spanNotQuery.get(), expected);
      };

    expected = {
      span_not: {}
    };

    test.ok(spanNotQuery, 'SpanNotQuery exists');
    test.ok(spanNotQuery.get(), 'get() works');
    doTest();

    spanNotQuery.include(spanTermQuery1);
    expected.span_not.include = {
      span_term: {
        t1: 'v1'
      }
    };
    doTest();

    spanNotQuery.exclude(spanTermQuery2);
    expected.span_not.exclude = {
      span_term: {
        t2: 'v2'
      }
    };
    doTest();

    test.strictEqual(spanNotQuery.toString(), JSON.stringify(expected));

    test.done();
  },
  SpanOrQuery: function (test) {
    test.expect(6);

    var spanTermQuery1 = ejs.SpanTermQuery('t1', 'v1'),
      spanTermQuery2 = ejs.SpanTermQuery('t2', 'v2'),
      spanTermQuery3 = ejs.SpanTermQuery('t3', 'v3'),
      spanTermQuery4 = ejs.SpanTermQuery('t4', 'v4'),
      spanTermQuery5 = ejs.SpanTermQuery('t5', 'v5'),
      spanOrQuery = ejs.SpanOrQuery([spanTermQuery4, spanTermQuery5]),
      expected,
      doTest = function () {
        test.deepEqual(spanOrQuery.get(), expected);
      };

    expected = {
      span_or: {
        clauses: [{
          span_term: {
            t4: 'v4'
          }
        }, {
          span_term: {
            t5: 'v5'
          }
        }]
      }
    };

    test.ok(spanOrQuery, 'SpanOrQuery exists');
    test.ok(spanOrQuery.get(), 'get() works');
    doTest();

    spanOrQuery.addClause(spanTermQuery3);
    expected.span_or.clauses.push({
      span_term: {
        t3: 'v3'
      }
    });
    doTest();

    spanOrQuery.clauses([spanTermQuery1, spanTermQuery2]);
    expected.span_or.clauses = [];
    expected.span_or.clauses.push({
      span_term: {
        t1: 'v1'
      }
    });
    expected.span_or.clauses.push({
      span_term: {
        t2: 'v2'
      }
    });
    doTest();

    test.strictEqual(spanOrQuery.toString(), JSON.stringify(expected));

    test.done();
  },
  SpanFirstQuery: function (test) {
    test.expect(6);

    var spanTermQuery1 = ejs.SpanTermQuery('t1', 'v1'),
      spanFirstQuery = ejs.SpanFirstQuery(),
      expected,
      doTest = function () {
        test.deepEqual(spanFirstQuery.get(), expected);
      };

    expected = {
      span_first: {}
    };

    test.ok(spanFirstQuery, 'SpanFirstQuery exists');
    test.ok(spanFirstQuery.get(), 'get() works');
    doTest();

    spanFirstQuery.match(spanTermQuery1);
    expected.span_first.match = {
      span_term: {
        t1: 'v1'
      }
    };
    doTest();

    spanFirstQuery.end(5);
    expected.span_first.end = 5;
    doTest();

    test.strictEqual(spanFirstQuery.toString(), JSON.stringify(expected));

    test.done();
  }
};
