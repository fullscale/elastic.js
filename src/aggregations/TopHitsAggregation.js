  /**
    @class
    <p>A top_hits metric aggregator keeps track of the most relevant document being
    aggregated. This aggregator is intended to be used as a sub aggregator, so that
    the top matching documents can be aggregated per bucket. </p>

    @name ejs.TopHitsAggregation
    @ejs aggregation
    @borrows ejs.AggregationMixin.aggregation as aggregation
    @borrows ejs.AggregationMixin.agg as agg
    @borrows ejs.AggregationMixin._type as _type
    @borrows ejs.AggregationMixin.toJSON as toJSON

    @desc
    <p>top_hits metric aggregator keeps track of the most relevant document being
    aggregated.</p>

    @param {String} name The name which be used to refer to this aggregation.

    */
  ejs.TopHitsAggregation = function (name) {

    var
      _common = ejs.AggregationMixin(name),
      agg = _common.toJSON();

    agg[name].top_hits = {};

    return extend(_common, {
      /**
      <p> The offset from the first result you want to fetch. </p>

      @member ejs.TopHitsAggregation
      @param {Integer} from The offset from the first result you want to fetch.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      from: function (from) {
      if (from === null) {
          return agg[name].top_hits.from;
        }

        agg[name].top_hits.from = from;
        return this;
      },

      /**
      <p> Sets the maximum number of top matching hits to return per bucket. </p>

      @member ejs.TopHitsAggregation
      @param {Integer} size The numer of aggregation entries to be returned per bucket.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      size: function (size) {
        if (size === null) {
          return agg[name].top_hits.size;
        }

        agg[name].top_hits.size = size;
        return this;
      },

      /**
      <p>The maximum number of top matching hits to return per bucket.</p>

      @member ejs.TopHitsAggregation
      @param {Array} sort How to sort the the top matching hits
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      sort: function (sort) {
        if (sort === null) {
          return agg[name].top_hits.sort;
        }

        agg[name].top_hits.sort = sort;
        return this;
      }
    });
  };
