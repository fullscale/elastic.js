  /**
    @class
    <p>The has_child filter results in parent documents that have child docs 
    matching the query being returned.</p>

    @name ejs.HasChildFilter

    @desc
    Returns results that have child documents matching the filter.

    @param {Object} qry A valid query object.
    @param {String} type The child type
    */
  ejs.HasChildFilter = function (qry, type) {

    /**
         The internal query object. <code>Use get()</code>
         @member ejs.HasChildFilter
         @property {Object} query
         */
    var filter = {
      has_child: {
        query: qry.get(),
        type: type
      }
    };

    return {

      /**
            Sets the query

            @member ejs.HasChildFilter
            @param {Object} q A valid Query object
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      query: function (q) {
        if (q == null) {
          return filter.has_child.query;
        }
  
        filter.has_child.query = q.get();
        return this;
      },

      /**
            Sets the child document type to search against

            @member ejs.HasChildFilter
            @param {String} t A valid type name
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      type: function (t) {
        if (t == null) {
          return filter.has_child.type;
        }
  
        filter.has_child.type = t;
        return this;
      },

      /**
            Sets the scope of the filter.  A scope allows to run facets on the 
            same scope name that will work against the child documents. 

            @member ejs.HasChildFilter
            @param {String} s The scope name as a string.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      scope: function (s) {
        if (s == null) {
          return filter.has_child._scope;
        }
  
        filter.has_child._scope = s;
        return this;
      },

      /**
            Sets the filter name.

            @member ejs.HasChildFilter
            @param {String} name A name for the filter.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      name: function (name) {
        if (name == null) {
          return filter.has_child._name;
        }

        filter.has_child._name = name;
        return this;
      },
          
      /**
            Allows you to serialize this object into a JSON encoded string.

            @member ejs.HasChildFilter
            @returns {String} returns this object as a serialized JSON string.
            */
      toString: function () {
        return JSON.stringify(filter);
      },

      /**
            Retrieves the internal <code>filter</code> object. This is typically used by
            internal API functions so use with caution.

            @member ejs.HasChildFilter
            @returns {String} returns this object's internal <code>filter</code> property.
            */
      get: function () {
        return filter;
      }
    };
  };
