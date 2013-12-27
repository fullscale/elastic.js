  /**
    @class
    <p>An existsFilter matches documents where the specified field is present
    and the field contains a legitimate value.</p>

    @name ejs.ExistsFilter
    @ejs filter
    @borrows ejs.FilterMixin.name as name
    @borrows ejs.FilterMixin.cache as cache
    @borrows ejs.FilterMixin.cacheKey as cacheKey
    @borrows ejs.FilterMixin._type as _type
    @borrows ejs.FilterMixin.toJSON as toJSON

    @desc
    Filters documents where a specified field exists and contains a value.

    @param {String} fieldName the field name that must exists and contain a value.
    */
  ejs.ExistsFilter = function (fieldName) {

    var 
      _common = ejs.FilterMixin('exists'),
      filter = _common.toJSON();
    
    filter.exists.field = fieldName;

    return extend(_common, {

      /**
            Sets the field to check for missing values.

            @member ejs.ExistsFilter
            @param {String} name A name of the field.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      field: function (name) {
        if (name == null) {
          return filter.exists.field;
        }

        filter.exists.field = name;
        return this;
      }
      
    });
  };
