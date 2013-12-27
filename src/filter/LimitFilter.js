  /**
    @class
    <p>A limit filter limits the number of documents (per shard) to execute on.</p>

    @name ejs.LimitFilter
    @ejs filter
    @borrows ejs.FilterMixin.name as name
    @borrows ejs.FilterMixin.cache as cache
    @borrows ejs.FilterMixin.cacheKey as cacheKey
    @borrows ejs.FilterMixin._type as _type
    @borrows ejs.FilterMixin.toJSON as toJSON

    @desc
    Limits the number of documents to execute on.

    @param {Integer} limit The number of documents to execute on.
    */
  ejs.LimitFilter = function (limit) {

    var 
      _common = ejs.FilterMixin('limit'),
      filter = _common.toJSON();
    
    filter.limit.value = limit;

    return extend(_common, {

      /**
            Sets the limit value.

            @member ejs.LimitFilter
            @param {Integer} val An The number of documents to execute on.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      value: function (val) {
        if (val == null) {
          return filter.limit.value;
        }

        if (!isNumber(val)) {
          throw new TypeError('Argument must be a numeric value');
        }
            
        filter.limit.value = val;
        return this;
      }
      
    });
  };
