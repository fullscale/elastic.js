  /**
    @class
    <p>A multi-bucket values source based aggregation that can be applied on
    numeric values extracted from the documents. It dynamically builds fixed
    size (a.k.a. interval) buckets over the values.</p>

    @name ejs.HistogramAggregation
    @ejs aggregation
    @borrows ejs.AggregationMixin.aggregation as aggregation
    @borrows ejs.AggregationMixin.agg as agg
    @borrows ejs.AggregationMixin._type as _type
    @borrows ejs.AggregationMixin.toJSON as toJSON

    @desc
    <p>Aggregation that can be applied on numeric values extracted from the
    documents.</p>

    @param {String} name The name which be used to refer to this aggregation.

    */
  ejs.HistogramAggregation = function (name) {

    var
      _common = ejs.AggregationMixin(name),
      agg = _common.toJSON();

    agg[name].histogram = {};

    return extend(_common, {

      /**
      <p>Sets the field to gather terms from.</p>

      @member ejs.HistogramAggregation
      @param {String} field a valid field name..
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      field: function (field) {
        if (field == null) {
          return agg[name].histogram.field;
        }

        agg[name].histogram.field = field;
        return this;
      },

      /**
      Allows you generate or modify the terms using a script.

      @member ejs.HistogramAggregation
      @param {String} scriptCode A valid script string to execute.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      script: function (scriptCode) {
        if (scriptCode == null) {
          return agg[name].histogram.script;
        }

        agg[name].histogram.script = scriptCode;
        return this;
      },

      /**
      The script language being used.

      @member ejs.HistogramAggregation
      @param {String} language The language of the script.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      lang: function (language) {
        if (language == null) {
          return agg[name].histogram.lang;
        }

        agg[name].histogram.lang = language;
        return this;
      },

      /**
      Sets the format expression for the terms.  Use for number or date
      formatting

      @member ejs.HistogramAggregation
      @param {String} f the format string
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      format: function (f) {
        if (f == null) {
          return agg[name].histogram.format;
        }

        agg[name].histogram.format = f;
        return this;
      },

      /**
      Set's the range/bounds for the histogram aggregation.  Useful when you
      want to include buckets that might be outside the bounds of indexed
      documents.

      @member ejs.HistogramAggregation
      @param {Long} min The start bound / minimum bound value
      @param {Long} max The end bound / maximum bound value
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      extendedBounds: function (min, max) {
        var bounds;
        if (min == null && max == null) {
          return agg[name].histogram.extended_bounds;
        }

        bounds = {};
        if (min != null) {
          bounds.min = min;
        }

        if (max != null) {
          bounds.max = max;
        }

        agg[name].histogram.extended_bounds = bounds;
        return this;
      },

      /**
      Sets the histogram interval.  Buckets are generated based on this interval
      value.

      @member ejs.HistogramAggregation
      @param {Integer} i The interval
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      interval: function (i) {
        if (i == null) {
          return agg[name].histogram.interval;
        }

        agg[name].histogram.interval = i;
        return this;
      },

      /**
      Only return terms that match more than a configured number of hits.

      @member ejs.HistogramAggregation
      @param {Integer} num The numer of minimum number of hits.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      minDocCount: function (num) {
        if (num == null) {
          return agg[name].histogram.min_doc_count;
        }

        agg[name].histogram.min_doc_count = num;
        return this;
      },

      /**
      Enable the response to be returned as a keyed object where the key is the
      bucket interval.

      @member ejs.HistogramAggregation
      @param {Boolean} trueFalse to enable keyed response or not
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      keyed: function (trueFalse) {
        if (trueFalse == null) {
          return agg[name].histogram.keyed;
        }

        agg[name].histogram.keyed = trueFalse;
        return this;
      },

      /**
      Set to true to assume script values are sorted.

      @member ejs.HistogramAggregation
      @param {Boolean} trueFalse assume sorted values or not
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      scriptValuesSorted: function (trueFalse) {
        if (trueFalse == null) {
          return agg[name].histogram.script_values_sorted;
        }

        agg[name].histogram.script_values_sorted = trueFalse;
        return this;
      },

      /**
      Sets parameters that will be applied to the script.  Overwrites
      any existing params.

      @member ejs.HistogramAggregation
      @param {Object} p An object where the keys are the parameter name and
        values are the parameter value.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      params: function (p) {
        if (p == null) {
          return agg[name].histogram.params;
        }

        agg[name].histogram.params = p;
        return this;
      },

      /**
      Sets order for the aggregated values.

      @member ejs.HistogramAggregation
      @param {String} order The order string.
      @param {String} direction The sort direction, asc or desc.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      order: function (order, direction) {
        if (order == null) {
          return agg[name].histogram.order;
        }

        if (direction == null) {
          direction = 'desc';
        }

        direction = direction.toLowerCase();
        if (direction !== 'asc' && direction !== 'desc') {
          direction = 'desc';
        }

        agg[name].histogram.order = {};
        agg[name].histogram.order[order] = direction;
        return this;
      }

    });
  };
