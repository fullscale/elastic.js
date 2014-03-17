  /**
    @class
    <p>A multi-bucket value source based aggregation that enables the user to
    define a set of ranges - each representing a bucket. During the aggregation
    process, the values extracted from each document will be checked against each
    bucket range and "bucket" the relevant/matching document.</p>

    <p>Note that this aggregration includes the from value and excludes the to
    value for each range.</p>

    @name ejs.RangeAggregation
    @ejs aggregation
    @borrows ejs.AggregationMixin.aggregation as aggregation
    @borrows ejs.AggregationMixin.agg as agg
    @borrows ejs.AggregationMixin._type as _type
    @borrows ejs.AggregationMixin.toJSON as toJSON

    @desc
    <p>Aggregation that enables the user to define a set of ranges that each
    represent a bucket.</p>

    @param {String} name The name which be used to refer to this aggregation.

    */
  ejs.RangeAggregation = function (name) {

    var
      _common = ejs.AggregationMixin(name),
      agg = _common.toJSON();

    agg[name].range = {};

    return extend(_common, {

      /**
      <p>Sets the field to gather terms from.</p>

      @member ejs.RangeAggregation
      @param {String} field a valid field name..
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      field: function (field) {
        if (field == null) {
          return agg[name].range.field;
        }

        agg[name].range.field = field;
        return this;
      },

      /**
      Allows you generate or modify the terms using a script.

      @member ejs.RangeAggregation
      @param {String} scriptCode A valid script string to execute.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      script: function (scriptCode) {
        if (scriptCode == null) {
          return agg[name].range.script;
        }

        agg[name].range.script = scriptCode;
        return this;
      },

      /**
      The script language being used.

      @member ejs.RangeAggregation
      @param {String} language The language of the script.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      lang: function (language) {
        if (language == null) {
          return agg[name].range.lang;
        }

        agg[name].range.lang = language;
        return this;
      },

      /**
      Adds a range to the list of exsiting range expressions.

      @member ejs.RangeAggregation
      @param {String} from The start value, use null to ignore
      @param {String} to The end value, use null to ignore.
      @param {String} key Optional key/bucket name for keyed responses.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      range: function (from, to, key) {
        var rangeObj = {};
        if (agg[name].range.ranges == null) {
          agg[name].range.ranges = [];
        }

        if (from == null && to == null) {
          return agg[name].range.ranges;
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

        agg[name].range.ranges.push(rangeObj);
        return this;
      },

      /**
      Enable the response to be returned as a keyed object where the key is the
      bucket interval.

      @member ejs.RangeAggregation
      @param {Boolean} trueFalse to enable keyed response or not
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      keyed: function (trueFalse) {
        if (trueFalse == null) {
          return agg[name].range.keyed;
        }

        agg[name].range.keyed = trueFalse;
        return this;
      },

      /**
      Set to true to assume script values are sorted.

      @member ejs.RangeAggregation
      @param {Boolean} trueFalse assume sorted values or not
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      scriptValuesSorted: function (trueFalse) {
        if (trueFalse == null) {
          return agg[name].range.script_values_sorted;
        }

        agg[name].range.script_values_sorted = trueFalse;
        return this;
      },

      /**
      Sets parameters that will be applied to the script.  Overwrites
      any existing params.

      @member ejs.RangeAggregation
      @param {Object} p An object where the keys are the parameter name and
        values are the parameter value.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      params: function (p) {
        if (p == null) {
          return agg[name].range.params;
        }

        agg[name].range.params = p;
        return this;
      }

    });
  };
