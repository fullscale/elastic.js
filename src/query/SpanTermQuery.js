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
