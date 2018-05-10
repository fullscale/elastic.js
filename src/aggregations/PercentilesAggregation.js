  /**
    @class
    <p>A multi-value metrics aggregation that calculates one or more percentiles
    over numeric values extracted from the aggregated documents. These values can
    be extracted either from specific numeric fields in the documents, or be
    generated by a provided script.</p>

    @name ejs.PercentilesAggregation
    @ejs aggregation
    @borrows ejs.MetricsAggregationMixin.field as field
    @borrows ejs.MetricsAggregationMixin.script as script
    @borrows ejs.MetricsAggregationMixin.lang as lang
    @borrows ejs.MetricsAggregationMixin.scriptValuesSorted as scriptValuesSorted
    @borrows ejs.MetricsAggregationMixin.params as params
    @borrows ejs.AggregationMixin._type as _type
    @borrows ejs.AggregationMixin.toJSON as toJSON

    @desc
    <p>Aggregation that calculates one or more percentiles over numeric values
    extracted from the aggregated documents.</p>

    @param {String} name The name which be used to refer to this aggregation.

    */
  ejs.PercentilesAggregation = function (name) {

    var
      _common = ejs.MetricsAggregationMixin(name, 'percentiles'),
      agg = _common.toJSON();

    return extend(_common, {

      /**
      Enable the response to be returned as a keyed object where the key is the
      bucket interval.

      @member ejs.PercentilesAggregation
      @param {Boolean} trueFalse to enable keyed response or not
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      keyed: function (trueFalse) {
        if (trueFalse == null) {
          return agg[name].percentiles.keyed;
        }

        agg[name].percentiles.keyed = trueFalse;
        return this;
      },

      /**
      Sets the percentile bucket array.  Overwrites all existing values.

      @member ejs.PercentilesAggregation
      @param {Double[]} percents A double array of percentiles
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      percents: function (percentArr) {
        if (percentArr == null) {
          return agg[name].percentiles.percents;
        }

        if (!isArray(percentArr)) {
          throw new TypeError('Percents must be an array of doubles');
        }

        agg[name].percentiles.percents = percentArr;
        return this;
      },

      /**
      Add a single percentile to the current list of percentiles.

      @member ejs.PercentilesAggregation
      @param {Double} percentile A double percentile value to add
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      percent: function (percentile) {
        if (agg[name].percentiles.percents == null) {
          agg[name].percentiles.percents = [];
        }

        if (percentile == null) {
          return agg[name].percentiles.percents;
        }

        agg[name].percentiles.percents.push(percentile);
        return this;
      },

      /**
      Compression controls memory usage and approximation error. The compression
      value limits the maximum number of nodes to 100 * compression.  By
      increasing the compression value, you can increase the accuracy of your
      percentiles at the cost of more memory. Larger compression values also make
      the algorithm slower since the underlying tree data structure grows in
      size, resulting in more expensive operations. The default compression
      value is 100.

      @member ejs.PercentilesAggregation
      @param {Integer} c The compression level.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      compression: function (c) {
        var tdigest = agg[name].percentiles.tdigest;
        if (c == null) {
          return tdigest && tdigest.compression;
        }
        if (!tdigest) {
          tdigest = agg[name].percentiles.tdigest = {};
        }

        tdigest.compression = c;
        return this;
      }

    });
  };
