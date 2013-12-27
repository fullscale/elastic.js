  /**
    @class
    <p>An missingFilter matches documents where the specified field contains no legitimate value.</p>

    @name ejs.MissingFilter
    @ejs filter
    @borrows ejs.FilterMixin.name as name
    @borrows ejs.FilterMixin.cache as cache
    @borrows ejs.FilterMixin.cacheKey as cacheKey
    @borrows ejs.FilterMixin._type as _type
    @borrows ejs.FilterMixin.toJSON as toJSON

    @desc
    Filters documents where a specific field has no value present.

    @param {String} fieldName the field name to check for missing values.
    */
  ejs.MissingFilter = function (fieldName) {

    
    var 
      _common = ejs.FilterMixin('missing'),
      filter = _common.toJSON();
    
    filter.missing.field = fieldName;

    return extend(_common, {

      /**
            Sets the field to check for missing values.

            @member ejs.MissingFilter
            @param {String} name A name of the field.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      field: function (name) {
        if (name == null) {
          return filter.missing.field;
        }

        filter.missing.field = name;
        return this;
      },
      
      /**
            Checks if the field doesn't exist.

            @member ejs.MissingFilter
            @param {Boolean} trueFalse True to check if the field doesn't exist.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      existence: function (trueFalse) {
        if (trueFalse == null) {
          return filter.missing.existence;
        }

        filter.missing.existence = trueFalse;
        return this;
      },

      /**
            Checks if the field has null values.

            @member ejs.MissingFilter
            @param {Boolean} trueFalse True to check if the field has nulls.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      nullValue: function (trueFalse) {
        if (trueFalse == null) {
          return filter.missing.null_value;
        }

        filter.missing.null_value = trueFalse;
        return this;
      }
      
    });
  };
