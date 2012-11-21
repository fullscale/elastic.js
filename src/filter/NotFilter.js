  /**
    @class
    <p>A container Filter that excludes the documents matched by the
    contained filter.</p>

    @name ejs.NotFilter

    @desc
    Container filter that excludes the matched documents of the contained filter.

    @param {Object} oFilter a valid Filter object such as a termFilter, etc.
    */
  ejs.NotFilter = function (oFilter) {

    /**
         The internal filter object. Use <code>get()</code>

         @member ejs.NotFilter
         @property {Object} filter
         */
    var filter = {
      "not": oFilter.get()
    };

    return {

      /**
             * Sets the filter

             @member ejs.NotFilter
             @param {Object} fltr A valid filter object such as a termFilter, etc.
             @returns {Object} returns <code>this</code> so that calls can be chained.
             */
      filter: function (fltr) {
        if (fltr == null) {
          return filter.not;
        }
      
        filter.not = fltr.get();
        return this;
      },

      /**
             Returns the filter container as a JSON string

             @member ejs.NotFilter
             @returns {String} JSON representation of the notFilter object
             */
      toString: function () {
        return JSON.stringify(filter);
      },

      /**
             Returns the filter object.

             @member ejs.NotFilter
             @returns {Object} filter object
             */
      get: function () {
        return filter;
      }
    };
  };
