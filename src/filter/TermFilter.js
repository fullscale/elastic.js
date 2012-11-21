  /**
    @class
    <p>Constructs a filter for docs matching any of the terms added to this
    object. Unlike a RangeFilter this can be used for filtering on multiple
    terms that are not necessarily in a sequence.</p>

    <p><strong>Note:</strong> This module contains a related code example.&nbsp;
    <a target="_blank" class="btn c9" href="https://gist.github.com/1893529">View Code Example</a></p>

    @name ejs.TermFilter

    @desc
    Constructs a filter for docs matching any of the terms added to this object.

    @param {string} key The document field/key to execute the filter against.
    @param {string} value The literal value used to filter the results.
    */
  ejs.TermFilter = function (key, value) {

    /**
         The internal filter object. Use the get() method for access.
         @member ejs.TermFilter
         @property {Object} filter
         */
    var filter = {
      term: {}
    };

    filter.term[key] = value;

    return {

      /**
             Provides access to the filter key used to construct the termFilter object.
             @member ejs.TermFilter
             @param {String} k the key term
             @returns {Object} returns <code>this</code> so that calls can be chained.
              When k is not specified, Returns {String}, the filter key used to construct 
              the termFilter object.
             */
      key: function (k) {
        var oldValue = filter.term[key];
      
        if (k == null) {
          return key;
        }
      
        key = k;
        filter.term = {};
        filter.term[key] = oldValue;
      
        return this;
      },

      /**
             Provides access to the filter value used to construct the termFilter object.
             @member ejs.TermFilter
             @returns {Object} returns <code>this</code> so that calls can be chained.
              When k is not specified, Returns {String}, the filter value used 
              to construct the termFilter object.
             */
      value: function (v) {
        if (v == null) {
          return value;
        }
      
        filter.term[key] = v;
        return this;
      },

      /**
             Serializes the internal filter object as a JSON string.
             @member ejs.TermFilter
             @returns {String} Returns a JSON representation of the termFilter object.
             */
      toString: function () {
        return JSON.stringify(filter);
      },
    
      /**
            This method is used to retrieve the raw filter object. It's designed
            for internal use when composing and serializing queries.
            @member ejs.TermFilter
            @returns {Object} Returns the object's filter property.
            */
      get: function () {
        return filter;
      }
    };
  };
