  /**
    @class
    <p>Wraps lucene MultiTermQueries as a SpanQuery so it can be used in the
    various Span* queries.  Examples of valid MultiTermQueries are
    <code>Fuzzy, NumericRange, Prefix, Regex, Range, and Wildcard</code>.</p>

    @name ejs.SpanMultiTermQuery
    @ejs query
    @borrows ejs.QueryMixin.boost as boost
    @borrows ejs.QueryMixin._type as _type
    @borrows ejs.QueryMixin.toJSON as toJSON

    @desc
    Use MultiTermQueries as a SpanQuery.

    @param {Query} qry An optional multi-term query object.
    */
  ejs.SpanMultiTermQuery = function (qry) {

    if (qry != null && !isQuery(qry)) {
      throw new TypeError('Argument must be a MultiTermQuery');
    }

    var 
      _common = ejs.QueryMixin('span_multi'),
      query = _common.toJSON();
    
    query.span_multi.match = {};
    
    if (qry != null) {
      query.span_multi.match = qry.toJSON();
    }

    return extend(_common, {

      /**
            Sets the span query to match on.

            @member ejs.SpanMultiTermQuery
            @param {Object} mtQuery Any valid multi-term query.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      match: function (mtQuery) {
        if (mtQuery == null) {
          return query.span_multi.match;
        }
  
        if (!isQuery(mtQuery)) {
          throw new TypeError('Argument must be a MultiTermQuery');
        }
    
        query.span_multi.match = mtQuery.toJSON();
        return this;
      }
      
    });
  };
