  /**
    @class
    <p>A multi-bucket values source based aggregation that can be applied on
    numeric values extracted from the documents. It dynamically builds fixed
    size (a.k.a. interval) buckets over the values.</p>

    @name ejs.HistogramAggregation
    @ejs aggregation
    @borrows ejs.BucketsAggregationMixin.field as field
    @borrows ejs.BucketsAggregationMixin.script as script
    @borrows ejs.BucketsAggregationMixin.scriptId as scriptId
    @borrows ejs.BucketsAggregationMixin.scriptFile as scriptFile
    @borrows ejs.BucketsAggregationMixin.lang as lang
    @borrows ejs.BucketsAggregationMixin.params as params
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
      _common = ejs.BucketsAggregationMixin(name, 'histogram'),
      agg = _common.toJSON();

    return extend(_common, {

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
