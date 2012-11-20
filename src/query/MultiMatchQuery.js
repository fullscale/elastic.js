  /**
    @class
    A <code>MultiMatchQuery</code> query builds further on top of the 
    <code>MatchQuery</code> by allowing multiple fields to be specified. 
    The idea here is to allow to more easily build a concise match type query 
    over multiple fields instead of using a relatively more expressive query 
    by using multiple match queries within a bool query.
  
    @name ejs.MultiMatchQuery

    @desc
    A Query that allow to more easily build a MatchQuery 
    over multiple fields

    @param {Array} fields the list of fields to search across
    @param {String} value the query string
    */
  ejs.MultiMatchQuery = function (fields, value) {

    /**
         The internal query object. <code>Use get()</code>
         @member ejs.MultiMatchQuery
         @property {Object} query
         */
    var query = {
      multi_match: {
        query: value,
        fields: fields
      }
    };

    return {

      /**
            Sets the fields to search across.

            @member ejs.MultiMatchQuery
            @param {Array} f A list of fields names to search across.
            @returns {Object} returns <code>this</code> so that calls can be 
              chained. Returns {Array} current value if `f` not specified.
            */
      fields: function (f) {
        if (f == null) {
          return query.multi_match.fields;
        }

        query.multi_match.fields = f;
        return this;
      },

      /**
            Sets whether or not queries against multiple fields should be combined using Lucene's
            <a href="http://lucene.apache.org/java/3_0_0/api/core/org/apache/lucene/search/DisjunctionMaxQuery.html">
            DisjunctionMaxQuery</a>

            @member ejs.MultiMatchQuery
            @param {String} trueFalse A <code>true/false</code> value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      useDisMax: function (trueFalse) {
        if (trueFalse == null) {
          return query.multi_match.use_dis_max;
        }
      
        query.multi_match.use_dis_max = trueFalse;
        return this;
      },

      /**
            The tie breaker value.  The tie breaker capability allows results
            that include the same term in multiple fields to be judged better than
            results that include this term in only the best of those multiple
            fields, without confusing this with the better case of two different
            terms in the multiple fields.  Default: 0.0.

            @member ejs.MultiMatchQuery
            @param {Double} tieBreaker A positive <code>double</code> value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      tieBreaker: function (tieBreaker) {
        if (tieBreaker == null) {
          return query.multi_match.tie_breaker;
        }

        query.multi_match.tie_breaker = tieBreaker;
        return this;
      },
                
      /**
            Sets the boost value for documents matching the <code>Query</code>.

            @member ejs.MultiMatchQuery
            @param {Number} boost A positive <code>double</code> value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      boost: function (boost) {
        if (boost == null) {
          return query.multi_match.boost;
        }

        query.multi_match.boost = boost;
        return this;
      },

      /**
            Sets the query string for the <code>Query</code>.

            @member ejs.MultiMatchQuery
            @param {String} qstr The query string to search for.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      query: function (qstr) {
        if (qstr == null) {
          return query.multi_match.query;
        }

        query.multi_match.query = qstr;
        return this;
      },

      /**
            Sets the type of the <code>MultiMatchQuery</code>.  Valid values are
            boolean, phrase, and phrase_prefix or phrasePrefix.

            @member ejs.MultiMatchQuery
            @param {String} type Any of boolean, phrase, phrase_prefix or phrasePrefix.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      type: function (type) {
        if (type == null) {
          return query.multi_match.type;
        }

        if (type === 'boolean' || type === 'phrase' || type === 'phrase_prefix' || type === 'phrasePrefix') {
          query.multi_match.type = type;
        }

        return this;
      },

      /**
            Sets the fuzziness value for the <code>Query</code>.

            @member ejs.MultiMatchQuery
            @param {Double} fuzz A <code>double</code> value between 0.0 and 1.0.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      fuzziness: function (fuzz) {
        if (fuzz == null) {
          return query.multi_match.fuzziness;
        }

        query.multi_match.fuzziness = fuzz;
        return this;
      },

      /**
            Sets the prefix length for a fuzzy prefix <code>Query</code>.

            @member ejs.MultiMatchQuery
            @param {Integer} l A positive <code>integer</code> length value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      prefixLength: function (l) {
        if (l == null) {
          return query.multi_match.prefix_length;
        }

        query.multi_match.prefix_length = l;
        return this;
      },

      /**
            Sets the max expansions of a fuzzy <code>Query</code>.

            @member ejs.MultiMatchQuery
            @param {Integer} e A positive <code>integer</code> value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      maxExpansions: function (e) {
        if (e == null) {
          return query.multi_match.max_expansions;
        }

        query.multi_match.max_expansions = e;
        return this;
      },

      /**
            Sets default operator of the <code>Query</code>.  Default: or.

            @member ejs.MultiMatchQuery
            @param {String} op Any of "and" or "or", no quote characters.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      operator: function (op) {
        if (op == null) {
          return query.multi_match.operator;
        }

        op = op.toLowerCase();
        if (op === 'and' || op === 'or') {
          query.multi_match.operator = op;
        }

        return this;
      },

      /**
            Sets the default slop for phrases. If zero, then exact phrase matches
            are required.  Default: 0.

            @member ejs.MultiMatchQuery
            @param {Integer} slop A positive <code>integer</code> value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      slop: function (slop) {
        if (slop == null) {
          return query.multi_match.slop;
        }

        query.multi_match.slop = slop;
        return this;
      },

      /**
            Sets the analyzer name used to analyze the <code>Query</code> object.

            @member ejs.MultiMatchQuery
            @param {String} analyzer A valid analyzer name.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      analyzer: function (analyzer) {
        if (analyzer == null) {
          return query.multi_match.analyzer;
        }

        query.multi_match.analyzer = analyzer;
        return this;
      },

      /**
            Allows you to serialize this object into a JSON encoded string.

            @member ejs.MultiMatchQuery
            @returns {String} returns this object as a serialized JSON string.
            */
      toString: function () {
        return JSON.stringify(query);
      },

      /**
            Retrieves the internal <code>Query</code> object. This is typically used by
            internal API functions so use with caution.

            @member ejs.MultiMatchQuery
            @returns {String} returns this object's internal <code>query</code> property.
            */
      get: function () {
        return query;
      }
    };
  };
