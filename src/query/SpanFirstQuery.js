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
