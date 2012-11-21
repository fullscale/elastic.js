  /**
    @class
    A container Filter that allows Boolean AND composition of Filters.

    @name ejs.AndFilter

    @desc
    A container Filter that allows Boolean AND composition of Filters.

    @param {Array} filterArray A javascript array of valid Filter objects such as termFilter, etc.
    */
  ejs.AndFilter = function (filterArray) {

    /**
         The internal filter object. Use <code>get()</code>

         @member ejs.AndFilter
         @property {Object} filter
         */
    var filter, i, len;

    filter = {
      "and": []
    };

    for (i = 0, len = filterArray.length; i < len; i++) {
      filter.and.push(filterArray[i].get());
    }

    return {

      /**
             * Adds a new filter to the filter container

             @member ejs.AndFilter
             @param {Object} fltr A valid filter object such as a termFilter, etc.
             @returns {Object} returns <code>this</code> so that calls can be chained.
             */
      add: function (fltr) {
        if (fltr == null) {
          return filter.and;
        }
      
        filter.and.push(fltr.get());
        return this;
      },

      /**
             Returns the filter container as a JSON string

             @member ejs.AndFilter
             @returns {String} JSON representation of the andFilter object
             */
      toString: function () {
        return JSON.stringify(filter);
      },

      /**
             Returns the filter object.

             @member ejs.AndFilter
             @returns {Object} filter object
             */
      get: function () {
        return filter;
      }
    };
  };
