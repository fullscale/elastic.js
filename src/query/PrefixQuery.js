  /**
    @class
    <p>Matches documents that have fields containing terms with a specified 
    prefix (not analyzed). The prefix query maps to Lucene PrefixQuery.</p>

    @name ejs.PrefixQuery

    @desc
    Matches documents containing the specified un-analyzed prefix.

    @param {String} field A valid field name.
    @param {String} value A string prefix.
    */
  ejs.PrefixQuery = function (field, value) {

    /**
         The internal query object. <code>Use get()</code>
         @member ejs.PrefixQuery
         @property {Object} PrefixQuery
         */
    var query = {
      prefix: {}
    };

    query.prefix[field] = {
      value: value
    };
  
    return {

      /**
             The field to run the query against.

             @member ejs.PrefixQuery
             @param {String} f A single field name.
             @returns {Object} returns <code>this</code> so that calls can be chained.
             */
      field: function (f) {
        var oldValue = query.prefix[field];
  
        if (f == null) {
          return field;
        }

        field = f;
        query.prefix = {};
        query.prefix[f] = oldValue;

        return this;
      },

      /**
            The prefix value.

            @member ejs.PrefixQuery
            @param {String} p A string prefix
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      value: function (p) {
        if (p == null) {
          return query.prefix[field].value;
        }

        query.prefix[field].value = p;
        return this;
      },

      /**
            Sets the boost value of the <code>Query</code>.

            @member ejs.PrefixQuery
            @param {Double} boost A positive <code>double</code> value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      boost: function (boost) {
        if (boost == null) {
          return query.prefix[field].boost;
        }

        query.prefix[field].boost = boost;
        return this;
      },
      
      /**
            Allows you to serialize this object into a JSON encoded string.

            @member ejs.PrefixQuery
            @returns {String} returns this object as a serialized JSON string.
            */
      toString: function () {
        return JSON.stringify(query);
      },

      /**
            Retrieves the internal <code>query</code> object. This is typically used by
            internal API functions so use with caution.

            @member ejs.PrefixQuery
            @returns {String} returns this object's internal <code>query</code> property.
            */
      get: function () {
        return query;
      }
    };
  };
