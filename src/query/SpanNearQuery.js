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
