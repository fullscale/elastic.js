  /**
    @class
    <p>A <code>BoolFilter</code> allows you to build <em>Boolean</em> filter constructs
    from individual filters. Similar in concept to Boolean query, except that 
    the clauses are other filters. Can be placed within queries that accept a 
    filter.
  
    @name ejs.BoolFilter

    @desc
    A Filter that matches documents matching boolean combinations of other
    filters.

    */
  ejs.BoolFilter = function () {

    /**
         The internal filter object. <code>Use get()</code>
         @member ejs.BoolFilter
         @property {Object} filter
         */
    var filter = {
      bool: {}
    };

    return {

      /**
             Adds filter to boolean container. Given filter "must" appear in matching documents.

             @member ejs.BoolFilter
             @param {Object} oFilter A valid <code>Query</code> object
             @returns {Object} returns <code>this</code> so that calls can be chained.
             */
      must: function (oFilter) {
        if (filter.bool.must == null) {
          filter.bool.must = [];
        }
    
        if (oFilter == null) {
          return filter.bool.must;
        }

        filter.bool.must.push(oFilter.get());
        return this;
      },

      /**
             Adds filter to boolean container. Given filter "must not" appear in matching documents.

             @member ejs.BoolFilter
             @param {Object} oFilter A valid filter object
             @returns {Object} returns <code>this</code> so that calls can be chained.
             */
      mustNot: function (oFilter) {
        if (filter.bool.must_not == null) {
          filter.bool.must_not = [];
        }

        if (oFilter == null) {
          return filter.bool.must_not;
        }
    
        filter.bool.must_not.push(oFilter.get());
        return this;
      },

      /**
             Adds filter to boolean container. Given filter "should" appear in matching documents.

             @member ejs.BoolFilter
             @param {Object} oFilter A valid filter object
             @returns {Object} returns <code>this</code> so that calls can be chained.
             */
      should: function (oFilter) {
        if (filter.bool.should == null) {
          filter.bool.should = [];
        }

        if (oFilter == null) {
          return filter.bool.should;
        }
    
        filter.bool.should.push(oFilter.get());
        return this;
      },

      /**
            Sets the filter name.

            @member ejs.BoolFilter
            @param {String} name A name for the filter.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      name: function (name) {
        if (name == null) {
          return filter.bool._name;
        }

        filter.bool._name = name;
        return this;
      },

      /**
            Enable or disable caching of the filter

            @member ejs.BoolFilter
            @param {Boolean} trueFalse True to cache the filter, false otherwise.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      cache: function (trueFalse) {
        if (trueFalse == null) {
          return filter.bool._cache;
        }

        filter.bool._cache = trueFalse;
        return this;
      },
  
      /**
            Sets the cache key.

            @member ejs.BoolFilter
            @param {String} key the cache key as a string.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      cacheKey: function (key) {
        if (key == null) {
          return filter.bool._cache_key;
        }

        filter.bool._cache_key = key;
        return this;
      },
    
      /**
            Allows you to serialize this object into a JSON encoded string.

            @member ejs.BoolFilter
            @returns {String} returns this object as a serialized JSON string.
            */
      toString: function () {
        return JSON.stringify(filter);
      },

      /**
            Retrieves the internal <code>filter</code> object. This is typically used by
            internal API functions so use with caution.

            @member ejs.BoolFilter
            @returns {String} returns this object's internal <code>filter</code> property.
            */
      get: function () {
        return filter;
      }
    };
  };
