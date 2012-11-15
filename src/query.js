  /**
    @class
    A <code>TextQuery</code> is a type of <code>Query</code> that accepts a
    string of text, analyzes it, generates a query based on the
    <code>TextQuery</code> type.
    
    @name ejs.TextQuery

    @desc
    A Query that appects text, analyzes it, generates internal query based
    on the TextQuery type.

    @param {String} key the document field/key to query against
    @param {String} value the text query string
    */
  ejs.TextQuery = function (key, value) {

    /**
         The internal query object. <code>Use get()</code>
         @member ejs.TextQuery
         @property {Object} query
         */
    var k,
    v,
    query = {
      text: {}
    };

    k = key;
    v = value;
    query.text[k] = {
      query: v
    };

    return {

      /**
            Sets the boost value for documents matching the <code>Query</code>.

            @member ejs.TextQuery
            @param {Number} boost A positive <code>double</code> value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      boost: function (boost) {
        if (boost == null) {
          return query.text[k].boost;
        }

        query.text[k].boost = boost;
        return this;
      },

      /**
            Sets the query string for the <code>Query</code>.

            @member ejs.TextQuery
            @param {String} qstr The query string to search for.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      query: function (qstr) {
        if (qstr == null) {
          return query.text[k].query;
        }

        query.text[k].query = qstr;
        return this;
      },

      /**
            Sets the type of the <code>textQuery</code>.  Valid values are
            boolean, phrase, and phrase_prefix or phrasePrefix.

            @member ejs.TextQuery
            @param {String} type Any of boolean, phrase, phrase_prefix or phrasePrefix.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      type: function (type) {
        if (type == null) {
          return query.text[k].type;
        }

        if (type === 'boolean' || type === 'phrase' || type === 'phrase_prefix' || type === 'phrasePrefix') {
          query.text[k].type = type;
        }

        return this;
      },

      /**
            Sets the fuzziness value for the <code>Query</code>.

            @member ejs.TextQuery
            @param {Double} fuzz A <code>double</code> value between 0.0 and 1.0.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      fuzziness: function (fuzz) {
        if (fuzz == null) {
          return query.text[k].fuzziness;
        }

        query.text[k].fuzziness = fuzz;
        return this;
      },

      /**
            Sets the prefix length for a fuzzy prefix <code>textQuery</code>.

            @member ejs.TextQuery
            @param {Integer} l A positive <code>integer</code> length value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      prefixLength: function (l) {
        if (l == null) {
          return query.text[k].prefix_length;
        }

        query.text[k].prefix_length = l;
        return this;
      },

      /**
            Sets the max expansions of a fuzzy <code>textQuery</code>.

            @member ejs.TextQuery
            @param {Integer} e A positive <code>integer</code> value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      maxExpansions: function (e) {
        if (e == null) {
          return query.text[k].max_expansions;
        }

        query.text[k].max_expansions = e;
        return this;
      },

      /**
            Sets default operator of the <code>Query</code>.  Default: or.

            @member ejs.TextQuery
            @param {String} op Any of "and" or "or", no quote characters.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      operator: function (op) {
        if (op == null) {
          return query.text[k].operator;
        }

        op = op.toLowerCase();
        if (op === 'and' || op === 'or') {
          query.text[k].operator = op;
        }

        return this;
      },

      /**
            Sets the default slop for phrases. If zero, then exact phrase matches
            are required.  Default: 0.

            @member ejs.TextQuery
            @param {Integer} slop A positive <code>integer</code> value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      slop: function (slop) {
        if (slop == null) {
          return query.text[k].slop;
        }

        query.text[k].slop = slop;
        return this;
      },

      /**
            Sets the analyzer name used to analyze the <code>Query</code> object.

            @member ejs.TextQuery
            @param {String} analyzer A valid analyzer name.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      analyzer: function (analyzer) {
        if (analyzer == null) {
          return query.text[k].analyzer;
        }

        query.text[k].analyzer = analyzer;
        return this;
      },

      /**
            Allows you to serialize this object into a JSON encoded string.

            @member ejs.TextQuery
            @returns {String} returns this object as a serialized JSON string.
            */
      toString: function () {
        return JSON.stringify(query);
      },

      /**
            Retrieves the internal <code>query</code> object. This is typically used by
            internal API functions so use with caution.

            @member ejs.TextQuery
            @returns {String} returns this object's internal <code>query</code> property.
            */
      get: function () {
        return query;
      }
    };
  };

  /**
    @class
    <p>A <code>TermQuery</code> can be used to return documents containing a given
    keyword or <em>term</em>. For instance, you might want to retieve all the
    documents/objects that contain the term <code>Javascript</code>. Term filters
    often serve as the basis for more complex queries such as <em>Boolean</em> queries.</p>

    <p><strong>Note:</strong> This module contains a related code example.&nbsp;
    <a target="_blank" class="btn c9" href="https://gist.github.com/1894812">View Code Example</a></p>

    @name ejs.TermQuery

    @desc
    A Query that matches documents containing a term. This may be
    combined with other terms with a BooleanQuery.

    @param {String} key the document field/key to query against
    @param {String} value the literal value to be matched
    */
  ejs.TermQuery = function (key, value) {

    /**
         The internal query object. <code>Use get()</code>
         @member ejs.TermQuery
         @property {Object} query
         */
    var k,
    v,
    query = {
      term: {}
    };

    k = key;
    v = value;
    query.term[k] = v;

    return {

      /**
            Sets the boost value for documents matching the <code>Query</code>.

            @member ejs.TermQuery
            @param {Number} boost A positive <code>double</code> value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      boost: function (boost) {
        if (boost == null) {
          return query.term[k].boost;
        }

        query.term[k] = {
          value: v,
          boost: boost
        };
        return this;
      },

      /**
            Allows you to serialize this object into a JSON encoded string.

            @member ejs.TermQuery
            @returns {String} returns this object as a serialized JSON string.
            */
      toString: function () {
        return JSON.stringify(query);
      },

      /**
            Retrieves the internal <code>query</code> object. This is typically used by
            internal API functions so use with caution.

            @member ejs.TermQuery
            @returns {String} returns this object's internal <code>query</code> property.
            */
      get: function () {
        return query;
      }
    };
  };

  /**
    @class
    <p>A <code>boolQuery</code> allows you to build <em>Boolean</em> query constructs
    from individual term or phrase queries. For example you might want to search
    for documents containing the terms <code>javascript</code> and <code>python</code>.</p>

    <p><strong>Note:</strong> This module contains a related code example.&nbsp;
    <a target="_blank" class="btn c9" href="https://gist.github.com/1893930">View Code Example</a></p>

    @name ejs.BoolQuery

    @desc
    A Query that matches documents matching boolean combinations of other
    queries, e.g. <code>termQuerys, phraseQuerys</code> or other <code>boolQuerys</code>.

    */
  ejs.BoolQuery = function () {

    /**
         The internal query object. <code>Use get()</code>
         @member ejs.BoolQuery
         @property {Object} query
         */
    var query = {
      bool: {}
    };

    return {

      /**
             Adds query to boolean container. Given query "must" appear in matching documents.

             @member ejs.BoolQuery
             @param {Object} oQuery A valid <code>Query</code> object
             @returns {Object} returns <code>this</code> so that calls can be chained.
             */
      must: function (oQuery) {
        if (query.bool.must == null) {
          query.bool.must = [];
        }
        
        if (oQuery == null) {
          return query.bool.must;
        }

        query.bool.must.push(oQuery.get());
        return this;
      },

      /**
             Adds query to boolean container. Given query "must not" appear in matching documents.

             @member ejs.BoolQuery
             @param {Object} oQuery A valid query object
             @returns {Object} returns <code>this</code> so that calls can be chained.
             */
      mustNot: function (oQuery) {
        if (query.bool.mustNot == null) {
          query.bool.mustNot = [];
        }

        if (oQuery == null) {
          return query.bool.mustNot;
        }
        
        query.bool.mustNot.push(oQuery.get());
        return this;
      },

      /**
             Adds query to boolean container. Given query "should" appear in matching documents.

             @member ejs.BoolQuery
             @param {Object} oQuery A valid query object
             @returns {Object} returns <code>this</code> so that calls can be chained.
             */
      should: function (oQuery) {
        if (query.bool.should == null) {
          query.bool.should = [];
        }

        if (oQuery == null) {
          return query.bool.should;
        }
        
        query.bool.should.push(oQuery.get());
        return this;
      },

      /**
            Sets the boost value for documents matching the <code>Query</code>.

            @member ejs.BoolQuery
            @param {Double} boost A positive <code>double</code> value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      boost: function (boost) {
        if (boost == null) {
          return query.bool.boost;
        }

        query.bool.boost = boost;
        return this;
      },

      /**
            Enables or disables similarity coordinate scoring of documents
            matching the <code>Query</code>. Default: false.

            @member ejs.BoolQuery
            @param {String} trueFalse A <code>true/false</code value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      disableCoord: function (trueFalse) {
        if (trueFalse == null) {
          return query.bool.disable_coord;
        }

        query.bool.disable_coord = trueFalse;
        return this;
      },

      /**
            Sets the number of optional clauses that must match.
        
            By default no optional clauses are necessary for a match
            (unless there are no required clauses).  If this method is used,
            then the specified number of clauses is required..

            Use of this method is totally independent of specifying that
            any specific clauses are required (or prohibited).  This number will
            only be compared against the number of matching optional clauses.
     
            @member ejs.BoolQuery
            @param {Integer} minMatch A positive <code>integer</code> value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      minimumNumberShouldMatch: function (minMatch) {
        if (minMatch == null) {
          return query.bool.minimum_number_should_match;
        }

        query.bool.minimum_number_should_match = minMatch;
        return this;
      },

      /**
            Allows you to serialize this object into a JSON encoded string.

            @member ejs.BoolQuery
            @returns {String} returns this object as a serialized JSON string.
            */
      toString: function () {
        return JSON.stringify(query);
      },

      /**
            Retrieves the internal <code>query</code> object. This is typically used by
            internal API functions so use with caution.

            @member ejs.BoolQuery
            @returns {String} returns this object's internal <code>query</code> property.
            */
      get: function () {
        return query;
      }
    };
  };

  /**
    @class
    A query that executes against a given field or document property. It is a simplified version
    of the <code><a href="/jsdocs/ejs.queryString.html">queryString</a></code> object.

    @name ejs.FieldQuery

    @desc
    A query that executes against a given field or document property.

    @param {String} field The field or document property to search against.
    @param {String} value The value to match.
    */
  ejs.FieldQuery = function (field, value) {

    /**
         The internal query object. <code>Use get()</code>
         @member ejs.FieldQuery
         @property {Object} query
         */
    var f,
    v,
    query = {
      field: {}
    },
    setupExtra = function () {
      if (typeof query.field[f] === 'string') {
        query.field[f] = {
          query: v
        };
      }
    };

    f = field;
    v = value;
    query.field[f] = v;

    return {

      /**
            Set the default <em>Boolean</em> operator. This operator is used to join individual query
            terms when no operator is explicity used in the query string (i.e., <code>this AND that</code>).
            Defaults to <code>OR</code> (<em>same as Google</em>).

            @member ejs.FieldQuery
            @param {String} op The boost value to apply.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      defaultOperator: function (op) {
        setupExtra();
        if (op == null) {
          return query.field[f].default_operator;
        }
        
        op = op.toUpperCase();
        if (op === 'AND' || op === 'OR') {
          query.field[f].default_operator = op;
        }
        return this;
      },

      /**
            Sets the analyzer name used to analyze the <code>Query</code> object.

            @member ejs.FieldQuery
            @param {String} analyzer A valid analyzer name.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      analyzer: function (analyzer) {
        setupExtra();
        if (analyzer == null) {
          return query.field[f].analyzer;
        }

        query.field[f].analyzer = analyzer;
        return this;
      },

      /**
            Sets whether or not we should auto generate phrase queries *if* the
            analyzer returns more than one term. Default: false.

            @member ejs.FieldQuery
            @param {Boolean} trueFalse A <code>true/false</code> value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      autoGeneratePhraseQueries: function (trueFalse) {
        setupExtra();
        if (trueFalse == null) {
          return query.field[f].auto_generate_phrase_queries;
        }

        query.field[f].auto_generate_phrase_queries = trueFalse;
        return this;
      },

      /**
            Sets whether or not wildcard characters (* and ?) are allowed as the
            first character of the <code>Query</code>.  Default: true.

            @member ejs.FieldQuery
            @param {Boolean} trueFalse A <code>true/false</code> value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      allowLeadingWildcard: function (trueFalse) {
        setupExtra();
        if (trueFalse == null) {
          return query.field[f].allow_leading_wildcard;
        }

        query.field[f].allow_leading_wildcard = trueFalse;
        return this;
      },

      /**
            Sets whether or not terms from wildcard, prefix, fuzzy, and
            range queries should automatically be lowercased in the <code>Query</code>
            since they are not analyzed.  Default: true.

            @member ejs.FieldQuery
            @param {Boolean} trueFalse A <code>true/false</code> value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      lowercaseExpandedTerms: function (trueFalse) {
        setupExtra();
        if (trueFalse == null) {
          return query.field[f].lowercase_expanded_terms;
        }

        query.field[f].lowercase_expanded_terms = trueFalse;
        return this;
      },

      /**
            Sets whether or not position increments will be used in the
            <code>Query</code>. Default: true.

            @member ejs.FieldQuery
            @param {Boolean} trueFalse A <code>true/false</code> value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      enablePositionIncrements: function (trueFalse) {
        setupExtra();
        if (trueFalse == null) {
          return query.field[f].enable_position_increments;
        }

        query.field[f].enable_position_increments = trueFalse;
        return this;
      },

      /**
            Set the minimum similarity for fuzzy queries.  Default: 0.5.

            @member ejs.FieldQuery
            @param {Double} minSim A <code>double</code> value between 0 and 1.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      fuzzyMinSim: function (minSim) {
        setupExtra();
        if (minSim == null) {
          return query.field[f].fuzzy_min_sim;
        }

        query.field[f].fuzzy_min_sim = minSim;
        return this;
      },

      /**
            Sets the boost value of the <code>Query</code>.  Default: 1.0.

            @member ejs.FieldQuery
            @param {Double} boost A positive <code>double</code> value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      boost: function (boost) {
        setupExtra();
        if (boost == null) {
          return query.field[f].boost;
        }

        query.field[f].boost = boost;
        return this;
      },

      /**
            Sets the prefix length for fuzzy queries.  Default: 0.

            @member ejs.FieldQuery
            @param {Integer} fuzzLen A positive <code>integer</code> value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      fuzzyPrefixLength: function (fuzzLen) {
        setupExtra();
        if (fuzzLen == null) {
          return query.field[f].fuzzy_prefix_length;
        }

        query.field[f].fuzzy_prefix_length = fuzzLen;
        return this;
      },

      /**
            Sets the default slop for phrases. If zero, then exact phrase matches
            are required.  Default: 0.

            @member ejs.FieldQuery
            @param {Integer} slop A positive <code>integer</code> value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      phraseSlop: function (slop) {
        setupExtra();
        if (slop == null) {
          return query.field[f].phrase_slop;
        }

        query.field[f].phrase_slop = slop;
        return this;
      },

      /**
            Sets whether or not we should attempt to analyzed wilcard terms in the
            <code>Query</code>. By default, wildcard terms are not analyzed.
            Analysis of wildcard characters is not perfect.  Default: false.

            @member ejs.FieldQuery
            @param {Boolean} trueFalse A <code>true/false</code> value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      analyzeWildcard: function (trueFalse) {
        setupExtra();
        if (trueFalse == null) {
          return query.field[f].analyze_wildcard;
        }

        query.field[f].analyze_wildcard = trueFalse;
        return this;
      },

      /**
            Sets a percent value controlling how many "should" clauses in the
            resulting <code>Query</code> should match.

            @member ejs.FieldQuery
            @param {Integer} minMatch An <code>integer</code> between 0 and 100.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      minimumShouldMatch: function (minMatch) {
        setupExtra();
        if (minMatch == null) {
          return query.field[f].minimum_should_match;
        }

        query.field[f].minimum_should_match = minMatch;
        return this;
      },

      /**
            Allows you to serialize this object into a JSON encoded string.

            @member ejs.FieldQuery
            @returns {String} returns this object as a serialized JSON string.
            */
      toString: function () {
        return JSON.stringify(query);
      },

      /**
            Retrieves the internal <code>query</code> object. This is typically used by
            internal API functions so use with caution.

            @member ejs.FieldQuery
            @returns {String} returns this object's internal <code>query</code> property.
            */
      get: function () {
        return query;
      }
    };
  };

  /**
    @class
    A query that generates the union of documents produced by its subqueries, and
    that scores each document with the maximum score for that document as produced
    by any subquery, plus a tie breaking increment for any additional matching
    subqueries.

    @name ejs.DisMaxQuery

    @desc
    A query that generates the union of documents produced by its subqueries such
    as <code>termQuerys, phraseQuerys</code>, <code>boolQuerys</code>, etc.

    */
  ejs.DisMaxQuery = function () {

    /**
         The internal query object. <code>Use get()</code>
         @member ejs.DisMaxQuery
         @property {Object} query
         */
    var query = {
      dis_max: {}
    };

    return {

      /**
            Adds the given sub query.

            @member ejs.DisMaxQuery
            @param {Object} subQuery A <code>Query</code> object.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      add: function (subQuery) {
        if (subQuery == null) {
          return query.dis_max.queries;
        }
        
        if (typeof query.dis_max.queries !== "undefined") {
          query.dis_max.queries.push(subQuery.get());
        } else {
          query.dis_max.queries = [subQuery.get()];
        }

        return this;
      },

      /**
            Sets the boost value of the <code>Query</code>.  Default: 1.0.

            @member ejs.DisMaxQuery
            @param {Double} boost A positive <code>double</code> value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      boost: function (boost) {
        if (boost == null) {
          return query.dis_max.boost;
        }

        query.dis_max.boost = boost;
        return this;
      },


      /**
            The tie breaker value.  The tie breaker capability allows results
            that include the same term in multiple fields to be judged better than
            results that include this term in only the best of those multiple
            fields, without confusing this with the better case of two different
            terms in the multiple fields.  Default: 0.0.

            @member ejs.DisMaxQuery
            @param {Double} tieBreaker A positive <code>double</code> value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      tieBreaker: function (tieBreaker) {
        if (tieBreaker == null) {
          return query.dis_max.tie_breaker;
        }

        query.dis_max.tie_breaker = tieBreaker;
        return this;
      },

      /**
            Allows you to serialize this object into a JSON encoded string.

            @member ejs.DisMaxQuery
            @returns {String} returns this object as a serialized JSON string.
            */
      toString: function () {
        return JSON.stringify(query);
      },

      /**
            Retrieves the internal <code>query</code> object. This is typically used by
            internal API functions so use with caution.

            @member ejs.DisMaxQuery
            @returns {String} returns this object's internal <code>query</code> property.
            */
      get: function () {
        return query;
      }
    };
  };

  /**
    @class
    <p>A query that is parsed using Lucene's default query parser. Although Lucene provides the
    ability to create your own queries through its API, it also provides a rich query language
    through the Query Parser, a lexer which interprets a string into a Lucene Query.</p>

    </p>See the Lucene <a href="http://lucene.apache.org/java/2_9_1/queryparsersyntax.html">Query Parser Syntax</a>
    for more information.</p>

    <p><strong>Note:</strong> This module contains a related code example.&nbsp;
    <a target="_blank" class="btn c9" href="https://gist.github.com/1893397">View Code Example</a></p>

    @name ejs.QueryString

    @desc
    A query that is parsed using Lucene's default query parser.

    @param {String} queryStr A valid Lucene query string.
    */
  ejs.QueryString = function (queryStr) {

    var query = {
      query_string: {}
    };

    query.query_string.query = queryStr;

    return {

      /**
            Sets the query string on this <code>Query</code> object.

            @member ejs.QueryString
            @param {String} queryStr A valid Lucene query string.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      query: function (queryStr) {
        if (queryStr == null) {
          return query.query_string.query;
        }

        query.query_string.query = queryStr;
        return this;
      },

      /**
            Sets the default field/property this query should execute against.

            @member ejs.QueryString
            @param {String} fieldName The name of document field/property.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      defaultField: function (fieldName) {
        if (fieldName == null) {
          return query.query_string.default_field;
        }
        
        query.query_string.default_field = fieldName;
        return this;
      },

      /**
            A set of fields/properties this query should execute against. The query will be
            run against each field using Lucene's
            <a href="http://lucene.apache.org/java/3_0_0/api/core/org/apache/lucene/search/DisjunctionMaxQuery.html">
            DisjunctionMaxQuery</a> (if <code>dismax</code> is set to <code>true</code>) or
            <code>boolQuery</code> if <code>dismax</code> is set to <code>false</code>.

            @member ejs.QueryString
            @param {Array} fieldNames A list of document fields/properties.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      fields: function (fieldNames) {
        if (fieldNames == null) {
          return query.query_string.fields;
        }
        
        query.query_string.fields = fieldNames;
        return this;
      },

      /**
            Sets whether or not queries against multiple fields should be combined using Lucene's
            <a href="http://lucene.apache.org/java/3_0_0/api/core/org/apache/lucene/search/DisjunctionMaxQuery.html">
            DisjunctionMaxQuery</a>

            @member ejs.QueryString
            @param {String} trueFalse A <code>true/false</code> value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      useDisMax: function (trueFalse) {
        if (trueFalse == null) {
          return query.query_string.use_dis_max;
        }
        
        query.query_string.use_dis_max = trueFalse;
        return this;
      },

      /**
            Set the default <em>Boolean</em> operator. This operator is used to join individual query
            terms when no operator is explicity used in the query string (i.e., <code>this AND that</code>).
            Defaults to <code>OR</code> (<em>same as Google</em>).

            @member ejs.QueryString
            @param {String} op The boost value to apply.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      defaultOperator: function (op) {
        if (op == null) {
          return query.query_string.default_operator;
        }
        
        op = op.toUpperCase();
        if (op === 'AND' || op === 'OR') {
          query.query_string.default_operator = op;
        }
        return this;
      },

      /**
            Sets the analyzer name used to analyze the <code>Query</code> object.

            @member ejs.QueryString
            @param {String} analyzer A valid analyzer name.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      analyzer: function (analyzer) {
        if (analyzer == null) {
          return query.query_string.analyzer;
        }

        query.query_string.analyzer = analyzer;
        return this;
      },

      /**
            Sets whether or not wildcard characters (* and ?) are allowed as the
            first character of the <code>Query</code>.  Default: true.

            @member ejs.QueryString
            @param {Boolean} trueFalse A <code>true/false</code> value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      allowLeadingWildcard: function (trueFalse) {
        if (trueFalse == null) {
          return query.query_string.allow_leading_wildcard;
        }

        query.query_string.allow_leading_wildcard = trueFalse;
        return this;
      },

      /**
            Sets whether or not terms from wildcard, prefix, fuzzy, and
            range queries should automatically be lowercased in the <code>Query</code>
            since they are not analyzed.  Default: true.

            @member ejs.QueryString
            @param {Boolean} trueFalse A <code>true/false</code> value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      lowercaseExpandedTerms: function (trueFalse) {
        if (trueFalse == null) {
          return query.query_string.lowercase_expanded_terms;
        }

        query.query_string.lowercase_expanded_terms = trueFalse;
        return this;
      },

      /**
            Sets whether or not position increments will be used in the
            <code>Query</code>. Default: true.

            @member ejs.QueryString
            @param {Boolean} trueFalse A <code>true/false</code> value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      enablePositionIncrements: function (trueFalse) {
        if (trueFalse == null) {
          return query.query_string.enable_position_increments;
        }

        query.query_string.enable_position_increments = trueFalse;
        return this;
      },


      /**
            Sets the prefix length for fuzzy queries.  Default: 0.

            @member ejs.QueryString
            @param {Integer} fuzzLen A positive <code>integer</code> value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      fuzzyPrefixLength: function (fuzzLen) {
        if (fuzzLen == null) {
          return query.query_string.fuzzy_prefix_length;
        }

        query.query_string.fuzzy_prefix_length = fuzzLen;
        return this;
      },

      /**
            Set the minimum similarity for fuzzy queries.  Default: 0.5.

            @member ejs.QueryString
            @param {Double} minSim A <code>double</code> value between 0 and 1.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      fuzzyMinSim: function (minSim) {
        if (minSim == null) {
          return query.query_string.fuzzy_min_sim;
        }

        query.query_string.fuzzy_min_sim = minSim;
        return this;
      },

      /**
            Sets the default slop for phrases. If zero, then exact phrase matches
            are required.  Default: 0.

            @member ejs.QueryString
            @param {Integer} slop A positive <code>integer</code> value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      phraseSlop: function (slop) {
        if (slop == null) {
          return query.query_string.phrase_slop;
        }

        query.query_string.phrase_slop = slop;
        return this;
      },

      /**
            Sets the boost value of the <code>Query</code>.  Default: 1.0.

            @member ejs.QueryString
            @param {Double} boost A positive <code>double</code> value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      boost: function (boost) {
        if (boost == null) {
          return query.query_string.boost;
        }

        query.query_string.boost = boost;
        return this;
      },

      /**
            Sets whether or not we should attempt to analyzed wilcard terms in the
            <code>Query</code>. By default, wildcard terms are not analyzed.
            Analysis of wildcard characters is not perfect.  Default: false.

            @member ejs.QueryString
            @param {Boolean} trueFalse A <code>true/false</code> value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      analyzeWildcard: function (trueFalse) {
        if (trueFalse == null) {
          return query.query_string.analyze_wildcard;
        }

        query.query_string.analyze_wildcard = trueFalse;
        return this;
      },

      /**
            Sets whether or not we should auto generate phrase queries *if* the
            analyzer returns more than one term. Default: false.

            @member ejs.QueryString
            @param {Boolean} trueFalse A <code>true/false</code> value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      autoGeneratePhraseQueries: function (trueFalse) {
        if (trueFalse == null) {
          return query.query_string.auto_generate_phrase_queries;
        }

        query.query_string.auto_generate_phrase_queries = trueFalse;
        return this;
      },

      /**
            Sets a percent value controlling how many "should" clauses in the
            resulting <code>Query</code> should match.

            @member ejs.QueryString
            @param {Integer} minMatch An <code>integer</code> between 0 and 100.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      minimumShouldMatch: function (minMatch) {
        if (minMatch == null) {
          return query.query_string.minimum_should_match;
        }

        query.query_string.minimum_should_match = minMatch;
        return this;
      },

      /**
            Sets the tie breaker value for a <code>Query</code> using
            <code>DisMax</code>.  The tie breaker capability allows results
            that include the same term in multiple fields to be judged better than
            results that include this term in only the best of those multiple
            fields, without confusing this with the better case of two different
            terms in the multiple fields.  Default: 0.0.

            @member ejs.QueryString
            @param {Double} tieBreaker A positive <code>double</code> value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      tieBreaker: function (tieBreaker) {
        if (tieBreaker == null) {
          return query.query_string.tie_breaker;
        }

        query.query_string.tie_breaker = tieBreaker;
        return this;
      },

      /**
            Allows you to serialize this object into a JSON encoded string.

            @member ejs.QueryString
            @returns {String} returns this object as a serialized JSON string.
            */
      toString: function () {
        return JSON.stringify(query);
      },

      /**
            Retrieves the internal <code>query</code> object. This is typically used by
            internal API functions so use with caution.

            @member ejs.QueryString
            @returns {String} returns this object's internal <code>query</code> property.
            */
      get: function () {
        return query;
      }
    };
  };

  /**
    @class
    <p>Filter queries allow you to restrict the results returned by a query. There are
    several different types of filters that can be applied
    (see <a href="/jsdocs/ejs.filter.html">filter</a> module). A <code>filterQuery</code>
    takes a <code>Query</code> and a <code>Filter</code> object as arguments and constructs
    a new <code>Query</code> that is then used for the search.</p>

    <p><strong>Note:</strong> This module contains a related code example.&nbsp;
    <a target="_blank" class="btn c9" href="https://gist.github.com/1893397">View Code Example</a></p>
    </p>

    @name ejs.FilteredQuery

    @desc
    <p>A query that applies a filter to the results of another query.</p>

    @param {Object} someQuery a valid <code>Query</code> object such as a <code>termQuery, boolQuery,</code> etc.
    @param {Object} someFilter a valid <code>Filter</code> object such as a <code>termFilter, andFilter,</code> etc.

     */
  ejs.FilteredQuery = function (someQuery, someFilter) {

    /**
         The internal query object. Use <code>get()</code>
         @member ejs.FilteredQuery
         @property {Object} query
         */
    var query = {
      filtered: {
        query: someQuery.get(),
        filter: someFilter.get()
      }
    };

    return {

      /**
             The internal query object. See get()
             @member ejs.FilteredQuery
             @property {Object} query
             */
      toString: function () {
        return JSON.stringify(query);
      },

      /**
             returns the query object.
             @member ejs.FilteredQuery
             @returns {Object} query object
             */
      get: function () {
        return query;
      }
    };
  };

  /**
    @class
    <p>Nested queries allow you to search against content within objects that are
       embedded inside of other objects. It is similar to <code>XPath</code> expressions
       in <code>XML</code> both conceptually and syntactically.</p>

    <p><strong>Note:</strong> This module contains a related code example.&nbsp;
    <a target="_blank" class="btn c9" href="https://gist.github.com/1894884">View Code Example</a></p>

    @name ejs.NestedQuery

    @desc
    <p>Constructs a query that is capable of executing a search against objects
       nested within a document.</p>

    @param {Query} oQuery An optional Query object used to construct the nested query.
    The query can also be set using the query method.
  
     */
  ejs.NestedQuery = function (oQuery) {

    /**
         The internal Query object. Use <code>get()</code>.
         @member ejs.NestedQuery
         @property {Object} NestedQuery
         */
    var query = {
      nested: {}
    };

    if (oQuery != null) {
      query.nested.query = oQuery.get();
    }

    return {
      /**
             Sets the root context for the nested query.
             @member ejs.NestedQuery
             @param {String} path The path defining the root context for the nested query.
             @returns {nestedQuery} Returns a reference to the current object.
             */
      path: function (path) {
        if (path == null) {
          return query.nested.path;
        }
        
        query.nested.path = path;
        return this;
      },

      /**
             Sets how the inner (nested) matches affect scoring on the parent document.
             @member ejs.NestedQuery
             @param {String} mode The mode of scoring to be used for nested matches.
                             Options are avg, total, max, none - defaults to avg
             @returns {nestedQuery} Returns a reference to the current object.
             */
      scoreMode: function (mode) {
        if (mode == null) {
          return query.nested.score_mode;
        }
        
        query.nested.score_mode = mode;
        return this;
      },

      /**
             Sets the nested query to be executed.
             @member ejs.NestedQuery
             @returns {nestedQuery} Returns a reference to the current object.
             */
      query: function (oQuery) {
        if (oQuery == null) {
          return query.nested.query;
        }
        
        query.nested.query = oQuery.get();
        return this;
      },

      /**
             Serializes the internal <em>query</em> object as a JSON string.
             @member ejs.NestedQuery
             @returns {String} Returns a JSON representation of the termFilter object.
             */
      toString: function () {
        return JSON.stringify(query);
      },

      /**
            This method is used to retrieve the raw query object. It's designed
            for internal use when composing and serializing queries.
            @member ejs.NestedQuery
            @returns {Object} Returns the object's <em>query</em> property.
            */
      get: function () {
        return query;
      }
    };
  };

  /**
    @class
    <p>A constant score query wraps another <code>Query</code> or
    <code>Filter</code> and returns a constant score for each
    result that is equal to the query boost.</p>

    <p>Note that lucene's query normalization (queryNorm) attempts
    to make scores between different queries comparable.  It does not
    change the relevance of your query, but it might confuse you when
    you look at the score of your documents and they are not equal to
    the query boost value as expected.  The scores were normalized by
    queryNorm, but maintain the same relevance.</p>

    @name ejs.ConstantScoreQuery

    @desc
    <p>Constructs a query where each documents returned by the internal
    query or filter have a constant score equal to the boost factor.</p>

     */
  ejs.ConstantScoreQuery = function () {

    /**
         The internal Query object. Use <code>get()</code>.
         @member ejs.ConstantScoreQuery
         @property {Object} ConstantScoreQuery
         */
    var query = {
      constant_score: {}
    };

    return {
      /**
             Adds the query to apply a constant score to.

             @member ejs.ConstantScoreQuery
             @param {Object} oQuery A valid <code>Query</code> object
             @returns {Object} returns <code>this</code> so that calls can be chained.
             */
      query: function (oQuery) {
        if (oQuery == null) {
          return query.constant_score.query;
        }
        
        query.constant_score.query = oQuery.get();
        return this;
      },

      /**
             Adds the filter to apply a constant score to.

             @member ejs.ConstantScoreQuery
             @param {Object} oFilter A valid <code>Filter</code> object
             @returns {Object} returns <code>this</code> so that calls can be chained.
             */
      filter: function (oFilter) {
        if (oFilter == null) {
          return query.constant_score.filter;
        }
        
        query.constant_score.filter = oFilter.get();
        return this;
      },

      /**
            Sets the boost value of the <code>Query</code>.

            @member ejs.ConstantScoreQuery
            @param {Double} boost A positive <code>double</code> value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      boost: function (boost) {
        if (boost == null) {
          return query.constant_score.boost;
        }

        query.constant_score.boost = boost;
        return this;
      },

      /**
             Serializes the internal <em>query</em> object as a JSON string.
             @member ejs.ConstantScoreQuery
             @returns {String} Returns a JSON representation of the Query object.
             */
      toString: function () {
        return JSON.stringify(query);
      },

      /**
            This method is used to retrieve the raw query object. It's designed
            for internal use when composing and serializing queries.
            @member ejs.ConstantScoreQuery
            @returns {Object} Returns the object's <em>query</em> property.
            */
      get: function () {
        return query;
      }
    };
  };

  /**
    @class
    <p>This query can be used to match all the documents
    in a given set of collections and/or types.</p>

    <p><strong>Note:</strong> This module contains a related code example.&nbsp;
    <a target="_blank" class="btn c9" href="https://gist.github.com/1895130">View Code Example</a></p>

    @name ejs.MatchAllQuery

    @desc
    <p>A query that returns all documents.</p>

     */
  ejs.MatchAllQuery = function () {

    /**
         The internal Query object. Use <code>get()</code>.
         @member ejs.MatchAllQuery
         @property {Object} MatchAllQuery
         */
    var query = {
      match_all: {}
    };

    return {

      /**
             Serializes the internal <em>query</em> object as a JSON string.
             @member ejs.MatchAllQuery
             @returns {String} Returns a JSON representation of the Query object.
             */
      toString: function () {
        return JSON.stringify(query);
      },

      /**
            This method is used to retrieve the raw query object. It's designed
            for internal use when composing and serializing queries.
            @member ejs.MatchAllQuery
            @returns {Object} Returns the object's <em>query</em> property.
            */
      get: function () {
        return query;
      }
    };
  };

  /**
    @class
    <p>A spanTermQuery is the basic unit of Lucene's Span Query which allows for nested,
    positional restrictions when matching documents. The spanTermQuery simply matches
    spans containing a term. It's essentially a termQuery with positional information asscoaited.</p>

    <p><strong>Note:</strong> This module contains a related code example.&nbsp;
    <a target="_blank" class="btn c9" href="https://gist.github.com/1917845">View Code Example</a></p>

    @name ejs.SpanTermQuery

    @desc
    Matches spans containing a term

    @param {String} key the document field/key to query against
    @param {String} value the literal value to be matched
    */
  ejs.SpanTermQuery = function (key, value) {

    /**
         The internal query object. <code>Use get()</code>
         @member ejs.SpanTermQuery
         @property {Object} query
         */
    var k,
    v,
    query = {
      span_term: {}
    };

    k = key;
    v = value;
    query.span_term[k] = v;

    return {

      /**
            Sets the boost value for documents matching the <code>Query</code>.

            @member ejs.SpanTermQuery
            @param {Double} boost A positive <code>double</code> value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      boost: function (boost) {
        if (boost == null) {
          return query.span_term[k].boost;
        }

        query.span_term[k] = {
          value: v,
          boost: boost
        };
        return this;
      },

      /**
            Allows you to serialize this object into a JSON encoded string.

            @member ejs.SpanTermQuery
            @returns {String} returns this object as a serialized JSON string.
            */
      toString: function () {
        return JSON.stringify(query);
      },

      /**
            Retrieves the internal <code>query</code> object. This is typically used by
            internal API functions so use with caution.

            @member ejs.SpanTermQuery
            @returns {String} returns this object's internal <code>query</code> property.
            */
      get: function () {
        return query;
      }
    };
  };

  /**
    @class
    <p>A spanNearQuery will look to find a number of spanQuerys within a given
    distance from each other.</p>

    <p><strong>Note:</strong> This module contains a related code example.&nbsp;
    <a target="_blank" class="btn c9" href="https://gist.github.com/1917845">View Code Example</a></p>

    @name ejs.SpanNearQuery

    @desc
    Matches spans which are near one another.

    @param {Object} aSpanQuery An optional array of valid span type queries.

    */
  ejs.SpanNearQuery = function (aSpanQuery) {

    aSpanQuery = aSpanQuery || [];

    /**
         The internal query object. <code>Use get()</code>
         @member ejs.SpanNearQuery
         @property {Object} query
         */
    var query = {
      span_near: {
        clauses: []
      }
    },

    len = aSpanQuery.length,
    i = 0;

    for (; i < len; i++) {
      query.span_near.clauses.push(aSpanQuery[i].get());
    }

    return {

      /**
            Adds a new span query clause.

            @member ejs.SpanNearQuery
            @param {Object} spanQuery Any valid span type query.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      addClause: function (spanQuery) {
        if (spanQuery == null) {
          return query.span_near.clauses;
        }
        
        query.span_near.clauses.push(spanQuery.get());
        return this;
      },

      /**
            Allows you to add an array of span query clause. Clears any existing clauses.

            @member ejs.SpanNearQuery
            @param {Array} aSpanQuery An array of valid span type queries.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      clauses: function (aSpanQuery) {
        if (aSpanQuery == null) {
          return query.span_near.clauses;
        }
        
        query.span_near.clauses = [];
        var len = aSpanQuery.length,
          i = 0;
        for (; i < len; i++) {
          this.addClause(aSpanQuery[i]);
        }
        return this;
      },

      /**
            Sets the maximum number of intervening unmatched positions.

            @member ejs.SpanNearQuery
            @param {Number} distance The number of intervening unmatched positions.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      slop: function (distance) {
        if (distance == null) {
          return query.span_near.slop;
        }
        
        query.span_near.slop = distance;
        return this;
      },

      /**
            Sets whether or not matches are required to be in-order.

            @member ejs.SpanNearQuery
            @param {Boolean} trueFalse Determines if matches must be in-order.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      inOrder: function (trueFalse) {
        if (trueFalse == null) {
          return query.span_near.in_order;
        }
        
        query.span_near.in_order = trueFalse;
        return this;
      },

      /**
            Sets whether or not payloads are being used. A payload is an arbitrary
            byte array stored at a specific position (i.e. token/term).

            @member ejs.SpanNearQuery
            @param {Boolean} trueFalse Whether or not to return payloads.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      collectPayloads: function (trueFalse) {
        if (trueFalse == null) {
          return query.span_near.collect_payloads;
        }
        
        query.span_near.collect_payloads = trueFalse;
        return this;
      },

      /**
            Allows you to serialize this object into a JSON encoded string.

            @member ejs.SpanNearQuery
            @returns {String} returns this object as a serialized JSON string.
            */
      toString: function () {
        return JSON.stringify(query);
      },

      /**
            Retrieves the internal <code>query</code> object. This is typically used by
            internal API functions so use with caution.

            @member ejs.SpanNearQuery
            @returns {String} returns this object's internal <code>query</code> property.
            */
      get: function () {
        return query;
      }
    };
  };

  /**
    @class
    <p>Removes matches which overlap with another span query.
    The span not query maps to Lucene SpanNotQuery.</p>

    <p><strong>Note:</strong> This module contains a related code example.&nbsp;
    <a target="_blank" class="btn c9" href="https://gist.github.com/1917845">View Code Example</a></p>

    @name ejs.SpanNotQuery

    @desc
    Removes matches which overlap with another span query.

    */
  ejs.SpanNotQuery = function () {

    /**
         The internal query object. <code>Use get()</code>
         @member ejs.SpanNotQuery
         @property {Object} query
         */
    var query = {
      span_not: {}
    };

    return {

      /**
            Set the span query whose matches are filtered.

            @member ejs.SpanNotQuery
            @param {Object} spanQuery Any valid span type query.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      include: function (spanQuery) {
        if (spanQuery == null) {
          return query.span_not.include;
        }
        
        query.span_not.include = spanQuery.get();
        return this;
      },

      /**
            Sets the span query whose matches must not overlap those returned.

            @member ejs.SpanNotQuery
            @param {Object} spanQuery Any valid span type query.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      exclude: function (spanQuery) {
        if (spanQuery == null) {
          return query.span_not.exclude;
        }
        
        query.span_not.exclude = spanQuery.get();
        return this;
      },

      /**
            Allows you to serialize this object into a JSON encoded string.

            @member ejs.SpanNotQuery
            @returns {String} returns this object as a serialized JSON string.
            */
      toString: function () {
        return JSON.stringify(query);
      },

      /**
            Retrieves the internal <code>query</code> object. This is typically used by
            internal API functions so use with caution.

            @member ejs.SpanNotQuery
            @returns {String} returns this object's internal <code>query</code> property.
            */
      get: function () {
        return query;
      }
    };
  };

  /**
    @class
    <p>The spanOrQuery takes an array of SpanQuerys and will match if any of the
    underlying SpanQueries match. The span or query maps to Lucene SpanOrQuery.</p>

    @name ejs.SpanOrQuery

    @desc
    Matches the union of its span clauses.

    @param {Object} aSpanQuery An optional array of valid span type queries.

    */
  ejs.SpanOrQuery = function (aSpanQuery) {

    aSpanQuery = aSpanQuery || [];

    /**
         The internal query object. <code>Use get()</code>
         @member ejs.SpanOrQuery
         @property {Object} query
         */
    var query = {
      span_or: {
        clauses: []
      }
    },

    len = aSpanQuery.length,
    i = 0;

    for (; i < len; i++) {
      query.span_or.clauses.push(aSpanQuery[i].get());
    }

    return {

      /**
            Adds a new span query clause.

            @member ejs.SpanOrQuery
            @param {Object} spanQuery Any valid span type query.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      addClause: function (spanQuery) {
        if (spanQuery == null) {
          return query.span_or.clauses;
        }
        
        query.span_or.clauses.push(spanQuery.get());
        return this;
      },

      /**
            Allows you to add an array of span query clause. Clears any existing clauses.

            @member ejs.SpanOrQuery
            @param {Array} aSpanQuery An array of valid span type queries.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      clauses: function (aSpanQuery) {
        if (aSpanQuery == null) {
          return query.span_or.clauses;
        }
        
        query.span_or.clauses = [];
        var len = aSpanQuery.length,
          i = 0;
        for (; i < len; i++) {
          this.addClause(aSpanQuery[i]);
        }
        return this;
      },

      /**
            Allows you to serialize this object into a JSON encoded string.

            @member ejs.SpanOrQuery
            @returns {String} returns this object as a serialized JSON string.
            */
      toString: function () {
        return JSON.stringify(query);
      },

      /**
            Retrieves the internal <code>query</code> object. This is typically used by
            internal API functions so use with caution.

            @member ejs.SpanOrQuery
            @returns {String} returns this object's internal <code>query</code> property.
            */
      get: function () {
        return query;
      }
    };
  };


  /**
    @class
    <p>Matches spans near the beginning of a field. The spanFirstQuery allows you to search
    for Spans that start and end within the first <code>n</code> positions of the document.
    The span first query maps to Lucene SpanFirstQuery.</p>

    @name ejs.SpanFirstQuery

    @desc
    Matches spans near the beginning of a field.

    */
  ejs.SpanFirstQuery = function () {

    /**
         The internal query object. <code>Use get()</code>
         @member ejs.SpanFirstQuery
         @property {Object} query
         */
    var query = {
      span_first: {}
    };

    return {

      /**
            Sets the span query to match on.

            @member ejs.SpanFirstQuery
            @param {Object} spanQuery Any valid span type query.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      match: function (spanQuery) {
        if (spanQuery == null) {
          return query.span_first.match;
        }
        
        query.span_first.match = spanQuery.get();
        return this;
      },

      /**
            Sets the maximum end position permitted in a match.

            @member ejs.SpanFirstQuery
            @param {Number} position The maximum position length to consider.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      end: function (position) {
        if (position == null) {
          return query.span_first.end;
        }
        
        query.span_first.end = position;
        return this;
      },

      /**
            Allows you to serialize this object into a JSON encoded string.

            @member ejs.SpanFirstQuery
            @returns {String} returns this object as a serialized JSON string.
            */
      toString: function () {
        return JSON.stringify(query);
      },

      /**
            Retrieves the internal <code>query</code> object. This is typically used by
            internal API functions so use with caution.

            @member ejs.SpanFirstQuery
            @returns {String} returns this object's internal <code>query</code> property.
            */
      get: function () {
        return query;
      }
    };
  };

