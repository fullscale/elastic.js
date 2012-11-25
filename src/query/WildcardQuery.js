  /**
    @class
    <p>Matches documents that have fields matching a wildcard expression 
    (not analyzed). Supported wildcards are *, which matches any character 
    sequence (including the empty one), and ?, which matches any single 
    character. Note this query can be slow, as it needs to iterate over many 
    wildcards. In order to prevent extremely slow wildcard queries, a wildcard 
    wildcard should not start with one of the wildcards * or ?. The wildcard query 
    maps to Lucene WildcardQuery.</p>

    @name ejs.WildcardQuery

    @desc
    A Query that matches documents containing a wildcard. This may be
    combined with other wildcards with a BooleanQuery.

    @param {String} field the document field/key to query against
    @param {String} value the literal value to be matched
    */
  ejs.WildcardQuery = function (field, value) {

    /**
         The internal query object. <code>Use get()</code>
         @member ejs.WildcardQuery
         @property {Object} WildcardQuery
         */
    var query = {
      wildcard: {}
    };

    query.wildcard[field] = {
      value: value
    };

    return {

      /**
            Sets the fields to query against.

            @member ejs.WildcardQuery
            @param {String} f A valid field name.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      field: function (f) {
        var oldValue = query.wildcard[field];
    
        if (f == null) {
          return field;
        }

        field = f;
        query.wildcard = {};
        query.wildcard[f] = oldValue;
    
        return this;
      },
  
      /**
            Sets the wildcard query value.

            @member ejs.WildcardQuery
            @param {String} v A single term.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      value: function (v) {
        if (v == null) {
          return query.wildcard[field].value;
        }

        query.wildcard[field].value = v;
        return this;
      },
    
      /**
            Sets the boost value for documents matching the <code>Query</code>.

            @member ejs.WildcardQuery
            @param {Number} boost A positive <code>double</code> value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      boost: function (boost) {
        if (boost == null) {
          return query.wildcard[field].boost;
        }

        query.wildcard[field].boost = boost;
        return this;
      },

      /**
            Allows you to serialize this object into a JSON encoded string.

            @member ejs.WildcardQuery
            @returns {String} returns this object as a serialized JSON string.
            */
      toString: function () {
        return JSON.stringify(query);
      },

      /**
            Retrieves the internal <code>query</code> object. This is typically used by
            internal API functions so use with caution.

            @member ejs.WildcardQuery
            @returns {String} returns this object's internal <code>query</code> property.
            */
      get: function () {
        return query;
      }
    };
  };
