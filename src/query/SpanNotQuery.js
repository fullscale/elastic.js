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
