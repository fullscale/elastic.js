  /**
    @class
    <p>Defines a single bucket of all the documents within the search execution
    context. This context is defined by the indices and the document types you’re
    searching on, but is not influenced by the search query itself.</p>

    @name ejs.GlobalAggregation
    @ejs aggregation
    @borrows ejs.AggregationMixin.aggregation as aggregation
    @borrows ejs.AggregationMixin.agg as agg
    @borrows ejs.AggregationMixin._type as _type
    @borrows ejs.AggregationMixin.toJSON as toJSON

    @desc
    <p>Defines a single bucket of all the documents within the search context.</p>

    @param {String} name The name which be used to refer to this aggregation.

    */
  ejs.GlobalAggregation = function (name) {

    var
      _common = ejs.AggregationMixin(name),
      agg = _common.toJSON();

    agg[name].global = {};

    return _common;
  };
