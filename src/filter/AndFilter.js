  /**
    @class
    A container Filter that allows Boolean AND composition of Filters.

    @name ejs.AndFilter
    @ejs filter
    @borrows ejs.FilterMixin.name as name
    @borrows ejs.FilterMixin.cache as cache
    @borrows ejs.FilterMixin.cacheKey as cacheKey
    @borrows ejs.FilterMixin._type as _type
    @borrows ejs.FilterMixin.toJSON as toJSON

    @desc
    A container Filter that allows Boolean AND composition of Filters.

    @param {(Filter|Filter[])} f A single Filter object or an array of valid 
      Filter objects.
    */
  ejs.AndFilter = function (f) {

    var
      i,
      len,
      _common = ejs.FilterMixin('and'),
      filter = _common.toJSON();
    
    filter.and.filters = [];
    
    if (isFilter(f)) {
      filter.and.filters.push(f.toJSON());
    } else if (isArray(f)) {
      for (i = 0, len = f.length; i < len; i++) {
        if (!isFilter(f[i])) {
          throw new TypeError('Array must contain only Filter objects');
        }
        
        filter.and.filters.push(f[i].toJSON());
      }
    } else {
      throw new TypeError('Argument must be a Filter or Array of Filters');
    }

    return extend(_common, {

      /**
             Sets the filters for the filter.  If fltr is a single 
             Filter, it is added to the current filters.  If fltr is an array
             of Filters, then they replace all existing filters.

             @member ejs.AndFilter
             @param {(Filter|Filter[])} fltr A valid filter object or an array of filters.
             @returns {Object} returns <code>this</code> so that calls can be chained.
             */
      filters: function (fltr) {
        var i,
          len;
          
        if (fltr == null) {
          return filter.and.filters;
        }
      
        if (isFilter(fltr)) {
          filter.and.filters.push(fltr.toJSON());
        } else if (isArray(fltr)) {
          filter.and.filters = [];
          for (i = 0, len = fltr.length; i < len; i++) {
            if (!isFilter(fltr[i])) {
              throw new TypeError('Array must contain only Filter objects');
            }
            
            filter.and.filters.push(fltr[i].toJSON());
          }
        } else {
          throw new TypeError('Argument must be a Filter or an Array of Filters');
        }
        
        return this;
      }
      
    });
  };
