  /**
    @class
    <p>The function_score allows you to modify the score of documents that are
    retrieved by a query. This can be useful if, for example, a score function is
    computationally expensive and it is sufficient to compute the score on a
    filtered set of documents.</p>

    @name ejs.FunctionScoreQuery
    @ejs query
    @borrows ejs.QueryMixin.boost as boost
    @borrows ejs.QueryMixin._type as _type
    @borrows ejs.QueryMixin.toJSON as toJSON

    @desc
    <p>A query that allows you to modify the score of matching documents.</p>

     */
  ejs.FunctionScoreQuery = function () {

    var
      _common = ejs.QueryMixin('function_score'),
      query = _common.toJSON();

    return extend(_common, {

      /**
      Set the source query.

      @member ejs.FunctionScoreQuery
      @param {Query} oQuery A valid <code>Query</code> object
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      query: function (oQuery) {
        if (oQuery == null) {
          return query.function_score.query;
        }

        if (!isQuery(oQuery)) {
          throw new TypeError('Argument must be a Query');
        }

        query.function_score.query = oQuery.toJSON();
        return this;
      },

      /**
      Set the source filter.

      @member ejs.FunctionScoreQuery
      @param {Filter} oFilter A valid <code>Filter</code> object
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      filter: function (oFilter) {
        if (oFilter == null) {
          return query.function_score.filter;
        }

        if (!isFilter(oFilter)) {
          throw new TypeError('Argument must be a Filter');
        }

        query.function_score.filter = oFilter.toJSON();
        return this;
      },

      /**
      Set the scoring mode which specifies how the computed scores are combined.
      Valid values are: avg, max, min, sum, multiply, and first.

      @member ejs.FunctionScoreQuery
      @param {String} mode A scoring mode.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      scoreMode: function (mode) {
        if (mode == null) {
          return query.function_score.score_mode;
        }

        mode = mode.toLowerCase();
        if (mode === 'avg' || mode === 'max' || mode === 'min' ||
              mode === 'sum' || mode === 'multiply' || mode === 'first') {
          query.function_score.score_mode = mode;
        }

        return this;
      },

      /**
      Set the setermines how the new calculated score is combined with the
      score from the original query. Valid values are: multiply, replace, sum,
      avg, max, and min.

      @member ejs.FunctionScoreQuery
      @param {String} mode A boosting mode.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      boostMode: function (mode) {
        if (mode == null) {
          return query.function_score.boost_mode;
        }

        mode = mode.toLowerCase();
        if (mode === 'multiply' || mode === 'replace' || mode === 'sum' ||
              mode === 'avg' || mode === 'max' || mode === 'min') {
          query.function_score.boost_mode = mode;
        }

        return this;
      },

      /**
      Sets the boost value for all documents matching the query.

      @member ejs.FunctionScoreQuery
      @param {Float} boost A positive <code>float</code> value.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      boost: function (boost) {
        if (boost == null) {
          return query.function_score.boost;
        }

        query.function_score.boost = boost;
        return this;
      },

      /**
      Add a single score function to the list of existing functions.

      @member ejs.FunctionScoreQuery
      @param {ScoreFunction} func A valid <code>ScoreFunction</code> object.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      function: function (func) {
        if (query.function_score.functions == null) {
          query.function_score.functions = [];
        }

        if (func == null) {
          return query.function_score.functions;
        }

        if (!isScoreFunction(func)) {
          throw new TypeError('Argument must be a ScoreFunction');
        }

        query.function_score.functions.push(func.toJSON());
        return this;
      },

      /**
      Sets the score functions.  Replaces any existing score functions.

      @member ejs.FunctionScoreQuery
      @param {ScoreFunction[]} funcs A array of <code>ScoreFunctions</code>.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      functions: function (funcs) {
        var i, len;

        if (funcs == null) {
          return query.function_score.functions;
        }

        if (!isArray(funcs)) {
          throw new TypeError('Argument must be an array of ScoreFunctions');
        }

        query.function_score.functions = [];
        for (i = 0, len = funcs.length; i < len; i++) {
          if (!isScoreFunction(funcs[i])) {
            throw new TypeError('Argument must be an array of ScoreFunctions');
          }

          query.function_score.functions.push(funcs[i].toJSON());
        }

        return this;
      }

    });
  };
