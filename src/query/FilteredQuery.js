  /**
    @class
    <p>Filter queries allow you to restrict the results returned by a query. There are
    several different types of filters that can be applied
    (see <a href="/jsdocs/ejs.filter.html">filter</a> module). A <code>filterQuery</code>
    takes a <code>Query</code> and a <code>Filter</code> object as arguments and constructs
    a new <code>Query</code> that is then used for the search.</p>

    <p><strong>Note:</strong> This module contains a related code example.&nbsp;
    <a target="_blank" class="btn c9" href="https://gist.github.com/1893397">View Code Example</a></p>
    </p>

    @name ejs.FilteredQuery

    @desc
    <p>A query that applies a filter to the results of another query.</p>

    @param {Object} someQuery a valid <code>Query</code> object
    @param {Object} someFilter a valid <code>Filter</code> object.  This parameter
      is optional.

     */
  ejs.FilteredQuery = function (someQuery, someFilter) {

    if (!isEJSObject(someQuery)) {
      throw new TypeError('Argument must be a Query');
    }
    
    if (someFilter != null && !isEJSObject(someFilter)) {
      throw new TypeError('Argument must be a Filter');
    }
    
    /**
         The internal query object. Use <code>get()</code>
         @member ejs.FilteredQuery
         @property {Object} query
         */
    var query = {
      filtered: {
        query: someQuery.get()
      }
    };

    if (someFilter != null) {
      query.filtered.filter = someFilter.get();
    }
    
    return {

      /**
             Adds the query to apply a constant score to.

             @member ejs.FilteredQuery
             @param {Object} oQuery A valid <code>Query</code> object
             @returns {Object} returns <code>this</code> so that calls can be chained.
             */
      query: function (oQuery) {
        if (oQuery == null) {
          return query.filtered.query;
        }
      
        if (!isEJSObject(oQuery)) {
          throw new TypeError('Argument must be a Query');
        }
        
        query.filtered.query = oQuery.get();
        return this;
      },

      /**
             Adds the filter to apply a constant score to.

             @member ejs.FilteredQuery
             @param {Object} oFilter A valid <code>Filter</code> object
             @returns {Object} returns <code>this</code> so that calls can be chained.
             */
      filter: function (oFilter) {
        if (oFilter == null) {
          return query.filtered.filter;
        }
      
        if (!isEJSObject(oFilter)) {
          throw new TypeError('Argument must be a Filter');
        }
        
        query.filtered.filter = oFilter.get();
        return this;
      },

      /**
            Sets the filter strategy.  The strategy defines how the filter is
            applied during document collection.  Valid values are:
            
            query_filter - advance query scorer first then filter
            random_access_random - random access filter
            leap_frog - query scorer and filter "leap-frog", query goes first
            leap_frog_filter_first - same as leap_frog, but filter goes first
            random_access_N - replace N with integer, same as random access 
              except you can specify a custom threshold

            This is an advanced setting, use with care.
            
            @member ejs.FilteredQuery
            @param {String} strategy The strategy as a string.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      strategy: function (strategy) {
        if (strategy == null) {
          return query.filtered.strategy;
        }

        strategy = strategy.toLowerCase();
        if (strategy === 'query_filter' || strategy === 'random_access_random' ||
          strategy === 'leap_frog' || strategy === 'leap_frog_filter_first' ||
          strategy.indexOf('random_access_') === 0) {
            
          query.filtered.strategy = strategy;
        }
        
        return this;
      },
      
      /**
            Enables caching of the filter.

            @member ejs.FilteredQuery
            @param {Boolean} trueFalse A boolean value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      cache: function (trueFalse) {
        if (trueFalse == null) {
          return query.filtered._cache;
        }

        query.filtered._cache = trueFalse;
        return this;
      },
      
      /**
            Set the cache key.

            @member ejs.FilteredQuery
            @param {String} k A string cache key.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      cacheKey: function (k) {
        if (k == null) {
          return query.filtered._cache_key;
        }

        query.filtered._cache_key = k;
        return this;
      },
      
      /**
            Sets the boost value of the <code>Query</code>.

            @member ejs.FilteredQuery
            @param {Double} boost A positive <code>double</code> value.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      boost: function (boost) {
        if (boost == null) {
          return query.filtered.boost;
        }

        query.filtered.boost = boost;
        return this;
      },
      
      /**
             Converts this object to a json string
             @member ejs.FilteredQuery
             @returns {Object} string
             */
      toString: function () {
        return JSON.stringify(query);
      },

      /**
             returns the query object.
             @member ejs.FilteredQuery
             @returns {Object} query object
             */
      get: function () {
        return query;
      }
    };
  };
