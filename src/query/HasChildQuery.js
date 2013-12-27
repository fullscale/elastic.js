  /**
    @class
    <p>The has_child query works the same as the has_child filter, 
    by automatically wrapping the filter with a constant_score. Results in 
    parent documents that have child docs matching the query being returned.</p>
  
    @name ejs.HasChildQuery
    @ejs query
    @borrows ejs.QueryMixin.boost as boost
    @borrows ejs.QueryMixin._type as _type
    @borrows ejs.QueryMixin.toJSON as toJSON

    @desc
    Returns results that have child documents matching the query.

    @param {Object} qry A valid query object.
    @param {String} type The child type
    */
  ejs.HasChildQuery = function (qry, type) {

    if (!isQuery(qry)) {
      throw new TypeError('Argument must be a valid Query');
    }
    
    var 
      _common = ejs.QueryMixin('has_child'),
      query = _common.toJSON();
    
    query.has_child.query = qry.toJSON();
    query.has_child.type = type;

    return extend(_common, {

      /**
            Sets the query

            @member ejs.HasChildQuery
            @param {Object} q A valid Query object
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      query: function (q) {
        if (q == null) {
          return query.has_child.query;
        }
    
        if (!isQuery(q)) {
          throw new TypeError('Argument must be a valid Query');
        }
        
        query.has_child.query = q.toJSON();
        return this;
      },

      /**
            Sets the child document type to search against

            @member ejs.HasChildQuery
            @param {String} t A valid type name
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      type: function (t) {
        if (t == null) {
          return query.has_child.type;
        }
    
        query.has_child.type = t;
        return this;
      },

      /**
            Sets the scope of the query.  A scope allows to run facets on the 
            same scope name that will work against the child documents. 

            @deprecated since elasticsearch 0.90
            @member ejs.HasChildQuery
            @param {String} s The scope name as a string.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      scope: function (s) {
        return this;
      },

      /**
            Sets the scoring method.  Valid values are:
            
            none - the default, no scoring
            max - the highest score of all matched child documents is used
            sum - the sum the all the matched child documents is used
            avg - the average of all matched child documents is used

            @deprecated since elasticsearch 0.90.1, use scoreMode
            
            @member ejs.HasChildQuery
            @param {String} s The score type as a string.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      scoreType: function (s) {
        if (s == null) {
          return query.has_child.score_type;
        }
    
        s = s.toLowerCase();
        if (s === 'none' || s === 'max' || s === 'sum' || s === 'avg') {
          query.has_child.score_type = s;
        }
        
        return this;
      },
      
      /**
            Sets the scoring method.  Valid values are:
            
            none - the default, no scoring
            max - the highest score of all matched child documents is used
            sum - the sum the all the matched child documents is used
            avg - the average of all matched child documents is used

            @member ejs.HasChildQuery
            @param {String} s The score type as a string.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      scoreMode: function (s) {
        if (s == null) {
          return query.has_child.score_mode;
        }
    
        s = s.toLowerCase();
        if (s === 'none' || s === 'max' || s === 'sum' || s === 'avg') {
          query.has_child.score_mode = s;
        }
        
        return this;
      },
      
      /**
            Sets the cutoff value to short circuit processing.

            @member ejs.HasChildQuery
            @param {Integer} cutoff A positive <code>integer</code> value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      shortCircuitCutoff: function (cutoff) {
        if (cutoff == null) {
          return query.has_child.short_circuit_cutoff;
        }

        query.has_child.short_circuit_cutoff = cutoff;
        return this;
      }
      
    });
  };
