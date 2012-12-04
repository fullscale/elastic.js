  /**
    @class
    <p>Filters documents that only have the provided ids. Note, this filter 
    does not require the _id field to be indexed since it works using the 
    _uid field.</p>

    @name ejs.IdsFilter

    @desc
    Matches documents with the specified id(s).

    @param {Array || String} ids A single document id or a list of document ids.
    */
  ejs.IdsFilter = function (ids) {

    /**
         The internal filter object. <code>Use get()</code>
         @member ejs.IdsFilter
         @property {Object} filter
         */
    var filter = {
      ids: {}
    };
  
    if (typeof ids === 'string') {
      filter.ids.values = [ids];
    } else {
      filter.ids.values = ids;
    }

    return {

      /**
            Sets the values array or adds a new value. if val is a string, it
            is added to the list of existing document ids.  If val is an
            array it is set as the document values and replaces any existing values.

            @member ejs.IdsFilter
            @param {Array || String} val An single document id or an array of document ids.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      values: function (val) {
        if (val == null) {
          return filter.ids.values;
        }
  
        if (typeof val === 'string') {
          filter.ids.values.push(val);
        } else {
          filter.ids.values = val;
        }
      
        return this;
      },

      /**
            Sets the type as a single type or an array of types.  If type is a
            string, it is added to the list of existing types.  If type is an
            array, it is set as the types and overwrites an existing types. This
            parameter is optional.

            @member ejs.IdsFilter
            @param {Array || String} type A type or a list of types
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      type: function (type) {
        if (filter.ids.type == null) {
          filter.ids.type = [];
        }
      
        if (type == null) {
          return filter.ids.type;
        }
      
        if (typeof type === 'string') {
          filter.ids.type.push(type);
        } else {
          filter.ids.type = type;
        }
      
        return this;
      },

      /**
            Sets the filter name.

            @member ejs.IdsFilter
            @param {String} name A name for the filter.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      name: function (name) {
        if (name == null) {
          return filter.ids._name;
        }

        filter.ids._name = name;
        return this;
      },
             
      /**
            Allows you to serialize this object into a JSON encoded string.

            @member ejs.IdsFilter
            @returns {String} returns this object as a serialized JSON string.
            */
      toString: function () {
        return JSON.stringify(filter);
      },

      /**
            Retrieves the internal <code>filter</code> object. This is typically used by
            internal API functions so use with caution.

            @member ejs.IdsFilter
            @returns {String} returns this object's internal <code>filter</code> property.
            */
      get: function () {
        return filter;
      }
    };
  };
