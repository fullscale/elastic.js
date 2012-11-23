  /**
    @class
    <p>The has_child query works the same as the has_child filter, 
    by automatically wrapping the filter with a constant_score. Results in 
    parent documents that have child docs matching the query being returned.</p>
  
    @name ejs.HasChildQuery

    @desc
    Returns results that have child documents matching the query.

    @param {Object} qry A valid query object.
    @param {String} type The child type
    */
  ejs.HasChildQuery = function (qry, type) {

    /**
         The internal query object. <code>Use get()</code>
         @member ejs.HasChildQuery
         @property {Object} query
         */
    var query = {
      has_child: {
        query: qry.get(),
        type: type
      }
    };

    return {

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
    
        query.has_child.query = q.get();
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

            @member ejs.HasChildQuery
            @param {String} s The scope name as a string.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      scope: function (s) {
        if (s == null) {
          return query.has_child._scope;
        }
    
        query.has_child._scope = s;
        return this;
      },
  
      /**
            Sets the boost value of the <code>Query</code>.

            @member ejs.HasChildQuery
            @param {Double} boost A positive <code>double</code> value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      boost: function (boost) {
        if (boost == null) {
          return query.has_child.boost;
        }

        query.has_child.boost = boost;
        return this;
      },
        
      /**
            Allows you to serialize this object into a JSON encoded string.

            @member ejs.HasChildQuery
            @returns {String} returns this object as a serialized JSON string.
            */
      toString: function () {
        return JSON.stringify(query);
      },

      /**
            Retrieves the internal <code>query</code> object. This is typically used by
            internal API functions so use with caution.

            @member ejs.HasChildQuery
            @returns {String} returns this object's internal <code>query</code> property.
            */
      get: function () {
        return query;
      }
    };
  };
