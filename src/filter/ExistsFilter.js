  /**
    @class
    <p>An existsFilter matches documents where the specified field is present
    and the field contains a legitimate value.</p>

    @name ejs.ExistsFilter

    @desc
    Filters documents where a specified field exists and contains a value.

    @param {String} fieldName the field name that must exists and contain a value.
    */
  ejs.ExistsFilter = function (fieldName) {

    /**
         The internal filter object. Use <code>get()</code>

         @member ejs.ExistsFilter
         @property {Object} filter
         */
    var filter = {
      "exists": {
        "field": fieldName
      }
    };

    return {

      /**
             Returns the filter container as a JSON string

             @member ejs.ExistsFilter
             @returns {String} JSON representation of the existsFilter object
             */
      toString: function () {
        return JSON.stringify(filter);
      },

      /**
             Returns the filter object.

             @member ejs.ExistsFilter
             @returns {Object} filter object
             */
      get: function () {
        return filter;
      }
    };
  };
