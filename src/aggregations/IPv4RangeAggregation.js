  /**
    @class
    <p>A dedicated range aggregation for IPv4 typed fields.</p>

    <p>Note that this aggregration includes the from value and excludes the to
    value for each range.</p>

    @name ejs.IPv4RangeAggregation
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
    <p>A dedicated range aggregation for IPv4 typed fields.</p>

    @param {String} name The name which be used to refer to this aggregation.

    */
  ejs.IPv4RangeAggregation = function (name) {

    var
      _common = ejs.BucketsAggregationMixin(name, 'ip_range'),
      agg = _common.toJSON();

    return extend(_common, {

      /**
      Adds a range to the list of exsiting range expressions.

      @member ejs.IPv4RangeAggregation
      @param {String} from The start value, use null to ignore
      @param {String} to The end value, use null to ignore.
      @param {String} key Optional key/bucket name for keyed responses.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      range: function (from, to, mask, key) {
        var rangeObj = {};
        if (agg[name].ip_range.ranges == null) {
          agg[name].ip_range.ranges = [];
        }

        if (from == null && to == null && mask == null) {
          return agg[name].ip_range.ranges;
        }

        if (from != null) {
          rangeObj.from = from;
        }

        if (to != null) {
          rangeObj.to = to;
        }

        if (mask != null) {
          rangeObj.mask = mask;
        }

        if (key != null) {
          rangeObj.key = key;
        }

        agg[name].ip_range.ranges.push(rangeObj);
        return this;
      },

      /**
      Enable the response to be returned as a keyed object where the key is the
      bucket interval.

      @member ejs.IPv4RangeAggregation
      @param {Boolean} trueFalse to enable keyed response or not
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      keyed: function (trueFalse) {
        if (trueFalse == null) {
          return agg[name].ip_range.keyed;
        }

        agg[name].ip_range.keyed = trueFalse;
        return this;
      }

    });
  };
