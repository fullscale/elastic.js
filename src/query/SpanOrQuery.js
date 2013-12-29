  /**
    @class
    <p>The spanOrQuery takes an array of SpanQuerys and will match if any of the
    underlying SpanQueries match. The span or query maps to Lucene SpanOrQuery.</p>

    @name ejs.SpanOrQuery
    @ejs query
    @borrows ejs.QueryMixin.boost as boost
    @borrows ejs.QueryMixin._type as _type
    @borrows ejs.QueryMixin.toJSON as toJSON

    @desc
    Matches the union of its span clauses.

    @param {Object} clauses A single SpanQuery or array of SpanQueries.

    */
  ejs.SpanOrQuery = function (clauses) {

    var
      i, 
      len,
      _common = ejs.QueryMixin('span_or'),
      query = _common.toJSON();
    
    query.span_or.clauses = [];

    if (isQuery(clauses)) {
      query.span_or.clauses.push(clauses.toJSON());
    } else if (isArray(clauses)) {
      for (i = 0, len = clauses.length; i < len; i++) {
        if (!isQuery(clauses[i])) {
          throw new TypeError('Argument must be array of SpanQueries');
        }
        
        query.span_or.clauses.push(clauses[i].toJSON());
      }
    } else {
      throw new TypeError('Argument must be SpanQuery or array of SpanQueries');
    }

    return extend(_common, {

      /**
            Sets the clauses used.  If passed a single SpanQuery, it is added
            to the existing list of clauses.  If passed an array of
            SpanQueries, they replace any existing clauses.

            @member ejs.SpanOrQuery
            @param {(Query|Query[])} clauses A SpanQuery or array of SpanQueries.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      clauses: function (clauses) {
        var i, len;
        
        if (clauses == null) {
          return query.span_or.clauses;
        }
      
        if (isQuery(clauses)) {
          query.span_or.clauses.push(clauses.toJSON());
        } else if (isArray(clauses)) {
          query.span_or.clauses = [];
          for (i = 0, len = clauses.length; i < len; i++) {
            if (!isQuery(clauses[i])) {
              throw new TypeError('Argument must be array of SpanQueries');
            }

            query.span_or.clauses.push(clauses[i].toJSON());
          }
        } else {
          throw new TypeError('Argument must be SpanQuery or array of SpanQueries');
        }
        
        return this;
      }
      
    });
  };
