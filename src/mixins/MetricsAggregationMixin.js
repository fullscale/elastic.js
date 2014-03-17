  /**
    @mixin
    <p>The MetricsAggregationMixin provides support for common options used across
    various metrics <code>Aggregation</code> implementations.  This object should
    not be used directly.</p>

    @name ejs.MetricsAggregationMixin
    @ejs aggregation
    @borrows ejs.AggregationMixin._type as _type
    @borrows ejs.AggregationMixin.toJSON as toJSON

    */
  ejs.MetricsAggregationMixin = function (name, type) {

    var
      _common = ejs.AggregationMixin(name),
      agg = _common.toJSON();

    // remove ability for sub-aggregations since metrics aggregations dont
    // support them.
    delete _common.aggregation;
    delete _common.agg;

    agg[name][type] = {};

    return extend(_common, {

      /**
      <p>Sets the field to operate on.</p>

      @member ejs.MetricsAggregationMixin
      @param {String} field a valid field name..
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      field: function (field) {
        if (field == null) {
          return agg[name][type].field;
        }

        agg[name][type].field = field;
        return this;
      },

      /**
      Allows you generate or modify the terms/values using a script.

      @member ejs.MetricsAggregationMixin
      @param {String} scriptCode A valid script string to execute.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      script: function (scriptCode) {
        if (scriptCode == null) {
          return agg[name][type].script;
        }

        agg[name][type].script = scriptCode;
        return this;
      },

      /**
      The script language being used.

      @member ejs.MetricsAggregationMixin
      @param {String} language The language of the script.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      lang: function (language) {
        if (language == null) {
          return agg[name][type].lang;
        }

        agg[name][type].lang = language;
        return this;
      },

      /**
      Set to true to assume script values are sorted.

      @member ejs.MetricsAggregationMixin
      @param {Boolean} trueFalse assume sorted values or not
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      scriptValuesSorted: function (trueFalse) {
        if (trueFalse == null) {
          return agg[name][type].script_values_sorted;
        }

        agg[name][type].script_values_sorted = trueFalse;
        return this;
      },

      /**
      Sets parameters that will be applied to the script.  Overwrites
      any existing params.

      @member ejs.MetricsAggregationMixin
      @param {Object} p An object where the keys are the parameter name and
        values are the parameter value.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      params: function (p) {
        if (p == null) {
          return agg[name][type].params;
        }

        agg[name][type].params = p;
        return this;
      }

    });
  };
