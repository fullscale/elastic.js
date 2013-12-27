  /**
    @class
    <p>Matches spans near the beginning of a field. The spanFirstQuery allows you to search
    for Spans that start and end within the first <code>n</code> positions of the document.
    The span first query maps to Lucene SpanFirstQuery.</p>

    @name ejs.SpanFirstQuery
    @ejs query
    @borrows ejs.QueryMixin.boost as boost
    @borrows ejs.QueryMixin._type as _type
    @borrows ejs.QueryMixin.toJSON as toJSON

    @desc
    Matches spans near the beginning of a field.

    @param {Query} spanQry A valid SpanQuery
    @param {Integer} end the maximum end position in a match.
    
    */
  ejs.SpanFirstQuery = function (spanQry, end) {

    if (!isQuery(spanQry)) {
      throw new TypeError('Argument must be a SpanQuery');
    }
    
    var 
      _common = ejs.QueryMixin('span_first'),
      query = _common.toJSON();
    
    query.span_first.match = spanQry.toJSON();
    query.span_first.end = end;

    return extend(_common, {

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
      
        if (!isQuery(spanQuery)) {
          throw new TypeError('Argument must be a SpanQuery');
        }
        
        query.span_first.match = spanQuery.toJSON();
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
      }
      
    });
  };
