  /**
    @class
    <p>Wraps any query to be used as a filter. Can be placed within queries 
    that accept a filter.</p>

    <p>The result of the filter is not cached by default.  Set the cache 
    parameter to true to cache the result of the filter. This is handy when the 
    same query is used on several (many) other queries.</p> 
  
    <p>Note, the process of caching the first execution is higher when not 
    caching (since it needs to satisfy different queries).</p>
  
    @name ejs.QueryFilter
    @ejs filter
    @borrows ejs.FilterMixin.name as name
    @borrows ejs.FilterMixin.cache as cache
    @borrows ejs.FilterMixin.cacheKey as cacheKey
    @borrows ejs.FilterMixin._type as _type
    @borrows ejs.FilterMixin.toJSON as toJSON

    @desc
    Filters documents matching the wrapped query.

    @param {Object} qry A valid query object.
    */
  ejs.QueryFilter = function (qry) {

    if (!isQuery(qry)) {
      throw new TypeError('Argument must be a Query');
    }
    
    var
      _common = ejs.FilterMixin('fquery'),
      filter = _common.toJSON();
    
    filter.fquery.query = qry.toJSON();

    return extend(_common, {

      /**
            Sets the query

            @member ejs.QueryFilter
            @param {Object} q A valid Query object
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      query: function (q) {
        if (q == null) {
          return filter.fquery.query;
        }

        if (!isQuery(q)) {
          throw new TypeError('Argument must be a Query');
        }
        
        filter.fquery.query = q.toJSON();
        return this;
      }
      
    });
  };
