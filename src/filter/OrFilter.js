  /**
    @class
    A container filter that allows Boolean OR composition of filters.

    @name ejs.OrFilter

    @desc
    A container Filter that allows Boolean OR composition of filters.

    @param {Array} filterArray A javascript array of valid Filter objects such as termFilter, etc.
    */
  ejs.OrFilter = function (filterArray) {

    /**
         The internal filter object. Use <code>get()</code>

         @member ejs.OrFilter
         @property {Object} filter
         */
    var filter, i, len;

    filter = {
      "or": []
    };

    for (i = 0, len = filterArray.length; i < len; i++) {
      filter.or.push(filterArray[i].get());
    }

    return {

      /**
             * Adds a new filter to the filter container

             @member ejs.OrFilter
             @param {Object} fltr A valid filter object such as a termFilter, etc.
             @returns {Object} returns <code>this</code> so that calls can be chained.
             */
      add: function (fltr) {
        if (fltr == null) {
          return filter.or;
        }
      
        filter.or.push(fltr.get());
        return this;
      },

      /**
             Returns the filter container as a JSON string

             @member ejs.OrFilter
             @returns {String} JSON representation of the orFilter object
             */
      toString: function () {
        return JSON.stringify(filter);
      },

      /**
             Returns the filter object.

             @member ejs.OrFilter
             @returns {Object} filter object
             */
      get: function () {
        return filter;
      }
    };
  };
