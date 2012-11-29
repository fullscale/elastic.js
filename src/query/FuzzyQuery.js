  /**
    @class
    <p>A fuzzy search query based on the Damerau-Levenshtein (optimal string 
    alignment) algorithm, though you can explicitly choose classic Levenshtein 
    by passing false to the transpositions parameter./p>
  
    <p>fuzzy query on a numeric field will result in a range query “around” 
    the value using the min_similarity value. As an example, if you perform a
    fuzzy query against a field value of "12" with a min similarity setting
    of "2", the query will search for values between "10" and "14".</p>

    @name ejs.FuzzyQuery

    @desc
    <p>Constructs a query where each documents returned are “like” provided text</p>
    
    @param {String} field The field to run the fuzzy query against.
    @param {String} value The value to fuzzify.
    
     */
  ejs.FuzzyQuery = function (field, value) {

    /**
         The internal Query object. Use <code>get()</code>.
         @member ejs.FuzzyQuery
         @property {Object} query
         */
    var query = {
      fuzzy: {}
    };

    query.fuzzy[field] = {
      value: value
    };

    return {

      /**
             The field to run the query against.

             @member ejs.FuzzyQuery
             @param {String} f A single field name.
             @returns {Object} returns <code>this</code> so that calls can be chained.
             */
      field: function (f) {
        var oldValue = query.fuzzy[field];
    
        if (f == null) {
          return field;
        }
  
        field = f;
        query.fuzzy = {};
        query.fuzzy[f] = oldValue;
  
        return this;
      },

      /**
            The query text to fuzzify.

            @member ejs.FuzzyQuery
            @param {String} s A text string.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      value: function (txt) {
        if (txt == null) {
          return query.fuzzy[field].value;
        }

        query.fuzzy[field].value = txt;
        return this;
      },

      /**
            Set to false to use classic Levenshtein edit distance.

            @member ejs.FuzzyQuery
            @param {Boolean} trueFalse A boolean value
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      transpositions: function (trueFalse) {
        if (trueFalse == null) {
          return query.fuzzy[field].transpositions;
        }

        query.fuzzy[field].transpositions = trueFalse;
        return this;
      },

      /**
            The maximum number of query terms that will be included in any 
            generated query. Defaults to 50.

            @member ejs.FuzzyQuery
            @param {Integer} max A positive integer value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      maxExpansions: function (max) {
        if (max == null) {
          return query.fuzzy[field].max_expansions;
        }

        query.fuzzy[field].max_expansions = max;
        return this;
      },

      /**
            The minimum similarity of the term variants. Defaults to 0.5.

            @member ejs.FuzzyQuery
            @param {Double} min A positive double value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      minSimilarity: function (min) {
        if (min == null) {
          return query.fuzzy[field].min_similarity;
        }

        query.fuzzy[field].min_similarity = min;
        return this;
      },

      /**
            Length of required common prefix on variant terms. Defaults to 0..

            @member ejs.FuzzyQuery
            @param {Integer} len A positive integer value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      prefixLength: function (len) {
        if (len == null) {
          return query.fuzzy[field].prefix_length;
        }

        query.fuzzy[field].prefix_length = len;
        return this;
      },
                    
      /**
            Sets the boost value of the <code>Query</code>.

            @member ejs.FuzzyQuery
            @param {Double} boost A positive <code>double</code> value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      boost: function (boost) {
        if (boost == null) {
          return query.fuzzy[field].boost;
        }

        query.fuzzy[field].boost = boost;
        return this;
      },

      /**
             Serializes the internal <em>query</em> object as a JSON string.
             @member ejs.FuzzyQuery
             @returns {String} Returns a JSON representation of the Query object.
             */
      toString: function () {
        return JSON.stringify(query);
      },

      /**
            This method is used to retrieve the raw query object. It's designed
            for internal use when composing and serializing queries.
            @member ejs.FuzzyQuery
            @returns {Object} Returns the object's <em>query</em> property.
            */
      get: function () {
        return query;
      }
    };
  };
