  /**
    @class
    A query that generates the union of documents produced by its subqueries, and
    that scores each document with the maximum score for that document as produced
    by any subquery, plus a tie breaking increment for any additional matching
    subqueries.

    @name ejs.DisMaxQuery
    @ejs query
    @borrows ejs.QueryMixin.boost as boost
    @borrows ejs.QueryMixin._type as _type
    @borrows ejs.QueryMixin.toJSON as toJSON

    @desc
    A query that generates the union of documents produced by its subqueries such
    as <code>termQuerys, phraseQuerys</code>, <code>boolQuerys</code>, etc.

    */
  ejs.DisMaxQuery = function () {

    var
      _common = ejs.QueryMixin('dis_max'),
      query = _common.toJSON();

    return extend(_common, {

      /**
            Updates the queries.  If passed a single Query, it is added to the
            list of existing queries.  If passed an array of Queries, it 
            replaces all existing values.

            @member ejs.DisMaxQuery
            @param {(Query|Query[])} qs A single Query or an array of Queries
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      queries: function (qs) {
        var i, len;
        
        if (qs == null) {
          return query.dis_max.queries;
        }
      
        if (query.dis_max.queries == null) {
          query.dis_max.queries = [];
        }
        
        if (isQuery(qs)) {
          query.dis_max.queries.push(qs.toJSON());
        } else if (isArray(qs)) {
          query.dis_max.queries = [];
          for (i = 0, len = qs.length; i < len; i++) {
            if (!isQuery(qs[i])) {
              throw new TypeError('Argument must be array of Queries');
            }
            
            query.dis_max.queries.push(qs[i].toJSON());
          }
        } else {
          throw new TypeError('Argument must be a Query or array of Queries');
        }

        return this;
      },

      /**
            <p>The tie breaker value.</p>  

            <p>The tie breaker capability allows results that include the same term in multiple 
            fields to be judged better than results that include this term in only the best of those 
            multiple fields, without confusing this with the better case of two different terms in 
            the multiple fields.</p>  

            <p>Default: 0.0.</p>

            @member ejs.DisMaxQuery
            @param {Double} tieBreaker A positive <code>double</code> value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      tieBreaker: function (tieBreaker) {
        if (tieBreaker == null) {
          return query.dis_max.tie_breaker;
        }

        query.dis_max.tie_breaker = tieBreaker;
        return this;
      }
      
    });
  };
  
