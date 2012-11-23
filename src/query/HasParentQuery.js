  /**
    @class
    <p>The has_parent query works the same as the has_parent filter, by 
    automatically wrapping the filter with a constant_score. Results in 
    child documents that have parent docs matching the query being returned.</p>

    @name ejs.HasParentQuery

    @desc
    Returns results that have parent documents matching the query.

    @param {Object} qry A valid query object.
    @param {String} parentType The child type
    */
  ejs.HasParentQuery = function (qry, parentType) {

    /**
         The internal query object. <code>Use get()</code>
         @member ejs.HasParentQuery
         @property {Object} query
         */
    var query = {
      has_parent: {
        query: qry.get(),
        parent_type: parentType
      }
    };

    return {

      /**
            Sets the query

            @member ejs.HasParentQuery
            @param {Object} q A valid Query object
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      query: function (q) {
        if (q == null) {
          return query.has_parent.query;
        }
  
        query.has_parent.query = q.get();
        return this;
      },

      /**
            Sets the child document type to search against

            @member ejs.HasParentQuery
            @param {String} t A valid type name
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      parentType: function (t) {
        if (t == null) {
          return query.has_parent.parent_type;
        }
  
        query.has_parent.parent_type = t;
        return this;
      },

      /**
            Sets the scope of the query.  A scope allows to run facets on the 
            same scope name that will work against the parent documents. 

            @member ejs.HasParentQuery
            @param {String} s The scope name as a string.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      scope: function (s) {
        if (s == null) {
          return query.has_parent._scope;
        }
  
        query.has_parent._scope = s;
        return this;
      },

      /**
            Sets the boost value of the <code>Query</code>.

            @member ejs.HasParentQuery
            @param {Double} boost A positive <code>double</code> value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      boost: function (boost) {
        if (boost == null) {
          return query.has_parent.boost;
        }

        query.has_parent.boost = boost;
        return this;
      },
      
      /**
            Allows you to serialize this object into a JSON encoded string.

            @member ejs.HasParentQuery
            @returns {String} returns this object as a serialized JSON string.
            */
      toString: function () {
        return JSON.stringify(query);
      },

      /**
            Retrieves the internal <code>query</code> object. This is typically used by
            internal API functions so use with caution.

            @member ejs.HasParentQuery
            @returns {String} returns this object's internal <code>query</code> property.
            */
      get: function () {
        return query;
      }
    };
  };
