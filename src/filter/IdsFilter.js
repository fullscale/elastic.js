  /**
    @class
    <p>Filters documents that only have the provided ids. Note, this filter 
    does not require the _id field to be indexed since it works using the 
    _uid field.</p>

    @name ejs.IdsFilter
    @ejs filter
    @borrows ejs.FilterMixin.name as name
    @borrows ejs.FilterMixin.cache as cache
    @borrows ejs.FilterMixin.cacheKey as cacheKey
    @borrows ejs.FilterMixin._type as _type
    @borrows ejs.FilterMixin.toJSON as toJSON

    @desc
    Matches documents with the specified id(s).

    @param {(String|String[])} ids A single document id or a list of document ids.
    */
  ejs.IdsFilter = function (ids) {

    var
      _common = ejs.FilterMixin('ids'),
      filter = _common.toJSON(); 
  
    if (isString(ids)) {
      filter.ids.values = [ids];
    } else if (isArray(ids)) {
      filter.ids.values = ids;
    } else {
      throw new TypeError('Argument must be a string or an array');
    }

    return extend(_common, {

      /**
            Sets the values array or adds a new value. if val is a string, it
            is added to the list of existing document ids.  If val is an
            array it is set as the document values and replaces any existing values.

            @member ejs.IdsFilter
            @param {(String|String[])} val An single document id or an array of document ids.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      values: function (val) {
        if (val == null) {
          return filter.ids.values;
        }
  
        if (isString(val)) {
          filter.ids.values.push(val);
        } else if (isArray(val)) {
          filter.ids.values = val;
        } else {
          throw new TypeError('Argument must be a string or an array');
        }
      
        return this;
      },

      /**
            Sets the type as a single type or an array of types.  If type is a
            string, it is added to the list of existing types.  If type is an
            array, it is set as the types and overwrites an existing types. This
            parameter is optional.

            @member ejs.IdsFilter
            @param {(String|String[])} type A type or a list of types
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      type: function (type) {
        if (filter.ids.type == null) {
          filter.ids.type = [];
        }
      
        if (type == null) {
          return filter.ids.type;
        }
      
        if (isString(type)) {
          filter.ids.type.push(type);
        } else if (isArray(type)) {
          filter.ids.type = type;
        } else {
          throw new TypeError('Argument must be a string or an array');
        }
      
        return this;
      }
      
    });
  };
