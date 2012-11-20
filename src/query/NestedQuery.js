  /**
    @class
    <p>Nested queries allow you to search against content within objects that are
       embedded inside of other objects. It is similar to <code>XPath</code> expressions
       in <code>XML</code> both conceptually and syntactically.</p>

    <p><strong>Note:</strong> This module contains a related code example.&nbsp;
    <a target="_blank" class="btn c9" href="https://gist.github.com/1894884">View Code Example</a></p>

    @name ejs.NestedQuery

    @desc
    <p>Constructs a query that is capable of executing a search against objects
       nested within a document.</p>

    @param {Query} oQuery An optional Query object used to construct the nested query.
    The query can also be set using the query method.

     */
  ejs.NestedQuery = function (oQuery) {

    /**
         The internal Query object. Use <code>get()</code>.
         @member ejs.NestedQuery
         @property {Object} NestedQuery
         */
    var query = {
      nested: {}
    };

    if (oQuery != null) {
      query.nested.query = oQuery.get();
    }

    return {
      /**
             Sets the root context for the nested query.
             @member ejs.NestedQuery
             @param {String} path The path defining the root context for the nested query.
             @returns {nestedQuery} Returns a reference to the current object.
             */
      path: function (path) {
        if (path == null) {
          return query.nested.path;
        }
      
        query.nested.path = path;
        return this;
      },

      /**
             Sets how the inner (nested) matches affect scoring on the parent document.
             @member ejs.NestedQuery
             @param {String} mode The mode of scoring to be used for nested matches.
                             Options are avg, total, max, none - defaults to avg
             @returns {nestedQuery} Returns a reference to the current object.
             */
      scoreMode: function (mode) {
        if (mode == null) {
          return query.nested.score_mode;
        }
      
        query.nested.score_mode = mode;
        return this;
      },

      /**
             Sets the nested query to be executed.
             @member ejs.NestedQuery
             @returns {nestedQuery} Returns a reference to the current object.
             */
      query: function (oQuery) {
        if (oQuery == null) {
          return query.nested.query;
        }
      
        query.nested.query = oQuery.get();
        return this;
      },

      /**
             Serializes the internal <em>query</em> object as a JSON string.
             @member ejs.NestedQuery
             @returns {String} Returns a JSON representation of the termFilter object.
             */
      toString: function () {
        return JSON.stringify(query);
      },

      /**
            This method is used to retrieve the raw query object. It's designed
            for internal use when composing and serializing queries.
            @member ejs.NestedQuery
            @returns {Object} Returns the object's <em>query</em> property.
            */
      get: function () {
        return query;
      }
    };
  };
