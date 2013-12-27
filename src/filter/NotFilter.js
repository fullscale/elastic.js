  /**
    @class
    <p>A container Filter that excludes the documents matched by the
    contained filter.</p>

    @name ejs.NotFilter
    @ejs filter
    @borrows ejs.FilterMixin.name as name
    @borrows ejs.FilterMixin.cache as cache
    @borrows ejs.FilterMixin.cacheKey as cacheKey
    @borrows ejs.FilterMixin._type as _type
    @borrows ejs.FilterMixin.toJSON as toJSON

    @desc
    Container filter that excludes the matched documents of the contained filter.

    @param {Object} oFilter a valid Filter object such as a termFilter, etc.
    */
  ejs.NotFilter = function (oFilter) {

    if (!isFilter(oFilter)) {
      throw new TypeError('Argument must be a Filter');
    }
    
    var 
      _common = ejs.FilterMixin('not'),
      filter = _common.toJSON();
    
    filter.not = oFilter.toJSON();

    return extend(_common, {

      /**
             Sets the filter

             @member ejs.NotFilter
             @param {Object} fltr A valid filter object such as a termFilter, etc.
             @returns {Object} returns <code>this</code> so that calls can be chained.
             */
      filter: function (fltr) {
        if (fltr == null) {
          return filter.not;
        }
      
        if (!isFilter(fltr)) {
          throw new TypeError('Argument must be a Filter');
        }
        
        filter.not = fltr.toJSON();
        return this;
      }
      
    });
  };
