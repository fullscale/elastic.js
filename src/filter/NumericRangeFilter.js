  /**
    @class
    A Filter that only accepts numeric values within a specified range.

    @name ejs.NumericRangeFilter

    @desc
    A Filter that only accepts numeric values within a specified range.

    @param {string} fieldName A javascript array of valid Filter objects such as termFilter, etc.
    */
  ejs.NumericRangeFilter = function (fieldName) {

    var filter, start, end;

    /**
         The internal filter object. Use <code>get()</code>

         @member ejs.NumericRangeFilter
         @property {Object} filter
         */
    filter = {
      "numeric_range": {}
    };

    filter.numeric_range[fieldName] = {};

    /**
         A numeric value representing the start of the range.

         @member ejs.NumericRangeFilter
         @property {String} start
         */
    start = '-1';

    /**
         A numeric value representing the end of the range.

         @member ejs.NumericRangeFilter
         @property {String} end
         */
    end = '-1';

    return {

      /**
             Sets the endpoint for the current range.

             @member ejs.NumericRangeFilter
             @param {Number} startPoint A numeric value representing the start of the range
             @returns {Object} returns <code>this</code> so that calls can be chained.
             */
      from: function (startPoint) {
        if (startPoint == null) {
          return start;
        }

        filter.numeric_range[fieldName].from = startPoint;
        start = JSON.stringify(startPoint);
        return this;
      },

      /**
             Sets the endpoint for the current range.

             @member ejs.NumericRangeFilter
             @param {Number} endPoint A numeric value representing the end of the range
             @returns {Object} returns <code>this</code> so that calls can be chained.
             */
      to: function (endPoint) {
        if (endPoint == null) {
          return end;
        }

        filter.numeric_range[fieldName].to = endPoint;
        end = JSON.stringify(endPoint);
        return this;
      },

      /**
             Returns the field name used to create this object.

             @member ejs.NumericRangeFilter
             @param {String} field the field name
             @returns {Object} returns <code>this</code> so that calls can be 
              chained. Returns {String}, field name when field is not specified.
             */
      field: function (field) {
        var oldValue = filter.numeric_range[fieldName];
      
        if (field == null) {
          return fieldName;
        }
      
        fieldName = field;
        filter.numeric_range = {};
        filter.numeric_range[fieldName] = oldValue;
      
        return this;
      },

      /**
             Returns the filter term used to create this object. Alias for `field`.

             @member ejs.NumericRangeFilter
             @returns {String} filter term
             */
      key: function (field) {
        return this.field(field);
      },

      /**
             Returns the filter value used to create this object. Alias for `from`.

             @member ejs.NumericRangeFilter
             @returns {String} filter term
             */
      value: function (from) {
        return this.from(from);
      },

      /**
             Returns the filter container as a JSON string.

             @member ejs.NumericRangeFilter
             @returns {String} JSON representation of the numericRangeFilter object
             */
      toString: function () {
        return JSON.stringify(filter);
      },

      /**
             Returns the filter object.

             @member ejs.NumericRangeFilter
             @returns {Object} filter object
             */
      get: function () {
        return filter;
      }
    };
  };
