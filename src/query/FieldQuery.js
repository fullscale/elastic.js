  /**
    @class
    A query that executes against a given field or document property. It is a simplified version
    of the <code><a href="/jsdocs/ejs.queryString.html">queryString</a></code> object.

    @name ejs.FieldQuery

    @desc
    A query that executes against a given field or document property.

    @param {String} field The field or document property to search against.
    @param {String} qstr The value to match.
    */
  ejs.FieldQuery = function (field, qstr) {

    /**
         The internal query object. <code>Use get()</code>
         @member ejs.FieldQuery
         @property {Object} query
         */
    var query = {
      field: {}
    };
    
    query.field[field] = {
      query: qstr
    };

    return {

      /**
             The field to run the query against.

             @member ejs.FieldQuery
             @param {String} f A single field name.
             @returns {Object} returns <code>this</code> so that calls can be chained.
             */
      field: function (f) {
        var oldValue = query.field[field];

        if (f == null) {
          return field;
        }

        delete query.field[field];
        field = f;
        query.field[f] = oldValue;

        return this;
      },
      
      /**
             Sets the query string.

             @member ejs.FieldQuery
             @param {String} q The lucene query string.
             @returns {Object} returns <code>this</code> so that calls can be chained.
             */
      query: function (q) {
        if (q == null) {
          return query.field[field].query;
        }

        query.field[field].query = q;
        return this;
      },
      
      /**
            Set the default <em>Boolean</em> operator. This operator is used 
            to join individual query terms when no operator is explicity used 
            in the query string (i.e., <code>this AND that</code>).
            Defaults to <code>OR</code> (<em>same as Google</em>).

            @member ejs.FieldQuery
            @param {String} op The operator, AND or OR.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      defaultOperator: function (op) {
        if (op == null) {
          return query.field[field].default_operator;
        }
      
        op = op.toUpperCase();
        if (op === 'AND' || op === 'OR') {
          query.field[field].default_operator = op;
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
        if (analyzer == null) {
          return query.field[field].analyzer;
        }

        query.field[field].analyzer = analyzer;
        return this;
      },

      /**
            Sets the quote analyzer name used to analyze the <code>query</code>
            when in quoted text.

            @member ejs.FieldQuery
            @param {String} analyzer A valid analyzer name.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      quoteAnalyzer: function (analyzer) {
        if (analyzer == null) {
          return query.field[field].quote_analyzer;
        }

        query.field[field].quote_analyzer = analyzer;
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
        if (trueFalse == null) {
          return query.field[field].auto_generate_phrase_queries;
        }

        query.field[field].auto_generate_phrase_queries = trueFalse;
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
        if (trueFalse == null) {
          return query.field[field].allow_leading_wildcard;
        }

        query.field[field].allow_leading_wildcard = trueFalse;
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
        if (trueFalse == null) {
          return query.field[field].lowercase_expanded_terms;
        }

        query.field[field].lowercase_expanded_terms = trueFalse;
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
        if (trueFalse == null) {
          return query.field[field].enable_position_increments;
        }

        query.field[field].enable_position_increments = trueFalse;
        return this;
      },

      /**
            Set the minimum similarity for fuzzy queries.  Default: 0.5.

            @member ejs.FieldQuery
            @param {Double} minSim A <code>double</code> value between 0 and 1.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      fuzzyMinSim: function (minSim) {
        if (minSim == null) {
          return query.field[field].fuzzy_min_sim;
        }

        query.field[field].fuzzy_min_sim = minSim;
        return this;
      },

      /**
            Sets the boost value of the <code>Query</code>.  Default: 1.0.

            @member ejs.FieldQuery
            @param {Double} boost A positive <code>double</code> value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      boost: function (boost) {
        if (boost == null) {
          return query.field[field].boost;
        }

        query.field[field].boost = boost;
        return this;
      },

      /**
            Sets the prefix length for fuzzy queries.  Default: 0.

            @member ejs.FieldQuery
            @param {Integer} fuzzLen A positive <code>integer</code> value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      fuzzyPrefixLength: function (fuzzLen) {
        if (fuzzLen == null) {
          return query.field[field].fuzzy_prefix_length;
        }

        query.field[field].fuzzy_prefix_length = fuzzLen;
        return this;
      },

      /**
            Sets the max number of term expansions for fuzzy queries.  

            @member ejs.FieldQuery
            @param {Integer} max A positive <code>integer</code> value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      fuzzyMaxExpansions: function (max) {
        if (max == null) {
          return query.field[field].fuzzy_max_expansions;
        }

        query.field[field].fuzzy_max_expansions = max;
        return this;
      },

      /**
            Sets fuzzy rewrite method.  Valid values are: 
            
            constant_score_auto - tries to pick the best constant-score rewrite 
              method based on term and document counts from the query
              
            scoring_boolean - translates each term into boolean should and 
              keeps the scores as computed by the query
              
            constant_score_boolean - same as scoring_boolean, expect no scores
              are computed.
              
            constant_score_filter - first creates a private Filter, by visiting 
              each term in sequence and marking all docs for that term
              
            top_terms_boost_N - first translates each term into boolean should
              and scores are only computed as the boost using the top N
              scoring terms.  Replace N with an integer value.
              
            top_terms_N -   first translates each term into boolean should
                and keeps the scores as computed by the query. Only the top N
                scoring terms are used.  Replace N with an integer value.
            
            Default is constant_score_auto.

            This is an advanced option, use with care.
            
            @member ejs.FieldQuery
            @param {String} m The rewrite method as a string.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      fuzzyRewrite: function (m) {
        if (m == null) {
          return query.field[field].fuzzy_rewrite;
        }

        m = m.toLowerCase();
        if (m === 'constant_score_auto' || m === 'scoring_boolean' ||
          m === 'constant_score_boolean' || m === 'constant_score_filter' ||
          m.indexOf('top_terms_boost_') === 0 || 
          m.indexOf('top_terms_') === 0) {
            
          query.field[field].fuzzy_rewrite = m;
        }
        
        return this;
      },

      /**
            Sets rewrite method.  Valid values are: 
            
            constant_score_auto - tries to pick the best constant-score rewrite 
              method based on term and document counts from the query
              
            scoring_boolean - translates each term into boolean should and 
              keeps the scores as computed by the query
              
            constant_score_boolean - same as scoring_boolean, expect no scores
              are computed.
              
            constant_score_filter - first creates a private Filter, by visiting 
              each term in sequence and marking all docs for that term
              
            top_terms_boost_N - first translates each term into boolean should
              and scores are only computed as the boost using the top N
              scoring terms.  Replace N with an integer value.
              
            top_terms_N -   first translates each term into boolean should
                and keeps the scores as computed by the query. Only the top N
                scoring terms are used.  Replace N with an integer value.
            
            Default is constant_score_auto.

            This is an advanced option, use with care.

            @member ejs.FieldQuery
            @param {String} m The rewrite method as a string.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      rewrite: function (m) {
        if (m == null) {
          return query.field[field].rewrite;
        }
        
        m = m.toLowerCase();
        if (m === 'constant_score_auto' || m === 'scoring_boolean' ||
          m === 'constant_score_boolean' || m === 'constant_score_filter' ||
          m.indexOf('top_terms_boost_') === 0 || 
          m.indexOf('top_terms_') === 0) {
            
          query.field[field].rewrite = m;
        }
        
        return this;
      },

      /**
            Sets the suffix to automatically add to the field name when 
            performing a quoted search.

            @member ejs.FieldQuery
            @param {String} s The suffix as a string.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      quoteFieldSuffix: function (s) {
        if (s == null) {
          return query.field[field].quote_field_suffix;
        }

        query.field[field].quote_field_suffix = s;
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
        if (slop == null) {
          return query.field[field].phrase_slop;
        }

        query.field[field].phrase_slop = slop;
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
        if (trueFalse == null) {
          return query.field[field].analyze_wildcard;
        }

        query.field[field].analyze_wildcard = trueFalse;
        return this;
      },

      /**
            If they query string should be escaped or not.

            @member ejs.FieldQuery
            @param {Boolean} trueFalse A <code>true/false</code> value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      escape: function (trueFalse) {
        if (trueFalse == null) {
          return query.field[field].escape;
        }

        query.field[field].escape = trueFalse;
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
        if (minMatch == null) {
          return query.field[field].minimum_should_match;
        }

        query.field[field].minimum_should_match = minMatch;
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
