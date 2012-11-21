  /**
    @class
    <p>An missingFilter matches documents where the specified field contains no legitimate value.</p>

    @name ejs.MissingFilter

    @desc
    Filters documents where a specific field has no value present.

    @param {String} fieldName the field name to check for missing values.
    */
  ejs.MissingFilter = function (fieldName) {

    /**
         The internal filter object. Use <code>get()</code>

         @member ejs.MissingFilter
         @property {Object} filter
         */
    var filter = {
      "missing": {
        "field": fieldName
      }
    };

    return {

      /**
             Returns the filter container as a JSON string

             @member ejs.MissingFilter
             @returns {String} JSON representation of the missingFilter object
             */
      toString: function () {
        return JSON.stringify(filter);
      },

      /**
             Returns the filter object.

             @member ejs.MissingFilter
             @returns {Object} filter object
             */
      get: function () {
        return filter;
      }
    };
  };
