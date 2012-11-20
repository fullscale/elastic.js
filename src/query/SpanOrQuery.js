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
