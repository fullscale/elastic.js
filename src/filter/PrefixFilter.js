  /**
    @class
    <p>Filters documents that have fields containing terms with a specified prefix (not analyzed). Similar
    to phrase query, except that it acts as a filter. Can be placed within queries that accept a filter.</p>

    @name ejs.PrefixFilter
    @ejs filter
    @borrows ejs.FilterMixin.name as name
    @borrows ejs.FilterMixin.cache as cache
    @borrows ejs.FilterMixin.cacheKey as cacheKey
    @borrows ejs.FilterMixin._type as _type
    @borrows ejs.FilterMixin.toJSON as toJSON

    @desc
    Filters documents that have fields containing terms with a specified prefix.

    @param {String} fieldName the field name to be used during matching.
    @param {String} prefix the prefix value.
    */
  ejs.PrefixFilter = function (fieldName, prefix) {

    var
      _common = ejs.FilterMixin('prefix'),
      filter = _common.toJSON();

    filter.prefix[fieldName] = prefix;
    
    return extend(_common, {

      /**
             Returns the field name used to create this object.

             @member ejs.PrefixFilter
             @param {String} field the field name
             @returns {Object} returns <code>this</code> so that calls can be 
              chained. Returns {String}, field name when field is not specified.
             */
      field: function (field) {
        var oldValue = filter.prefix[fieldName];
      
        if (field == null) {
          return fieldName;
        }
      
        delete filter.prefix[fieldName];
        fieldName = field;
        filter.prefix[fieldName] = oldValue;
      
        return this;
      },
      
      /**
             Sets the prefix to search for.

             @member ejs.PrefixFilter
             @param {String} value the prefix value to match
             @returns {Object} returns <code>this</code> so that calls can be chained.
             */
      prefix: function (value) {
        if (value == null) {
          return filter.prefix[fieldName];
        }
      
        filter.prefix[fieldName] = value;
        return this;
      }
      
    });
  };
