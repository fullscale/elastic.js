  /**
    @class
    <p>A spanNearQuery will look to find a number of spanQuerys within a given
    distance from each other.</p>

    @name ejs.SpanNearQuery
    @ejs query
    @borrows ejs.QueryMixin.boost as boost
    @borrows ejs.QueryMixin._type as _type
    @borrows ejs.QueryMixin.toJSON as toJSON

    @desc
    Matches spans which are near one another.

    @param {(Query|Query[])} clauses A single SpanQuery or array of SpanQueries
    @param {Integer} slop The number of intervening unmatched positions

    */
  ejs.SpanNearQuery = function (clauses, slop) {

    var 
      i, 
      len,
      _common = ejs.QueryMixin('span_near'),
      query = _common.toJSON();
    
    query.span_near.clauses = [];
    query.span_near.slop = slop;
    
    if (isQuery(clauses)) {
      query.span_near.clauses.push(clauses.toJSON());
    } else if (isArray(clauses)) {
      for (i = 0, len = clauses.length; i < len; i++) {
        if (!isQuery(clauses[i])) {
          throw new TypeError('Argument must be array of SpanQueries');
        }
        
        query.span_near.clauses.push(clauses[i].toJSON());
      }
    } else {
      throw new TypeError('Argument must be SpanQuery or array of SpanQueries');
    }

    return extend(_common, {

      /**
            Sets the clauses used.  If passed a single SpanQuery, it is added
            to the existing list of clauses.  If passed an array of
            SpanQueries, they replace any existing clauses.

            @member ejs.SpanNearQuery
            @param {(Query|Query[])} clauses A SpanQuery or array of SpanQueries.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      clauses: function (clauses) {
        var i, len;
        
        if (clauses == null) {
          return query.span_near.clauses;
        }
      
        if (isQuery(clauses)) {
          query.span_near.clauses.push(clauses.toJSON());
        } else if (isArray(clauses)) {
          query.span_near.clauses = [];
          for (i = 0, len = clauses.length; i < len; i++) {
            if (!isQuery(clauses[i])) {
              throw new TypeError('Argument must be array of SpanQueries');
            }

            query.span_near.clauses.push(clauses[i].toJSON());
          }
        } else {
          throw new TypeError('Argument must be SpanQuery or array of SpanQueries');
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
      }
      
    });
  };
