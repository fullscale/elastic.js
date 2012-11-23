  /**
    @class
    <p>Filters documents that only have the provided ids. Note, this filter 
    does not require the _id field to be indexed since it works using the 
    _uid field.</p>

    @name ejs.IdsQuery

    @desc
    Matches documents with the specified id(s).

    @param {Array || String} ids A single document id or a list of document ids.
    */
  ejs.IdsQuery = function (ids) {

    /**
         The internal query object. <code>Use get()</code>
         @member ejs.IdsQuery
         @property {Object} IdsQuery
         */
    var query = {
      ids: {}
    };
    
    if (typeof ids === 'string') {
      query.ids.values = [ids];
    } else {
      query.ids.values = ids;
    }

    return {

      /**
            Sets the values array or adds a new value. if val is a string, it
            is added to the list of existing document ids.  If val is an
            array it is set as the document values and replaces any existing values.

            @member ejs.IdsQuery
            @param {Array || String} val An single document id or an array of document ids.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      values: function (val) {
        if (val == null) {
          return query.ids.values;
        }
    
        if (typeof val === 'string') {
          query.ids.values.push(val);
        } else {
          query.ids.values = val;
        }
        
        return this;
      },

      /**
            Sets the type as a single type or an array of types.  If type is a
            string, it is added to the list of existing types.  If type is an
            array, it is set as the types and overwrites an existing types. This
            parameter is optional.

            @member ejs.IdsQuery
            @param {Array || String} type A type or a list of types
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      type: function (type) {
        if (query.ids.type == null) {
          query.ids.type = [];
        }
        
        if (type == null) {
          return query.ids.type;
        }
        
        if (typeof type === 'string') {
          query.ids.type.push(type);
        } else {
          query.ids.type = type;
        }
        
        return this;
      },

      /**
            Sets the boost value of the <code>Query</code>.

            @member ejs.IdsQuery
            @param {Double} boost A positive <code>double</code> value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      boost: function (boost) {
        if (boost == null) {
          return query.ids.boost;
        }

        query.ids.boost = boost;
        return this;
      },
            
      /**
            Allows you to serialize this object into a JSON encoded string.

            @member ejs.IdsQuery
            @returns {String} returns this object as a serialized JSON string.
            */
      toString: function () {
        return JSON.stringify(query);
      },

      /**
            Retrieves the internal <code>query</code> object. This is typically used by
            internal API functions so use with caution.

            @member ejs.IdsQuery
            @returns {String} returns this object's internal <code>query</code> property.
            */
      get: function () {
        return query;
      }
    };
  };
