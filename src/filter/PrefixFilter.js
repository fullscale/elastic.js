  /**
    @class
    <p>Filters documents that have fields containing terms with a specified prefix (not analyzed). Similar
    to phrase query, except that it acts as a filter. Can be placed within queries that accept a filter.</p>

    @name ejs.PrefixFilter

    @desc
    Filters documents that have fields containing terms with a specified prefix.

    @param {String} fieldName the field name to be used during matching.
    */
  ejs.PrefixFilter = function (fieldName) {

    /**
         The internal filter object. Use <code>get()</code>

         @member ejs.PrefixFilter
         @property {Object} filter
         */
    var filter = {
      "prefix": {}
    };

    return {

      /**
             Returns the filter container as a JSON string

             @member ejs.PrefixFilter
             @param {String} value the prefix value to match
             @returns {Object} returns <code>this</code> so that calls can be chained.
             */
      prefix: function (value) {
        if (value == null) {
          return filter.prefix[fieldName];
        }
      
        filter.prefix[fieldName] = value;
        return this;
      },

      /**
             Returns the filter container as a JSON string

             @member ejs.PrefixFilter
             @returns {String} JSON representation of the prefixFilter object
             */
      toString: function () {
        return JSON.stringify(filter);
      },

      /**
             Returns the filter object.

             @member ejs.PrefixFilter
             @returns {Object} filter object
             */
      get: function () {
        return filter;
      }
    };
  };
