  /**
    @class
    <p>A range aggregation that is dedicated for date values. The main difference
    between this aggregation and the normal range aggregation is that the from
    and to values can be expressed in Date Math expressions, and it is also
    possible to specify a date format by which the from and to response fields
    will be returned. Note that this aggregration includes the from value and
    excludes the to value for each range.</p>

    <p>Note that this aggregration includes the from value and excludes the to
    value for each range.</p>

    @name ejs.DateRangeAggregation
    @ejs aggregation
    @borrows ejs.AggregationMixin.aggregation as aggregation
    @borrows ejs.AggregationMixin.agg as agg
    @borrows ejs.AggregationMixin._type as _type
    @borrows ejs.AggregationMixin.toJSON as toJSON

    @desc
    <p>Aggregation that is dedicated for date value ranges.</p>

    @param {String} name The name which be used to refer to this aggregation.

    */
  ejs.DateRangeAggregation = function (name) {

    var
      _common = ejs.AggregationMixin(name),
      agg = _common.toJSON();

    agg[name].date_range = {};

    return extend(_common, {

      /**
      <p>Sets the field to gather terms from.</p>

      @member ejs.DateRangeAggregation
      @param {String} field a valid field name..
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      field: function (field) {
        if (field == null) {
          return agg[name].date_range.field;
        }

        agg[name].date_range.field = field;
        return this;
      },

      /**
      Allows you generate or modify the terms using a script.

      @member ejs.DateRangeAggregation
      @param {String} scriptCode A valid script string to execute.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      script: function (scriptCode) {
        if (scriptCode == null) {
          return agg[name].date_range.script;
        }

        agg[name].date_range.script = scriptCode;
        return this;
      },

      /**
      The script language being used.

      @member ejs.DateRangeAggregation
      @param {String} language The language of the script.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      lang: function (language) {
        if (language == null) {
          return agg[name].date_range.lang;
        }

        agg[name].date_range.lang = language;
        return this;
      },

      /**
      Sets the date format expression.

      @member ejs.DateRangeAggregation
      @param {String} f the format string
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      format: function (f) {
        if (f == null) {
          return agg[name].date_range.format;
        }

        agg[name].date_range.format = f;
        return this;
      },

      /**
      Adds a range to the list of exsiting range expressions.

      @member ejs.DateRangeAggregation
      @param {String} from The start value, use null to ignore
      @param {String} to The end value, use null to ignore.
      @param {String} key Optional key/bucket name for keyed responses.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      range: function (from, to, key) {
        var rangeObj = {};
        if (agg[name].date_range.ranges == null) {
          agg[name].date_range.ranges = [];
        }

        if (from == null && to == null) {
          return agg[name].date_range.ranges;
        }

        if (from != null) {
          rangeObj.from = from;
        }

        if (to != null) {
          rangeObj.to = to;
        }

        if (key != null) {
          rangeObj.key = key;
        }

        agg[name].date_range.ranges.push(rangeObj);
        return this;
      },

      /**
      Enable the response to be returned as a keyed object where the key is the
      bucket interval.

      @member ejs.DateRangeAggregation
      @param {Boolean} trueFalse to enable keyed response or not
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      keyed: function (trueFalse) {
        if (trueFalse == null) {
          return agg[name].date_range.keyed;
        }

        agg[name].date_range.keyed = trueFalse;
        return this;
      },

      /**
      Set to true to assume script values are sorted.

      @member ejs.DateRangeAggregation
      @param {Boolean} trueFalse assume sorted values or not
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      scriptValuesSorted: function (trueFalse) {
        if (trueFalse == null) {
          return agg[name].date_range.script_values_sorted;
        }

        agg[name].date_range.script_values_sorted = trueFalse;
        return this;
      },

      /**
      Sets parameters that will be applied to the script.  Overwrites
      any existing params.

      @member ejs.DateRangeAggregation
      @param {Object} p An object where the keys are the parameter name and
        values are the parameter value.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      params: function (p) {
        if (p == null) {
          return agg[name].date_range.params;
        }

        agg[name].date_range.params = p;
        return this;
      }

    });
  };
