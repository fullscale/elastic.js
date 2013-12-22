  /**
    @class
    <p>A query allows to wrap another query and multiply its score by the 
    provided boost_factor. This can sometimes be desired since boost value set 
    on specific queries gets normalized, while this query boost factor does not.</p>

    @name ejs.CustomBoostFactorQuery
    @borrows ejs.QueryMixin.boost as boost
    @borrows ejs.QueryMixin._type as _type
    @borrows ejs.QueryMixin.toJSON as toJSON

    @desc
    Boosts a queries score without that boost being normalized.

    @param {Object} qry A valid query object.
    */
  ejs.CustomBoostFactorQuery = function (qry) {

    if (!isQuery(qry)) {
      throw new TypeError('Argument must be a Query');
    }
    
    var 
      _common = ejs.QueryMixin('custom_boost_factor'),
      query = _common.toJSON();
    
    query.custom_boost_factor.query = qry.toJSON();

    return extend(_common, {

      /**
            Sets the query to be apply the custom boost to.

            @member ejs.CustomBoostFactorQuery
            @param {Object} q A valid Query object
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      query: function (q) {
        if (q == null) {
          return query.custom_boost_factor.query;
        }
    
        if (!isQuery(q)) {
          throw new TypeError('Argument must be a Query');
        }
        
        query.custom_boost_factor.query = q.toJSON();
        return this;
      },
  
      /**
            Sets the language used in the script.  

            @member ejs.CustomBoostFactorQuery
            @param {Double} boost The boost value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      boostFactor: function (boost) {
        if (boost == null) {
          return query.custom_boost_factor.boost_factor;
        }

        query.custom_boost_factor.boost_factor = boost;
        return this;
      }
      
    });
  };
