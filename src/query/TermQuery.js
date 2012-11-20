  /**
    @class
    <p>A <code>TermQuery</code> can be used to return documents containing a given
    keyword or <em>term</em>. For instance, you might want to retieve all the
    documents/objects that contain the term <code>Javascript</code>. Term filters
    often serve as the basis for more complex queries such as <em>Boolean</em> queries.</p>

    <p><strong>Note:</strong> This module contains a related code example.&nbsp;
    <a target="_blank" class="btn c9" href="https://gist.github.com/1894812">View Code Example</a></p>

    @name ejs.TermQuery

    @desc
    A Query that matches documents containing a term. This may be
    combined with other terms with a BooleanQuery.

    @param {String} key the document field/key to query against
    @param {String} value the literal value to be matched
    */
  ejs.TermQuery = function (key, value) {

    /**
         The internal query object. <code>Use get()</code>
         @member ejs.TermQuery
         @property {Object} query
         */
    var k,
    v,
    query = {
      term: {}
    };

    k = key;
    v = value;
    query.term[k] = v;

    return {

      /**
            Sets the boost value for documents matching the <code>Query</code>.

            @member ejs.TermQuery
            @param {Number} boost A positive <code>double</code> value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      boost: function (boost) {
        if (boost == null) {
          return query.term[k].boost;
        }

        query.term[k] = {
          value: v,
          boost: boost
        };
        return this;
      },

      /**
            Allows you to serialize this object into a JSON encoded string.

            @member ejs.TermQuery
            @returns {String} returns this object as a serialized JSON string.
            */
      toString: function () {
        return JSON.stringify(query);
      },

      /**
            Retrieves the internal <code>query</code> object. This is typically used by
            internal API functions so use with caution.

            @member ejs.TermQuery
            @returns {String} returns this object's internal <code>query</code> property.
            */
      get: function () {
        return query;
      }
    };
  };
