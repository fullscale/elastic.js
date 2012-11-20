  /**
    @class
    A query that generates the union of documents produced by its subqueries, and
    that scores each document with the maximum score for that document as produced
    by any subquery, plus a tie breaking increment for any additional matching
    subqueries.

    @name ejs.DisMaxQuery

    @desc
    A query that generates the union of documents produced by its subqueries such
    as <code>termQuerys, phraseQuerys</code>, <code>boolQuerys</code>, etc.

    */
  ejs.DisMaxQuery = function () {

    /**
         The internal query object. <code>Use get()</code>
         @member ejs.DisMaxQuery
         @property {Object} query
         */
    var query = {
      dis_max: {}
    };

    return {

      /**
            Adds the given sub query.

            @member ejs.DisMaxQuery
            @param {Object} subQuery A <code>Query</code> object.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      add: function (subQuery) {
        if (subQuery == null) {
          return query.dis_max.queries;
        }
      
        if (typeof query.dis_max.queries !== "undefined") {
          query.dis_max.queries.push(subQuery.get());
        } else {
          query.dis_max.queries = [subQuery.get()];
        }

        return this;
      },

      /**
            Sets the boost value of the <code>Query</code>.  Default: 1.0.

            @member ejs.DisMaxQuery
            @param {Double} boost A positive <code>double</code> value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      boost: function (boost) {
        if (boost == null) {
          return query.dis_max.boost;
        }

        query.dis_max.boost = boost;
        return this;
      },


      /**
            The tie breaker value.  The tie breaker capability allows results
            that include the same term in multiple fields to be judged better than
            results that include this term in only the best of those multiple
            fields, without confusing this with the better case of two different
            terms in the multiple fields.  Default: 0.0.

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
      },

      /**
            Allows you to serialize this object into a JSON encoded string.

            @member ejs.DisMaxQuery
            @returns {String} returns this object as a serialized JSON string.
            */
      toString: function () {
        return JSON.stringify(query);
      },

      /**
            Retrieves the internal <code>query</code> object. This is typically used by
            internal API functions so use with caution.

            @member ejs.DisMaxQuery
            @returns {String} returns this object's internal <code>query</code> property.
            */
      get: function () {
        return query;
      }
    };
  };
  