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
