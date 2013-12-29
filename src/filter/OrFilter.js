  /**
    @class
    A container filter that allows Boolean OR composition of filters.

    @name ejs.OrFilter
    @ejs filter
    @borrows ejs.FilterMixin.name as name
    @borrows ejs.FilterMixin.cache as cache
    @borrows ejs.FilterMixin.cacheKey as cacheKey
    @borrows ejs.FilterMixin._type as _type
    @borrows ejs.FilterMixin.toJSON as toJSON

    @desc
    A container Filter that allows Boolean OR composition of filters.

    @param {(Filter|Filter[])} filters A valid Filter or array of Filters.
    */
  ejs.OrFilter = function (filters) {

    var
      i, 
      len,
      _common = ejs.FilterMixin('or'),
      filter = _common.toJSON();

    filter.or.filters = [];

    if (isFilter(filters)) {
      filter.or.filters.push(filters.toJSON());
    } else if (isArray(filters)) {
      for (i = 0, len = filters.length; i < len; i++) {
        if (!isFilter(filters[i])) {
          throw new TypeError('Argument must be array of Filters');
        }
        
        filter.or.filters.push(filters[i].toJSON());
      }
    } else {
      throw new TypeError('Argument must be a Filter or array of Filters');
    }

    return extend(_common, {

      /**
             Updates the filters.  If passed a single Filter it is added to 
             the existing filters.  If passed an array of Filters, they 
             replace all existing Filters.

             @member ejs.OrFilter
             @param {(Filter|Filter[])} fltr A Filter or array of Filters
             @returns {Object} returns <code>this</code> so that calls can be chained.
             */
      filters: function (fltr) {
        var i, len;
        
        if (fltr == null) {
          return filter.or.filters;
        }
      
        if (isFilter(fltr)) {
          filter.or.filters.push(fltr.toJSON());
        } else if (isArray(fltr)) {
          filter.or.filters = [];
          for (i = 0, len = fltr.length; i < len; i++) {
            if (!isFilter(fltr[i])) {
              throw new TypeError('Argument must be an array of Filters');
            }
            
            filter.or.filters.push(fltr[i].toJSON());
          }
        } else {
          throw new TypeError('Argument must be a Filter or array of Filters');
        }
        
        return this;
      }
      
    });
  };
