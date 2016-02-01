  /**
    @class
    <p>A special single bucket aggregation that enables aggregating children
    documents.</p>

    @name ejs.ChildrenAggregation
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
  ejs.ChildrenAggregation = function (name) {

    var
      _common = ejs.AggregationMixin(name),
      agg = _common.toJSON();

    agg[name].children = {};

    return extend(_common, {

      /**
      <p>Sets the nested path.</p>

      @member ejs.ChildrenAggregation
      @param {String} type The nested type value.
      @returns {Object} returns <code>this</code> so that calls can be chained.
      */
      type: function (type) {
        if (type == null) {
          return agg[name].children.type;
        }

        agg[name].children.type = type;
        return this;
      }

    });
  };
