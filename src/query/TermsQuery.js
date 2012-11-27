  /**
    @class
    <p>A query that match on any (configurable) of the provided terms. This is 
    a simpler syntax query for using a bool query with several term queries 
    in the should clauses.</p>

    @name ejs.TermsQuery

    @desc
    A Query that matches documents containing provided terms. 

    @param {String} field the document field/key to query against
    @param {Array} tags an array of "terms" to match
    */
  ejs.TermsQuery = function (field, tags) {

    /**
         The internal query object. <code>Use get()</code>
         @member ejs.TermsQuery
         @property {Object} query
         */
    var query = {
      terms: {}
    };

    query.terms[field] = tags;

    return {

      /**
            Sets the fields to query against.

            @member ejs.TermsQuery
            @param {String} f A valid field name.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      field: function (f) {
        var oldValue = query.terms[field];
      
        if (f == null) {
          return field;
        }

        delete query.terms[field];
        field = f;
        query.terms[f] = oldValue;
      
        return this;
      },
    
      /**
            Sets the terms.  If you t is a String, it is added to the existing
            list of terms.  If t is an array, the list of terms replaces the
            existing terms.

            @member ejs.TermsQuery
            @param {String || Array} t A single term or an array or terms.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      terms: function (t) {
        if (t == null) {
          return query.terms[field];
        }

        if (typeof t === 'string') {
          query.terms[field].push(t);
        } else {
          query.terms[field] = t;
        }
      
        return this;
      },

      /**
            Sets the number of terms that need to match the query.

            @member ejs.TermsQuery
            @param {Integer} min A positive integer.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      minimumMatch: function (min) {
        if (min == null) {
          return query.terms.minimum_match;
        }
      
        query.terms.minimum_match = min;
        return this;
      },
            
      /**
            Sets the boost value for documents matching the <code>Query</code>.

            @member ejs.TermsQuery
            @param {Number} boost A positive <code>double</code> value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      boost: function (boost) {
        if (boost == null) {
          return query.terms.boost;
        }

        query.terms.boost = boost;
        return this;
      },

      /**
            Allows you to serialize this object into a JSON encoded string.

            @member ejs.TermsQuery
            @returns {String} returns this object as a serialized JSON string.
            */
      toString: function () {
        return JSON.stringify(query);
      },

      /**
            Retrieves the internal <code>query</code> object. This is typically used by
            internal API functions so use with caution.

            @member ejs.TermsQuery
            @returns {String} returns this object's internal <code>query</code> property.
            */
      get: function () {
        return query;
      }
    };
  };
