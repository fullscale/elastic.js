  /**
    @class
    <p>Removes matches which overlap with another span query.
    The span not query maps to Lucene SpanNotQuery.</p>

    @name ejs.SpanNotQuery
    @ejs query
    @borrows ejs.QueryMixin.boost as boost
    @borrows ejs.QueryMixin._type as _type
    @borrows ejs.QueryMixin.toJSON as toJSON

    @desc
    Removes matches which overlap with another span query.

    @param {Query} includeQry a valid SpanQuery whose matching docs will be returned.
    @param {Query} excludeQry a valid SpanQuery whose matching docs will not be returned
    
    */
  ejs.SpanNotQuery = function (includeQry, excludeQry) {

    if (!isQuery(includeQry) || !isQuery(excludeQry)) {
      throw new TypeError('Argument must be a SpanQuery');
    }
    
    var
      _common = ejs.QueryMixin('span_not'),
      query = _common.toJSON();
    
    query.span_not.include = includeQry.toJSON();
    query.span_not.exclude = excludeQry.toJSON();

    return extend(_common, {

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
      
        if (!isQuery(spanQuery)) {
          throw new TypeError('Argument must be a SpanQuery');
        }
        
        query.span_not.include = spanQuery.toJSON();
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
      
        if (!isQuery(spanQuery)) {
          throw new TypeError('Argument must be a SpanQuery');
        }
        
        query.span_not.exclude = spanQuery.toJSON();
        return this;
      }
      
    });
  };
