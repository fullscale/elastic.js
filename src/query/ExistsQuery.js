  /**
    @class
    <p>An existsQuery matches documents where the specified field is present
    and the field contains a legitimate value.</p>
    @name ejs.ExistsQuery
    @ejs query
    @borrows ejs.QueryMixin._type as _type
    @borrows ejs.QueryMixin.toJSON as toJSON
    @desc
    Queries documents where a specified field exists and contains a value.
    @param {String} fieldName the field name that must exists and contain a value.
    */
  ejs.ExistsQuery = function (fieldName) {

    var
      _common = ejs.QueryMixin('exists'),
      query = _common.toJSON();

    query.exists.field = fieldName;

    return extend(_common, {

      /**
            Sets the field to check for missing values.
            @member ejs.ExistsQuery
            @param {String} name A name of the field.
            @returns {Object} returns <code>this</code> so that calls can be chained.
            */
      field: function (name) {
        if (name == null) {
          return query.exists.field;
        }

        query.exists.field = name;
        return this;
      }

    });
  };
