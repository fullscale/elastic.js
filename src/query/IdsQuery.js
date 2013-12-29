  /**
    @class
    <p>Filters documents that only have the provided ids. Note, this filter 
    does not require the _id field to be indexed since it works using the 
    _uid field.</p>

    @name ejs.IdsQuery
    @ejs query
    @borrows ejs.QueryMixin.boost as boost
    @borrows ejs.QueryMixin._type as _type
    @borrows ejs.QueryMixin.toJSON as toJSON

    @desc
    Matches documents with the specified id(s).

    @param {(String|String[])} ids A single document id or a list of document ids.
    */
  ejs.IdsQuery = function (ids) {

    var
      _common = ejs.QueryMixin('ids'),
      query = _common.toJSON();
    
    if (isString(ids)) {
      query.ids.values = [ids];
    } else if (isArray(ids)) {
      query.ids.values = ids;
    } else {
      throw new TypeError('Argument must be string or array');
    }

    return extend(_common, {

      /**
            Sets the values array or adds a new value. if val is a string, it
            is added to the list of existing document ids.  If val is an
            array it is set as the document values and replaces any existing values.

            @member ejs.IdsQuery
            @param {(String|String[])} val An single document id or an array of document ids.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      values: function (val) {
        if (val == null) {
          return query.ids.values;
        }
    
        if (isString(val)) {
          query.ids.values.push(val);
        } else if (isArray(val)) {
          query.ids.values = val;
        } else {
          throw new TypeError('Argument must be string or array');
        }
        
        return this;
      },

      /**
            Sets the type as a single type or an array of types.  If type is a
            string, it is added to the list of existing types.  If type is an
            array, it is set as the types and overwrites an existing types. This
            parameter is optional.

            @member ejs.IdsQuery
            @param {(String|String[])} type A type or a list of types
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      type: function (type) {
        if (query.ids.type == null) {
          query.ids.type = [];
        }
        
        if (type == null) {
          return query.ids.type;
        }
        
        if (isString(type)) {
          query.ids.type.push(type);
        } else if (isArray(type)) {
          query.ids.type = type;
        } else {
          throw new TypeError('Argument must be string or array');
        }
        
        return this;
      }
      
    });
  };
