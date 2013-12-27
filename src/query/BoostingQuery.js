  /**
    @class
    <p>The boosting query can be used to effectively demote results that match 
    a given query. Unlike the “NOT” clause in bool query, this still selects 
    documents that contain undesirable terms, but reduces their overall 
    score.</p>

    @name ejs.BoostingQuery
    @ejs query
    @borrows ejs.QueryMixin.boost as boost
    @borrows ejs.QueryMixin._type as _type
    @borrows ejs.QueryMixin.toJSON as toJSON

    @desc
    <p>Constructs a query that can demote search results.  A negative boost.</p>

    @param {Object} positiveQry Valid query object used to select all matching docs.
    @param {Object} negativeQry Valid query object to match the undesirable docs 
      returned within the positiveQry result set.
    @param {Double} negativeBoost A double value where 0 < n < 1.
     */
  ejs.BoostingQuery = function (positiveQry, negativeQry, negativeBoost) {

    if (!isQuery(positiveQry) || !isQuery(negativeQry)) {
      throw new TypeError('Arguments must be Queries');
    }
    
    var 
      _common = ejs.QueryMixin('boosting'),
      query = _common.toJSON();
    
    query.boosting.positive = positiveQry.toJSON();
    query.boosting.negative = negativeQry.toJSON();
    query.boosting.negative_boost = negativeBoost;

    return extend(_common, {
    
      /**
             Sets the "master" query that determines which results are returned.

             @member ejs.BoostingQuery
             @param {Object} oQuery A valid <code>Query</code> object
             @returns {Object} returns <code>this</code> so that calls can be 
              chained. Returns {Object} current positive query if oQuery is
              not specified.
             */
      positive: function (oQuery) {
        if (oQuery == null) {
          return query.boosting.positive;
        }
    
        if (!isQuery(oQuery)) {
          throw new TypeError('Argument must be a Query');
        }
        
        query.boosting.positive = oQuery.toJSON();
        return this;
      },

      /**
             Sets the query used to match documents in the <code>positive</code>
             query that will be negatively boosted.

             @member ejs.BoostingQuery
             @param {Object} oQuery A valid <code>Query</code> object
             @returns {Object} returns <code>this</code> so that calls can be 
              chained. Returns {Object} current negative query if oQuery is
              not specified.
             */
      negative: function (oQuery) {
        if (oQuery == null) {
          return query.boosting.negative;
        }
    
        if (!isQuery(oQuery)) {
          throw new TypeError('Argument must be a Query');
        }
        
        query.boosting.negative = oQuery.toJSON();
        return this;
      },
   
      /**
            Sets the negative boost value.

            @member ejs.BoostingQuery
            @param {Double} boost A positive <code>double</code> value where 0 < n < 1.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      negativeBoost: function (negBoost) {
        if (negBoost == null) {
          return query.boosting.negative_boost;
        }

        query.boosting.negative_boost = negBoost;
        return this;
      }
      
    });
  };
