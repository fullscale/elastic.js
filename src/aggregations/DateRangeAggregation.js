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
    <p>Aggregation that is dedicated for date value ranges.</p>

    @param {String} name The name which be used to refer to this aggregation.

    */
  ejs.DateRangeAggregation = function (name) {

    var
      _common = ejs.BucketsAggregationMixin(name, 'date_range'),
      agg = _common.toJSON();

    return extend(_common, {

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
      }
      
    });
  };
