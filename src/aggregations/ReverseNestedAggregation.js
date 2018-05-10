  /**
    @class
    <p>A special single bucket aggregation that enables aggregating nested
    documents.</p>

    @name ejs.ReverseNestedAggregation
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

    return extend(_common, {

      /**
       <p>Sets the nested path.</p>

       @member ejs.ReverseNestedAggregation
       @param {String} path The nested path value.
       @returns {Object} returns <code>this</code> so that calls can be chained.
       */
      reversePath: function (path) {
        if (path == null) {
          return agg[name].reverse_nested.path;
        }

        agg[name].reverse_nested.path = path;
        return this;
      }

    });
  };
