  /**
    @class
    <p>A Filter that filters results by a specified index type.</p>

    @name ejs.TypeFilter
    @ejs filter
    @borrows ejs.FilterMixin.name as name
    @borrows ejs.FilterMixin.cache as cache
    @borrows ejs.FilterMixin.cacheKey as cacheKey
    @borrows ejs.FilterMixin._type as _type
    @borrows ejs.FilterMixin.toJSON as toJSON

    @desc
    Filter results by a specified index type.

    @param {String} type the index type to filter on.
    */
  ejs.TypeFilter = function (type) {

    var 
    _common = ejs.FilterMixin('type'),
    filter = _common.toJSON();
    
    filter.type.value = type;

    return extend(_common, {

      /**
             Sets the type

             @member ejs.TypeFilter
             @param {String} type the index type to filter on
             @returns {Object} returns <code>this</code> so that calls can be chained.
             */
      type: function (type) {
        if (type == null) {
          return filter.type.value;
        }
      
        filter.type.value = type;
        return this;
      }
      
    });
  };
