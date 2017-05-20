  /**
    @mixin
    <p>The BucketsAggregationMixin provides support for common options used across
    various buckets <code>Aggregation</code> implementations.  This object should
    not be used directly.</p>

    @name ejs.BucketsAggregationMixin
    @ejs aggregation
    @borrows ejs.AggregationMixin.aggregation as aggregation
    @borrows ejs.AggregationMixin.agg as agg
    @borrows ejs.AggregationMixin._type as _type
    @borrows ejs.AggregationMixin.toJSON as toJSON

    */
  ejs.BucketsAggregationMixin = function (name, type) {

    var
      _common = ejs.AggregationMixin(name),
      agg = _common.toJSON();


    agg[name][type] = {};

    return extend(_common, {

      /**
      <p>Sets the field to operate on.</p>

      @member ejs.BucketsAggregationMixin
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

      @member ejs.BucketsAggregationMixin
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
      Allows you generate or modify the terms/values using a script.

      @member ejs.BucketsAggregationMixin
      @param {String} scriptId A valid script id to execute.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      scriptId: function (scriptId) {
        if (scriptId == null) {
          return agg[name][type].script_id;
        }

        agg[name][type].script_id = scriptId;
        return this;
      },

      /**
      Allows you generate or modify the terms/values using a script.

      @member ejs.BucketsAggregationMixin
      @param {String} scriptFile A valid script file to execute.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      scriptFile: function (scriptFile) {
        if (scriptFile == null) {
          return agg[name][type].script_file;
        }

        agg[name][type].script_file = scriptFile;
        return this;
      },

      /**
      The script language being used.

      @member ejs.BucketsAggregationMixin
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
      Sets parameters that will be applied to the script.  Overwrites
      any existing params.

      @member ejs.BucketsAggregationMixin
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
