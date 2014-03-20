  /**
    @class
    <p>A multi-bucket aggregation similar to the histogram except it can only be
    applied on date values. Since dates are represented in elasticsearch
    internally as long values, it is possible to use the normal histogram on
    dates as well, though accuracy will be compromised. The reason for this is
    in the fact that time based intervals are not fixed (think of leap years and
    on the number of days in a month). For this reason, we need a special
    support for time based data. From a functionality perspective, this
    histogram supports the same features as the normal histogram. The main
    difference is that the interval can be specified by date/time expressions.</p>

    @name ejs.DateHistogramAggregation
    @ejs aggregation
    @borrows ejs.AggregationMixin.aggregation as aggregation
    @borrows ejs.AggregationMixin.agg as agg
    @borrows ejs.AggregationMixin._type as _type
    @borrows ejs.AggregationMixin.toJSON as toJSON

    @desc
    <p>Aggregation similar to the histogram except it can only be applied on
    date values.</p>

    @param {String} name The name which be used to refer to this aggregation.

    */
  ejs.DateHistogramAggregation = function (name) {

    var
      _common = ejs.AggregationMixin(name),
      agg = _common.toJSON();

    agg[name].date_histogram = {};

    return extend(_common, {

      /**
      <p>Sets the field to gather terms from.</p>

      @member ejs.DateHistogramAggregation
      @param {String} field a valid field name..
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      field: function (field) {
        if (field == null) {
          return agg[name].date_histogram.field;
        }

        agg[name].date_histogram.field = field;
        return this;
      },

      /**
      Allows you generate or modify the terms using a script.

      @member ejs.DateHistogramAggregation
      @param {String} scriptCode A valid script string to execute.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      script: function (scriptCode) {
        if (scriptCode == null) {
          return agg[name].date_histogram.script;
        }

        agg[name].date_histogram.script = scriptCode;
        return this;
      },

      /**
      The script language being used.

      @member ejs.DateHistogramAggregation
      @param {String} language The language of the script.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      lang: function (language) {
        if (language == null) {
          return agg[name].date_histogram.lang;
        }

        agg[name].date_histogram.lang = language;
        return this;
      },

      /**
      Set the date time zone.

      @member ejs.DateHistogramAggregation
      @param {String} tz the time zone.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      timeZone: function (tz) {
        if (tz == null) {
          return agg[name].date_histogram.time_zone;
        }

        agg[name].date_histogram.time_zone = tz;
        return this;
      },

      /**
      Set the pre-rouding date time zone.

      @member ejs.DateHistogramAggregation
      @param {String} tz the time zone.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      preZone: function (tz) {
        if (tz == null) {
          return agg[name].date_histogram.pre_zone;
        }

        agg[name].date_histogram.pre_zone = tz;
        return this;
      },

      /**
      Set the post-rouding date time zone.

      @member ejs.DateHistogramAggregation
      @param {String} tz the time zone.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      postZone: function (tz) {
        if (tz == null) {
          return agg[name].date_histogram.post_zone;
        }

        agg[name].date_histogram.post_zone = tz;
        return this;
      },

      /**
      Set the pre-rouding offset.

      @member ejs.DateHistogramAggregation
      @param {String} offset the offset.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      preOffset: function (offset) {
        if (offset == null) {
          return agg[name].date_histogram.pre_offset;
        }

        agg[name].date_histogram.pre_offset = offset;
        return this;
      },

      /**
      Set the post-rouding offset.

      @member ejs.DateHistogramAggregation
      @param {String} offset the offset.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      postOffset: function (offset) {
        if (offset == null) {
          return agg[name].date_histogram.post_offset;
        }

        agg[name].date_histogram.post_offset = offset;
        return this;
      },

      /**
      Set's the range/bounds for the histogram aggregation.  Useful when you
      want to include buckets that might be outside the bounds of indexed
      documents.

      @member ejs.DateHistogramAggregation
      @param {(String|Long)} min The start bound / minimum bound value
      @param {(String|Long)} max The end bound / maximum bound value
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      extendedBounds: function (min, max) {
        var bounds;
        if (min == null && max == null) {
          return agg[name].date_histogram.extended_bounds;
        }

        bounds = {};
        if (min != null) {
          bounds.min = min;
        }

        if (max != null) {
          bounds.max = max;
        }

        agg[name].date_histogram.extended_bounds = bounds;
        return this;
      },

      /**
      Sets the histogram interval.  Buckets are generated based on this interval
      value.

      @member ejs.DateHistogramAggregation
      @param {String} i The interval
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      interval: function (i) {
        if (i == null) {
          return agg[name].date_histogram.interval;
        }

        agg[name].date_histogram.interval = i;
        return this;
      },

      /**
      Sets the format expression for the terms.  Use for number or date
      formatting

      @member ejs.DateHistogramAggregation
      @param {String} f the format string
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      format: function (f) {
        if (f == null) {
          return agg[name].date_histogram.format;
        }

        agg[name].date_histogram.format = f;
        return this;
      },

      /**
      Enable the response to be returned as a keyed object where the key is the
      bucket interval.

      @member ejs.DateHistogramAggregation
      @param {Boolean} trueFalse to enable keyed response or not
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      keyed: function (trueFalse) {
        if (trueFalse == null) {
          return agg[name].date_histogram.keyed;
        }

        agg[name].date_histogram.keyed = trueFalse;
        return this;
      },

      /**
      Set to true to assume script values are sorted.

      @member ejs.DateHistogramAggregation
      @param {Boolean} trueFalse assume sorted values or not
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      scriptValuesSorted: function (trueFalse) {
        if (trueFalse == null) {
          return agg[name].date_histogram.script_values_sorted;
        }

        agg[name].date_histogram.script_values_sorted = trueFalse;
        return this;
      },

      /**
      Set to true to apply interval adjusts to day and above intervals.

      @member ejs.DateHistogramAggregation
      @param {Boolean} trueFalse adjust large intervals or not
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      preZoneAdjustLargeInterval: function (trueFalse) {
        if (trueFalse == null) {
          return agg[name].date_histogram.pre_zone_adjust_large_interval;
        }

        agg[name].date_histogram.pre_zone_adjust_large_interval = trueFalse;
        return this;
      },

      /**
      Only return terms that match more than a configured number of hits.

      @member ejs.DateHistogramAggregation
      @param {Integer} num The numer of minimum number of hits.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      minDocCount: function (num) {
        if (num == null) {
          return agg[name].date_histogram.min_doc_count;
        }

        agg[name].date_histogram.min_doc_count = num;
        return this;
      },

      /**
      Sets parameters that will be applied to the script.  Overwrites
      any existing params.

      @member ejs.DateHistogramAggregation
      @param {Object} p An object where the keys are the parameter name and
        values are the parameter value.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      params: function (p) {
        if (p == null) {
          return agg[name].date_histogram.params;
        }

        agg[name].date_histogram.params = p;
        return this;
      },

      /**
      Sets order for the aggregated values.

      @member ejs.DateHistogramAggregation
      @param {String} order The order string.
      @param {String} direction The sort direction, asc or desc.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      order: function (order, direction) {
        if (order == null) {
          return agg[name].date_histogram.order;
        }

        if (direction == null) {
          direction = 'desc';
        }

        direction = direction.toLowerCase();
        if (direction !== 'asc' && direction !== 'desc') {
          direction = 'desc';
        }

        agg[name].date_histogram.order = {};
        agg[name].date_histogram.order[order] = direction;
        return this;
      }

    });
  };
