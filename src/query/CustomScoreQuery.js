  /**
    @class
    <p>A query that wraps another query and customize the scoring of it 
    optionally with a computation derived from other field values in the 
    doc (numeric ones) using script expression.</p>

    @name ejs.CustomScoreQuery
    @borrows ejs.QueryMixin.boost as boost
    @borrows ejs.QueryMixin._type as _type
    @borrows ejs.QueryMixin.toJSON as toJSON

    @desc
    Scores a query based on a script.

    @param {Object} qry A valid query or filter object.
    @param {String} script A valid script expression.
    */
  ejs.CustomScoreQuery = function (qry, script) {

    if (!isQuery(qry) && !isFilter(qry)) {
      throw new TypeError('Argument must be a Query or Filter');
    }
    
    var 
      _common = ejs.QueryMixin('custom_score'),
      query = _common.toJSON();
    
    query.custom_score.script = script;

    if (isQuery(qry)) {
      query.custom_score.query = qry.toJSON();
    } else if (isFilter(qry)) {
      query.custom_score.filter = qry.toJSON();
    }
    
    return extend(_common, {

      /**
            Sets the query to apply the custom score to.

            @member ejs.CustomScoreQuery
            @param {Object} q A valid Query object
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      query: function (q) {
        if (q == null) {
          return query.custom_score.query;
        }
      
        if (!isQuery(q)) {
          throw new TypeError('Argument must be a Query');
        }
        
        query.custom_score.query = q.toJSON();
        return this;
      },

      /**
            Sets the filter to apply the custom score to.

            @member ejs.CustomScoreQuery
            @param {Object} f A valid Filter object
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      filter: function (f) {
        if (f == null) {
          return query.custom_score.filter;
        }
      
        if (!isFilter(f)) {
          throw new TypeError('Argument must be a Filter');
        }
        
        query.custom_score.filter = f.toJSON();
        return this;
      },
      
      /**
            Sets the script that calculates the custom score

            @member ejs.CustomScoreQuery
            @param {String} s A valid script expression
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      script: function (s) {
        if (s == null) {
          return query.custom_score.script;
        }
      
        query.custom_score.script = s;
        return this;
      },

      /**
            Sets parameters that will be applied to the script.  Overwrites 
            any existing params.

            @member ejs.CustomScoreQuery
            @param {Object} p An object where the keys are the parameter name and 
              values are the parameter value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      params: function (p) {
        if (p == null) {
          return query.custom_score.params;
        }
      
        query.custom_score.params = p;
        return this;
      },
    
      /**
            Sets the language used in the script.  

            @member ejs.CustomScoreQuery
            @param {String} l The script language, defatuls to mvel.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      lang: function (l) {
        if (l == null) {
          return query.custom_score.lang;
        }

        query.custom_score.lang = l;
        return this;
      }
      
    });
  };
