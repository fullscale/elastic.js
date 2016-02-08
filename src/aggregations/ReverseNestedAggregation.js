  /**
    @class
    <p>A special single bucket aggregation that enables aggregating nested
    documents.</p>

    @name ejs.NestedAggregation
    @ejs aggregation
    @borrows ejs.AggregationMixin.aggregation as aggregation
    @borrows ejs.AggregationMixin.agg as agg
    @borrows ejs.AggregationMixin._type as _type
    @borrows ejs.AggregationMixin.toJSON as toJSON

    @desc
    <p>A special single bucket aggregation that enables aggregating nested
    documents.</p>

    @param {String} name The name which be used to refer to this aggregation.

    */
  ejs.ReverseNestedAggregation = function (name) {

    var
      _common = ejs.AggregationMixin(name),
      agg = _common.toJSON();

    agg[name].reverse_nested = {};


    return extend(_common, { });
  };
