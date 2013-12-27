  /**
    @mixin
    <p>The FilterMixin provides support for common options used across 
    various <code>Filter</code> implementations.  This object should not be 
    used directly.</p>

    @name ejs.FilterMixin
    */
  ejs.FilterMixin = function (type) {

    var filter = {};
    filter[type] = {};

    return {

      /**
            Sets the filter name.

            @member ejs.FilterMixin
            @param {String} name A name for the filter.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      name: function (name) {
        if (name == null) {
          return filter[type]._name;
        }

        filter[type]._name = name;
        return this;
      },

      /**
            Enable or disable caching of the filter

            @member ejs.FilterMixin
            @param {Boolean} trueFalse True to cache the filter, false otherwise.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      cache: function (trueFalse) {
        if (trueFalse == null) {
          return filter[type]._cache;
        }

        filter[type]._cache = trueFalse;
        return this;
      },

      /**
            Sets the cache key.

            @member ejs.FilterMixin
            @param {String} key the cache key as a string.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      cacheKey: function (key) {
        if (key == null) {
          return filter[type]._cache_key;
        }

        filter[type]._cache_key = key;
        return this;
      },

      /**
            The type of ejs object.  For internal use only.
          
            @member ejs.FilterMixin
            @returns {String} the type of object
            */
      _type: function () {
        return 'filter';
      },
    
      /**
             Returns the filter object.

             @member ejs.FilterMixin
             @returns {Object} filter object
             */
      toJSON: function () {
        return filter;
      }
    
    };
  };
