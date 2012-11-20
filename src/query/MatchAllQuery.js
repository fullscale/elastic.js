  /**
    @class
    <p>This query can be used to match all the documents
    in a given set of collections and/or types.</p>

    <p><strong>Note:</strong> This module contains a related code example.&nbsp;
    <a target="_blank" class="btn c9" href="https://gist.github.com/1895130">View Code Example</a></p>

    @name ejs.MatchAllQuery

    @desc
    <p>A query that returns all documents.</p>

     */
  ejs.MatchAllQuery = function () {

    /**
         The internal Query object. Use <code>get()</code>.
         @member ejs.MatchAllQuery
         @property {Object} MatchAllQuery
         */
    var query = {
      match_all: {}
    };

    return {

      /**
             Serializes the internal <em>query</em> object as a JSON string.
             @member ejs.MatchAllQuery
             @returns {String} Returns a JSON representation of the Query object.
             */
      toString: function () {
        return JSON.stringify(query);
      },

      /**
            This method is used to retrieve the raw query object. It's designed
            for internal use when composing and serializing queries.
            @member ejs.MatchAllQuery
            @returns {Object} Returns the object's <em>query</em> property.
            */
      get: function () {
        return query;
      }
    };
  };
