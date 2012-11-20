  /**
    @class
    <p>A constant score query wraps another <code>Query</code> or
    <code>Filter</code> and returns a constant score for each
    result that is equal to the query boost.</p>

    <p>Note that lucene's query normalization (queryNorm) attempts
    to make scores between different queries comparable.  It does not
    change the relevance of your query, but it might confuse you when
    you look at the score of your documents and they are not equal to
    the query boost value as expected.  The scores were normalized by
    queryNorm, but maintain the same relevance.</p>

    @name ejs.ConstantScoreQuery

    @desc
    <p>Constructs a query where each documents returned by the internal
    query or filter have a constant score equal to the boost factor.</p>

     */
  ejs.ConstantScoreQuery = function () {

    /**
         The internal Query object. Use <code>get()</code>.
         @member ejs.ConstantScoreQuery
         @property {Object} ConstantScoreQuery
         */
    var query = {
      constant_score: {}
    };

    return {
      /**
             Adds the query to apply a constant score to.

             @member ejs.ConstantScoreQuery
             @param {Object} oQuery A valid <code>Query</code> object
             @returns {Object} returns <code>this</code> so that calls can be chained.
             */
      query: function (oQuery) {
        if (oQuery == null) {
          return query.constant_score.query;
        }
      
        query.constant_score.query = oQuery.get();
        return this;
      },

      /**
             Adds the filter to apply a constant score to.

             @member ejs.ConstantScoreQuery
             @param {Object} oFilter A valid <code>Filter</code> object
             @returns {Object} returns <code>this</code> so that calls can be chained.
             */
      filter: function (oFilter) {
        if (oFilter == null) {
          return query.constant_score.filter;
        }
      
        query.constant_score.filter = oFilter.get();
        return this;
      },

      /**
            Sets the boost value of the <code>Query</code>.

            @member ejs.ConstantScoreQuery
            @param {Double} boost A positive <code>double</code> value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      boost: function (boost) {
        if (boost == null) {
          return query.constant_score.boost;
        }

        query.constant_score.boost = boost;
        return this;
      },

      /**
             Serializes the internal <em>query</em> object as a JSON string.
             @member ejs.ConstantScoreQuery
             @returns {String} Returns a JSON representation of the Query object.
             */
      toString: function () {
        return JSON.stringify(query);
      },

      /**
            This method is used to retrieve the raw query object. It's designed
            for internal use when composing and serializing queries.
            @member ejs.ConstantScoreQuery
            @returns {Object} Returns the object's <em>query</em> property.
            */
      get: function () {
        return query;
      }
    };
  };
