  /**
    @class
    A <code>MatchQuery</code> is a type of <code>Query</code> that accepts 
    text/numerics/dates, analyzes it, generates a query based on the
    <code>MatchQuery</code> type.
  
    @name ejs.MatchQuery

    @desc
    A Query that appects text, analyzes it, generates internal query based
    on the MatchQuery type.

    @param {String} key the document field/key to query against
    @param {String} value the query string
    */
  ejs.MatchQuery = function (key, value) {

    /**
         The internal query object. <code>Use get()</code>
         @member ejs.MatchQuery
         @property {Object} query
         */
    var k,
    v,
    query = {
      match: {}
    };

    k = key;
    v = value;
    query.match[k] = {
      query: v
    };

    return {

      /**
            Sets the boost value for documents matching the <code>Query</code>.

            @member ejs.MatchQuery
            @param {Number} boost A positive <code>double</code> value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      boost: function (boost) {
        if (boost == null) {
          return query.match[k].boost;
        }

        query.match[k].boost = boost;
        return this;
      },

      /**
            Sets the query string for the <code>Query</code>.

            @member ejs.MatchQuery
            @param {String} qstr The query string to search for.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      query: function (qstr) {
        if (qstr == null) {
          return query.match[k].query;
        }

        query.match[k].query = qstr;
        return this;
      },

      /**
            Sets the type of the <code>MatchQuery</code>.  Valid values are
            boolean, phrase, and phrase_prefix or phrasePrefix.

            @member ejs.MatchQuery
            @param {String} type Any of boolean, phrase, phrase_prefix or phrasePrefix.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      type: function (type) {
        if (type == null) {
          return query.match[k].type;
        }

        if (type === 'boolean' || type === 'phrase' || type === 'phrase_prefix' || type === 'phrasePrefix') {
          query.match[k].type = type;
        }

        return this;
      },

      /**
            Sets the fuzziness value for the <code>Query</code>.

            @member ejs.MatchQuery
            @param {Double} fuzz A <code>double</code> value between 0.0 and 1.0.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      fuzziness: function (fuzz) {
        if (fuzz == null) {
          return query.match[k].fuzziness;
        }

        query.match[k].fuzziness = fuzz;
        return this;
      },

      /**
            Sets the prefix length for a fuzzy prefix <code>MatchQuery</code>.

            @member ejs.MatchQuery
            @param {Integer} l A positive <code>integer</code> length value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      prefixLength: function (l) {
        if (l == null) {
          return query.match[k].prefix_length;
        }

        query.match[k].prefix_length = l;
        return this;
      },

      /**
            Sets the max expansions of a fuzzy <code>MatchQuery</code>.

            @member ejs.MatchQuery
            @param {Integer} e A positive <code>integer</code> value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      maxExpansions: function (e) {
        if (e == null) {
          return query.match[k].max_expansions;
        }

        query.match[k].max_expansions = e;
        return this;
      },

      /**
            Sets default operator of the <code>Query</code>.  Default: or.

            @member ejs.MatchQuery
            @param {String} op Any of "and" or "or", no quote characters.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      operator: function (op) {
        if (op == null) {
          return query.match[k].operator;
        }

        op = op.toLowerCase();
        if (op === 'and' || op === 'or') {
          query.match[k].operator = op;
        }

        return this;
      },

      /**
            Sets the default slop for phrases. If zero, then exact phrase matches
            are required.  Default: 0.

            @member ejs.MatchQuery
            @param {Integer} slop A positive <code>integer</code> value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      slop: function (slop) {
        if (slop == null) {
          return query.match[k].slop;
        }

        query.match[k].slop = slop;
        return this;
      },

      /**
            Sets the analyzer name used to analyze the <code>Query</code> object.

            @member ejs.MatchQuery
            @param {String} analyzer A valid analyzer name.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      analyzer: function (analyzer) {
        if (analyzer == null) {
          return query.match[k].analyzer;
        }

        query.match[k].analyzer = analyzer;
        return this;
      },

      /**
            Allows you to serialize this object into a JSON encoded string.

            @member ejs.MatchQuery
            @returns {String} returns this object as a serialized JSON string.
            */
      toString: function () {
        return JSON.stringify(query);
      },

      /**
            Retrieves the internal <code>query</code> object. This is typically used by
            internal API functions so use with caution.

            @member ejs.MatchQuery
            @returns {String} returns this object's internal <code>query</code> property.
            */
      get: function () {
        return query;
      }
    };
  };
